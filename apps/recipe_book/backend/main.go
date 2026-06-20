package main

import (
	"context"
	"federation/sdk"
	"fmt"
	globalConstants "go-common/constants"
	"go-common/jhttp"
	JHTTPErrors "go-common/jhttp/errors"
	"go-common/jhttp/middlewares"
	"go-common/services/jcloudinary"
	"go-common/services/jmongo"
	"go-common/services/jredis"
	"net/http"
	"os"
	filesDomain "recipe-book/domains/files"
	recipeDomain "recipe-book/domains/recipe"
	"recipe-book/files"
	"recipe-book/recipe"
	"recipe-book/types"
	"time"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

func loadConfig() (types.Config, error) {
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

	environment, _ := loadStr("RECIPE_BOOK_ENVIRONMENT", true, globalConstants.EnvDev)
	port, _ := loadStr("RECIPE_BOOK_PORT", true, "8080")
	mongoConnectionURL, err := loadStr("RECIPE_BOOK_MONGO_CONNECTION_URL", false, "")
	if err != nil {
		return types.Config{}, err
	}
	federationAPIKey, err := loadStr("RECIPE_BOOK_FEDERATION_API_KEY", false, "")
	if err != nil {
		return types.Config{}, err
	}
	cloudinaryAPIKey, err := loadStr("RECIPE_BOOK_CLOUDINARY_API_KEY", false, "")
	if err != nil {
		return types.Config{}, err
	}
	redisConnectionURL, err := loadStr("RECIPE_BOOK_REDIS_CONNECTION_URL", false, "")
	if err != nil {
		return types.Config{}, err
	}

	return types.Config{
		Environment:        environment,
		Port:               port,
		MongoURL:           mongoConnectionURL,
		FederationAPIKey:   federationAPIKey,
		CloudinaryAPIKey:   cloudinaryAPIKey,
		RedisConnectionURL: redisConnectionURL,
	}, nil
}

// HandlePing handles the test 'ping' function
func HandlePing(ctx context.Context, r jhttp.RequestData[struct{}]) (*string, *JHTTPErrors.JHTTPError) {
	msg := "pong!"
	return &msg, nil
}

func main() {
	err := godotenv.Load()
	if err != nil {
		panic(fmt.Errorf("failed to load environment variables: %w", err))
	}

	config, err := loadConfig()
	if err != nil {
		panic(fmt.Errorf("could not load config %w", err))
	}

	os.Setenv(globalConstants.EnvEnvironmentVar, config.Environment)

	// SERVICES //
	mongoClient, err := mongo.Connect(options.Client().ApplyURI(config.MongoURL))
	if err != nil {
		panic(err)
	}
	recipeMongoCollection, err := jmongo.NewMongo[recipeDomain.Recipe](mongoClient, "recipe_book", "recipes")
	if err != nil {
		panic(err)
	}
	userFavoritesMongoCollection, err := jmongo.NewMongo[recipeDomain.UserFavorite](mongoClient, "recipe_book", "user_favorites")
	if err != nil {
		panic(err)
	}
	tagMongoCollection, err := jmongo.NewMongo[recipeDomain.Tag](mongoClient, "recipe_book", "tags")
	if err != nil {
		panic(err)
	}
	filesMongoCollection, err := jmongo.NewMongo[filesDomain.File](mongoClient, "recipe_book", "files")
	if err != nil {
		panic(err)
	}
	federationSDK := sdk.NewSDK(config.FederationAPIKey)
	cloudinaryService, err := jcloudinary.NewCloudinary(config.CloudinaryAPIKey)
	if err != nil {
		panic(err)
	}
	redisService, err := jredis.NewJRedis[string](config.RedisConnectionURL)
	if err != nil {
		panic(err)
	}

	// MIDDLEWARES //
	userMiddleware := middlewares.NewGetUser(nil)
	authMiddleware := middlewares.NewRequireAuth(false)
	rateLimitingMiddlware := middlewares.NewRateLimiterMiddleware(redisService)

	// REPOSITORIES //
	filesRepo := files.NewRepository(filesMongoCollection)
	recipeRepo := recipe.NewRepository(recipeMongoCollection, userFavoritesMongoCollection, tagMongoCollection)

	// CONTROLLERS //
	filesController := files.NewController(cloudinaryService, filesRepo)
	recipeController := recipe.NewController(federationSDK, recipeRepo, filesController)

	// HANDLERS //
	recipeHandler := recipeDomain.NewHandler(recipeController)

	// ROUTER //
	defaultBuilder := jhttp.NewEndpointBuilder(
		func() middlewares.Middleware {
			return rateLimitingMiddlware.WithLimit(3000, time.Hour)
		},
	)
	mux := http.NewServeMux()

	// ENDPOINTS //
	// Recipe
	jhttp.
		NewEndpointFunction("/api/recipe", recipeHandler.Create).
		WithMethod(http.MethodPost).
		WithBuilders(defaultBuilder).
		WithMiddlewares(userMiddleware, authMiddleware).
		HandleEndpoint(mux)
	jhttp.
		NewEndpointFunction("/api/recipe", recipeHandler.Create).
		WithMethod(http.MethodPatch).
		WithBuilders(defaultBuilder).
		WithMiddlewares(userMiddleware, authMiddleware).
		HandleEndpoint(mux)
	jhttp.
		NewEndpointFunction("/api/recipe/all-tags", recipeHandler.GetAllTags).
		WithMethod(http.MethodGet).
		WithBuilders(defaultBuilder).
		HandleEndpoint(mux)
	jhttp.
		NewEndpointFunction("/api/recipe/search", recipeHandler.Search).
		WithMethod(http.MethodGet).
		WithBuilders(defaultBuilder).
		WithMiddlewares(userMiddleware).
		HandleEndpoint(mux)
	jhttp.
		NewEndpointFunction(fmt.Sprintf("/api/recipe/{%s}", recipeDomain.RecipeIDPathVar), recipeHandler.Get).
		WithPathKeys(recipeDomain.RecipeIDPathVar).
		WithMethod(http.MethodGet).
		WithBuilders(defaultBuilder).
		WithMiddlewares(userMiddleware).
		HandleEndpoint(mux)
	jhttp.
		NewEndpointFunction("/api/recipe", recipeHandler.DeleteRecipe).
		WithMethod(http.MethodDelete).
		WithBuilders(defaultBuilder).
		WithMiddlewares(userMiddleware).
		HandleEndpoint(mux)

	// User
	jhttp.
		NewEndpointFunction("/api/user/favorites", recipeHandler.GetUserFavorites).
		WithMethod(http.MethodGet).
		WithBuilders(defaultBuilder).
		WithMiddlewares(userMiddleware).
		HandleEndpoint(mux)
	jhttp.
		NewEndpointFunction("/api/user/favorite", recipeHandler.FavoriteRecipe).
		WithMethod(http.MethodPost).
		WithBuilders(defaultBuilder).
		WithMiddlewares(userMiddleware).
		HandleEndpoint(mux)
	jhttp.
		NewEndpointFunction("/api/user/favorite", recipeHandler.UnFavoriteRecipe).
		WithMethod(http.MethodDelete).
		WithBuilders(defaultBuilder).
		WithMiddlewares(userMiddleware).
		HandleEndpoint(mux)

	// Test
	jhttp.
		NewEndpointFunction("/api/ping", HandlePing).
		WithMethod(http.MethodPost).
		WithBuilders(defaultBuilder).
		HandleEndpoint(mux)

	fmt.Printf("Starting server on port %s\n", config.Port)
	http.ListenAndServe(fmt.Sprintf(":%s", config.Port), mux)
}
