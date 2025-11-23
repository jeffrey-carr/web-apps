package main

import (
	"context"
	"fmt"
	"go-common/jhttp"
	JHTTPErrors "go-common/jhttp/errors"
	"go-common/jhttp/middlewares"
	jMongo "go-common/services/mongo"
	"go-common/utils"
	"net/http"
	"recipe-book/recipe"
	"recipe-book/types"

	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

// HandlePing handles the test 'ping' function
func HandlePing(ctx context.Context, r jhttp.RequestData[struct{}]) (*string, *JHTTPErrors.JHTTPError) {
	msg := "pong!"
	return &msg, nil
}

func main() {
	config, err := utils.OpenAndReadJSON[types.Config](".env")
	if err != nil {
		panic(fmt.Errorf("could not load config %w", err))
	}

	fmt.Printf("Loaded config: %+v\n", config)

	// SERVICES //
	mongoClient, err := mongo.Connect(options.Client().ApplyURI(config.MongoURL))
	if err != nil {
		panic(err)
	}
	recipeMongoCollection, err := jMongo.NewMongo[recipe.Recipe](mongoClient, "recipe_book", "recipes")
	if err != nil {
		panic(err)
	}
	userFavoritesMongoCollection, err := jMongo.NewMongo[recipe.UserFavorite](mongoClient, "recipe_book", "user_favorites")
	if err != nil {
		panic(err)
	}

	// MIDDLEWARES //
	userMiddleware := middlewares.GetUser{Environment: config.Environment}
	authMiddleware := middlewares.RequireAuth{Environment: config.Environment}
	middlewareManager := middlewares.Manager{Middlewares: []middlewares.Middleware{userMiddleware}}

	// REPOSITORIES //
	recipeRepo := recipe.NewRepository(recipeMongoCollection, userFavoritesMongoCollection)

	// CONTROLLERS //
	recipeController := recipe.NewController(recipeRepo)

	// HANDLERS //
	recipeHandler := recipe.NewHandler(recipeController)

	// ROUTER //
	http.NewServeMux()

	// ENDPOINTS //
	// Recipe
	http.HandleFunc(
		"POST /api/recipe",
		jhttp.NewEndpointWithManager(
			recipeHandler.Create,
			nil,
			middlewareManager.WithMiddlewares(authMiddleware),
		),
	)

	http.HandleFunc(
		fmt.Sprintf("GET /api/recipe/{%s}", recipe.RecipeIDPathVar),
		jhttp.NewEndpointWithManager(
			recipeHandler.Get,
			[]string{recipe.RecipeIDPathVar},
			middlewareManager,
		),
	)
	http.HandleFunc(
		"GET /api/recipe",
		jhttp.NewEndpointWithManager(
			recipeHandler.GetRecipes,
			nil,
			middlewareManager,
		),
	)

	// Test
	http.HandleFunc(
		"POST /api/ping",
		jhttp.NewEndpoint(
			HandlePing,
			nil,
		),
	)

	fmt.Printf("Starting server on port %s\n", config.Port)
	http.ListenAndServe(fmt.Sprintf(":%s", config.Port), nil)
}
