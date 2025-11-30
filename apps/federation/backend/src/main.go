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
	"fmt"
	globalConstants "go-common/constants"
	"go-common/jhttp"
	JHTTPErrors "go-common/jhttp/errors"
	"go-common/jhttp/middlewares"
	"go-common/services/jmongo"
	globalTypes "go-common/types"
	"go-common/utils"
	"net/http"
	"os"

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
	apiKeyMongoCollection, err := jmongo.NewMongo[types.APIKey](mongoClient, "federation", "api_keys")

	// SERVIES //
	apiService := services.NewAPI(apiKeyMongoCollection)

	// CONTROLLERS
	authController := auth.NewController(userMongoCollection)
	adminController := admin.NewController(apiService)

	// MIDDLEWARES
	corsMiddleware := middlewares.NewCORs()
	userMiddleware := middlewares.NewGetUser(
		&middlewares.GetUserOpts{UserFetcher: authController.GetUserFromCookie},
	)
	adminMiddleware := middlewares.NewRequireAuth(true)
	apiKeyMiddleware := localMiddleware.NewRequireAPIKey(apiService)

	// HANDLERS //
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
		"GET /api/auth/user/{userUUID}",
		jhttp.NewEndpoint(
			authHandler.GetUserByUUID,
			[]string{constants.UserUUIDPathVariable},
			corsMiddleware,
			apiKeyMiddleware,
		),
	)

	mux.HandleFunc(
		"POST /api/auth/users",
		jhttp.NewEndpoint(
			authHandler.BulkGetUsersByUUIDs,
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
