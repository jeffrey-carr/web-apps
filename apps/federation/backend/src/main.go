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
	"go-common/services/jredis"
	globalTypes "go-common/types"
	"go-common/utils"
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/joho/godotenv"
	"github.com/oracle/oci-go-sdk/v65/common"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

// HandlePing handles the test 'ping' function
func HandlePing(ctx context.Context, r jhttp.RequestData[struct{}]) (*string, *JHTTPErrors.JHTTPError) {
	msg := "pong!"
	return &msg, nil
}

func loadConfig() (types.Config, error) {
	loadInt := func(key string, optional bool) (int, error) {
		strVal := os.Getenv(key)
		if strVal == "" {
			var err error
			if !optional {
				err = fmt.Errorf("missing variable: %s", key)
			}
			return 0, err
		}
		parsed, err := strconv.ParseInt(strVal, 10, 64)
		if err != nil {
			return 0, fmt.Errorf("error parsing %s: %w", key, err)
		}

		return int(parsed), nil
	}
	loadStr := func(key string, optional bool, fallback string) (string, error) {
		val := os.Getenv(key)
		if val != "" {
			return val, nil
		}
		if !optional {
			return fallback, fmt.Errorf("missing variable %s", key)
		}

		return fallback, nil
	}

	// environment := os.Getenv("ENVIRONMENT")
	// if environment == "" {
	// 	environment = globalConstants.EnvDev
	// }
	// when optional, won't error
	environment, _ := loadStr("ENVIRONMENT", true, globalConstants.EnvDev)
	port, _ := loadStr("PORT", true, "9999")
	hourlyRateLimit, err := loadInt("HOURLY_RATE_LIMIT", false)
	if err != nil {
		return types.Config{}, err
	}
	oracleCompartmentID, err := loadStr("ORACLE_COMPARTMENT_ID", false, "")
	if err != nil {
		return types.Config{}, err
	}
	oracleUser, err := loadStr("ORACLE_USER", false, "")
	if err != nil {
		return types.Config{}, err
	}
	oracleFingerprint, err := loadStr("ORACLE_FINGERPRINT", false, "")
	if err != nil {
		return types.Config{}, err
	}
	oracleKey, err := loadStr("ORACLE_KEY", false, "")
	if err != nil {
		return types.Config{}, err
	}
	oracleTenancy, err := loadStr("ORACLE_TENANCY", false, "")
	if err != nil {
		return types.Config{}, err
	}
	oracleRegion, err := loadStr("ORACLE_REGION", false, "")
	if err != nil {
		return types.Config{}, err
	}
	mongoConnectionURL, err := loadStr("MONGO_CONNECTION_URL", false, "")
	if err != nil {
		return types.Config{}, err
	}
	redisConnectionURL, err := loadStr("REDIS_CONNECTION_URL", false, "")
	if err != nil {
		return types.Config{}, err
	}

	return types.Config{
		Environment:         environment,
		Port:                port,
		HourlyRateLimit:     hourlyRateLimit,
		MongoConnectionURL:  mongoConnectionURL,
		OracleCompartmentID: oracleCompartmentID,
		OracleUser:          oracleUser,
		OracleKey:           oracleKey,
		OracleTenancy:       oracleTenancy,
		OracleRegion:        oracleRegion,
		OracleFingerprint:   oracleFingerprint,
		RedisConnectionURL:  redisConnectionURL,
	}, nil
}

func main() {
	err := godotenv.Load()
	if err != nil {
		panic(err)
	}

	config, err := loadConfig()
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

	// SERVICES //
	apiService := services.NewAPI(apiKeyMongoCollection)
	emailConfig := common.NewRawConfigurationProvider(
		config.OracleTenancy,
		config.OracleUser,
		config.OracleRegion,
		config.OracleFingerprint,
		oraclePrivateKey,
		nil,
	)
	emailService, err := jemail.NewEmail(
		emailConfig,
		"noreply@jeffreycarr.dev",
		"The Jeffiverse",
		config.OracleCompartmentID,
	)
	if err != nil {
		panic(err)
	}
	redisService, err := jredis.NewJRedis[string](config.RedisConnectionURL)
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
	rateLimitingMiddleware := middlewares.NewRateLimiterMiddleware(redisService)
	loginRateLimitingMiddleware := middlewares.NewLoginRateLimiterMiddleware[auth.LoginRequest](redisService)
	// TODO: login rate limiting middleware

	// HANDLERS //
	userHandler := handlers.NewUserHandler(userController)
	authHandler := handlers.NewAuthHandler(authController)
	adminHandler := handlers.NewAdminHandler(adminController, authController)

	// ROUTER //
	mux := http.NewServeMux()

	endpointBuilder := jhttp.NewEndpointBuilder(func() middlewares.Middleware {
		return rateLimitingMiddleware.WithLimit(config.HourlyRateLimit, time.Hour)
	})

	// PUBLIC endpoints //
	jhttp.
		NewEndpointFunction("/api/ping", HandlePing).
		WithMethod(http.MethodPost).
		WithBuilder(endpointBuilder).
		WithMiddlewares(corsMiddleware).
		HandleEndpoint(mux)
	jhttp.
		NewEndpointFunction("/api/auth/logout", authHandler.Logout).
		WithMethod(http.MethodPost).
		WithBuilder(endpointBuilder).
		WithMiddlewares(corsMiddleware, userMiddleware).
		HandleEndpoint(mux)
	jhttp.
		NewEndpointFunction("/api/auth/authed-user", authHandler.ValidateCookie).
		WithMethod(http.MethodGet).
		WithBuilder(endpointBuilder).
		WithMiddlewares(corsMiddleware, userMiddleware).
		HandleEndpoint(mux)

	// API endpoints //
	jhttp.
		NewEndpointFunction("/api/ping/api-key", HandlePing).
		WithMethod(http.MethodPost).
		WithBuilder(endpointBuilder).
		WithMiddlewares(corsMiddleware, apiKeyMiddleware).
		HandleEndpoint(mux)
	jhttp.
		NewEndpointFunction("/api/user/{userUUID}", userHandler.GetUserByUUID).
		WithPathKeys(constants.UserUUIDPathVariable).
		WithMethod(http.MethodGet).
		WithBuilder(endpointBuilder).
		WithMiddlewares(corsMiddleware, apiKeyMiddleware).
		HandleEndpoint(mux)
	jhttp.
		NewEndpointFunction("/api/auth/users", userHandler.BulkGetUsersByUUIDs).
		WithMethod(http.MethodPost).
		WithBuilder(endpointBuilder).
		WithMiddlewares(corsMiddleware, apiKeyMiddleware).
		HandleEndpoint(mux)

	// Admin endpoints //
	jhttp.NewEndpointFunction("/api/ping/admin", HandlePing).
		WithMethod(http.MethodPost).
		WithBuilder(endpointBuilder).
		WithMiddlewares(corsMiddleware, userMiddleware, adminMiddleware).
		HandleEndpoint(mux)
	jhttp.
		NewEndpointFunction("/api/admin/keys", adminHandler.GetAllKeys).
		WithMethod(http.MethodGet).
		WithBuilder(endpointBuilder).
		WithMiddlewares(userMiddleware, adminMiddleware).
		HandleEndpoint(mux)
	jhttp.
		NewEndpointFunction("/api/admin/keys", adminHandler.CreateNewAPIKey).
		WithMethod(http.MethodPost).
		WithBuilder(endpointBuilder).
		WithMiddlewares(userMiddleware, adminMiddleware).
		HandleEndpoint(mux)
	jhttp.
		NewEndpointFunction("/api/admin/keys/revoke", adminHandler.RevokeAPIKey).
		WithMethod(http.MethodPost).
		WithBuilder(endpointBuilder).
		WithMiddlewares(userMiddleware, adminMiddleware).
		HandleEndpoint(mux)

	// User endpoints //
	jhttp.
		NewEndpointFunction("/api/user/{userUUID}/update-password", authHandler.UpdatePassword).
		WithPathKeys(constants.UserUUIDPathVariable).
		WithMethod(http.MethodPut).
		WithBuilder(endpointBuilder).
		WithMiddlewares(userMiddleware).
		HandleEndpoint(mux)
	jhttp.
		NewEndpointFunction("/api/user/{userUUID}/update", userHandler.UpdateUser).
		WithPathKeys(constants.UserUUIDPathVariable).
		WithMethod(http.MethodPut).
		WithBuilder(endpointBuilder).
		WithMiddlewares(userMiddleware).
		HandleEndpoint(mux)

	// Auth
	jhttp.
		NewEndpointFunction("/api/auth/create", authHandler.CreateUser).
		WithMethod(http.MethodPost).
		WithBuilder(endpointBuilder).
		WithMiddlewares(rateLimitingMiddleware.WithLimit(3, time.Hour)).
		HandleEndpoint(mux)
	jhttp.
		NewEndpointFunction("/api/auth/verify", authHandler.VerifyEmail).
		WithMethod(http.MethodPost).
		WithBuilder(endpointBuilder).
		HandleEndpoint(mux)
	jhttp.
		NewEndpointFunction("/api/auth/login", authHandler.Login).
		WithMethod(http.MethodPost).
		WithBuilder(endpointBuilder).
		WithMiddlewares(loginRateLimitingMiddleware.WithLimit(5, time.Minute), userMiddleware).
		HandleEndpoint(mux)

	mux.HandleFunc(
		"OPTIONS /api/auth/{rest...}",
		jhttp.NewEndpoint[struct{}, struct{}](nil, nil, corsMiddleware),
	)

	fmt.Printf("Starting server on port %s\n", config.Port)
	http.ListenAndServe(fmt.Sprintf(":%s", config.Port), mux)
}
