package main

import (
	"fmt"
	"go-common/jhttp"
	"go-common/jhttp/middlewares"
	jMongo "go-common/services/mongo"
	"go-common/utils"
	"net/http"
	"recipe-book/recipe"
	"recipe-book/types"

	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

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

	// MIDDLEWARES //
	userMiddleware := middlewares.GetUser{Environment: config.Environment}
	authMiddleware := middlewares.RequireAuth{Environment: config.Environment}

	// REPOSITORIES //
	recipeRepo := recipe.Repository{MongoClient: recipeMongoCollection}

	// HANDLERS //
	recipeHandler := recipe.Handler{Repo: recipeRepo}

	// ROUTER //
	http.NewServeMux()

	// ENDPOINTS //
	// Recipe
	http.HandleFunc(
		"POST /api/recipe",
		jhttp.NewEndpoint(
			recipeHandler.Create,
			nil,
			userMiddleware,
			authMiddleware,
		),
	)
	http.HandleFunc(
		"GET /api/recipe",
		jhttp.NewEndpoint(
			recipeHandler.GetRecipes,
			nil,
		),
	)

	fmt.Printf("Starting server on port %s\n", config.Port)
	http.ListenAndServe(fmt.Sprintf(":%s", config.Port), nil)
}
