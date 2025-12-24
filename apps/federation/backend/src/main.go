package main

import (
	"context"
	"federation/admin"
	"federation/auth"
	"federation/constants"
	"federation/handlers"
	localMiddleware "federation/middlewares"
	"federation/services"
	"federation/types"
	"federation/user"
	"fmt"
	globalConstants "go-common/constants"
	"go-common/jhttp"
	JHTTPErrors "go-common/jhttp/errors"
	"go-common/jhttp/middlewares"
	"go-common/services/jemail"
	"go-common/services/jmongo"
	globalTypes "go-common/types"
	"go-common/utils"
	"net/http"
	"os"

	"github.com/oracle/oci-go-sdk/v65/common"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

// HandlePing handles the test 'ping' function
func HandlePing(ctx context.Context, r jhttp.RequestData[struct{}]) (*string, *JHTTPErrors.JHTTPError) {
	msg := "pong!"
	return &msg, nil
}

func main() {
	config, err := utils.OpenAndReadJSON[types.Config](".env.json")
	if err != nil {
		panic(err)
	}

	oraclePrivateKey, err := utils.ReadFileIntoString(config.OracleKey)
	if err != nil {
		panic(err)
	}

	fmt.Printf("Loaded config: %+v\n", config)
	os.Setenv(globalConstants.EnvEnvironmentVar, config.Environment)

	// MONGO CONNECTIONS //
	mongoClient, err := mongo.Connect(options.Client().ApplyURI(config.MongoConnectionURL))
	if err != nil {
		panic(err)
	}
	userMongoCollection, err := jmongo.NewMongo[globalTypes.User](mongoClient, "federation", "users")
	if err != nil {
		panic(err)
	}
	unverifiedUserMongoCollection, err := jmongo.NewMongo[types.UnverifiedUser](mongoClient, "federation", "unverified_users")
	if err != nil {
		panic(err)
	}
	apiKeyMongoCollection, err := jmongo.NewMongo[types.APIKey](mongoClient, "federation", "api_keys")
	if err != nil {
		panic(err)
	}

	// SERVIES //
	apiService := services.NewAPI(apiKeyMongoCollection)
	emailConfig := common.NewRawConfigurationProvider(
		config.OracleTenancy,
		config.OracleUser,
		config.OracleRegion,
		config.OracleFingerprint,
		oraclePrivateKey,
		nil,
	)
	emailService, err := jemail.NewEmail(emailConfig, "noreply@jeffreycarr.dev", "The Jeffiverse", config.OracleCompartmentID)
	if err != nil {
		panic(err)
	}

	// CONTROLLERS
	userController := user.NewController(userMongoCollection)
	authController := auth.NewController(unverifiedUserMongoCollection, userController, emailService)
	adminController := admin.NewController(apiService)

	// MIDDLEWARES
	corsMiddleware := middlewares.NewCORs()
	userMiddleware := middlewares.NewGetUser(
		&middlewares.GetUserOpts{UserFetcher: authController.GetUserFromCookie},
	)
	adminMiddleware := middlewares.NewRequireAuth(true)
	apiKeyMiddleware := localMiddleware.NewRequireAPIKey(apiService)

	// HANDLERS //
	userHandler := handlers.NewUserHandler(userController)
	authHandler := handlers.NewAuthHandler(authController)
	adminHandler := handlers.NewAdminHandler(adminController, authController)

	// ROUTER //
	mux := http.NewServeMux()

	// Public endpoints
	mux.HandleFunc(
		"POST /api/auth/logout",
		jhttp.NewEndpoint(
			authHandler.Logout,
			nil,
			corsMiddleware,
			userMiddleware,
		),
	)
	mux.HandleFunc(
		"GET /api/auth/authed-user",
		jhttp.NewEndpoint(
			authHandler.ValidateCookie,
			nil,
			corsMiddleware,
			userMiddleware,
		),
	)
	mux.HandleFunc(
		"GET /api/user/{userUUID}",
		jhttp.NewEndpoint(
			userHandler.GetUserByUUID,
			[]string{constants.UserUUIDPathVariable},
			corsMiddleware,
			apiKeyMiddleware,
		),
	)
	mux.HandleFunc(
		"PUT /api/user/{userUUID}/update-password",
		jhttp.NewEndpoint(
			authHandler.UpdatePassword,
			[]string{constants.UserUUIDPathVariable},
			userMiddleware,
		),
	)
	mux.HandleFunc(
		"PUT /api/user/{userUUID}/update",
		jhttp.NewEndpoint(
			userHandler.UpdateUser,
			[]string{constants.UserUUIDPathVariable},
			userMiddleware,
		),
	)
	mux.HandleFunc(
		"POST /api/auth/users",
		jhttp.NewEndpoint(
			userHandler.BulkGetUsersByUUIDs,
			nil,
			corsMiddleware,
			apiKeyMiddleware,
		),
	)

	mux.HandleFunc(
		"POST /api/ping/api-key",
		jhttp.NewEndpoint(
			HandlePing,
			nil,
			corsMiddleware,
			apiKeyMiddleware,
		),
	)

	mux.HandleFunc(
		"POST /api/ping/admin",
		jhttp.NewEndpoint(
			HandlePing,
			nil,
			corsMiddleware,
			userMiddleware,
			adminMiddleware,
		),
	)

	mux.HandleFunc(
		"POST /api/ping",
		jhttp.NewEndpoint(
			HandlePing,
			nil,
			corsMiddleware,
		),
	)

	// Auth
	mux.HandleFunc(
		"POST /api/auth/create",
		jhttp.NewEndpoint(
			authHandler.CreateUser,
			nil,
		),
	)
	mux.HandleFunc(
		"POST /api/auth/verify",
		jhttp.NewEndpoint(
			authHandler.VerifyEmail,
			nil,
		),
	)
	mux.HandleFunc(
		"POST /api/auth/login",
		jhttp.NewEndpoint(
			authHandler.Login,
			nil,
			userMiddleware,
		),
	)

	// Admin
	mux.HandleFunc(
		"GET /api/admin/keys",
		jhttp.NewEndpoint(
			adminHandler.GetAllKeys,
			nil,
			userMiddleware,
			adminMiddleware,
		),
	)

	mux.HandleFunc(
		"POST /api/admin/keys",
		jhttp.NewEndpoint(
			adminHandler.CreateNewAPIKey,
			nil,
			userMiddleware,
			adminMiddleware,
		),
	)

	mux.HandleFunc(
		"POST /api/admin/keys/revoke",
		jhttp.NewEndpoint(
			adminHandler.RevokeAPIKey,
			nil,
			userMiddleware,
			adminMiddleware,
		),
	)

	mux.HandleFunc(
		"OPTIONS /api/auth/{rest...}",
		jhttp.NewEndpoint[struct{}, struct{}](nil, nil, corsMiddleware),
	)

	fmt.Printf("Starting server on port %s\n", config.Port)
	http.ListenAndServe(fmt.Sprintf(":%s", config.Port), mux)
}
