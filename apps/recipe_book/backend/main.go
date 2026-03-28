package main

import (
	"context"
	"federation/sdk"
	"fmt"
	"go-common/jhttp"
	JHTTPErrors "go-common/jhttp/errors"
	"go-common/jhttp/middlewares"
	"go-common/services/jmongo"
	"go-common/utils"
	"net/http"
	recipeDomain "recipe-book/domains/recipe"
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
	federationSDK := sdk.NewSDK(config.FederationAPIKey)

	// MIDDLEWARES //
	userMiddleware := middlewares.NewGetUser(nil)
	authMiddleware := middlewares.NewRequireAuth(false)

	// REPOSITORIES //
	recipeRepo := recipe.NewRepository(recipeMongoCollection, userFavoritesMongoCollection, tagMongoCollection)

	// CONTROLLERS //
	recipeController := recipe.NewController(federationSDK, recipeRepo)

	// HANDLERS //
	recipeHandler := recipeDomain.NewRecipeHandler(recipeController)

	// ROUTER //
	mux := http.NewServeMux()

	// ENDPOINTS //
	// Recipe
	mux.HandleFunc(
		"POST /api/recipe",
		jhttp.NewEndpoint(
			recipeHandler.Create,
			nil,
			userMiddleware,
			authMiddleware,
		),
	)

	mux.HandleFunc(
		"GET /api/recipe/all-tags",
		jhttp.NewEndpoint(
			recipeHandler.GetAllTags,
			nil,
		),
	)
	mux.HandleFunc(
		"GET /api/recipe/search",
		jhttp.NewEndpoint(
			recipeHandler.Search,
			nil,
			userMiddleware,
		),
	)
	mux.HandleFunc(
		fmt.Sprintf("GET /api/recipe/{%s}", recipeDomain.RecipeIDPathVar),
		jhttp.NewEndpoint(
			recipeHandler.Get,
			[]string{recipeDomain.RecipeIDPathVar},
			userMiddleware,
		),
	)
	mux.HandleFunc(
		"GET /api/recipe",
		jhttp.NewEndpoint(
			recipeHandler.GetRecipes,
			nil,
			userMiddleware,
		),
	)
	mux.HandleFunc(
		"DELETE /api/recipe",
		jhttp.NewEndpoint(
			recipeHandler.DeleteRecipe,
			nil,
			userMiddleware,
		),
	)

	// User
	mux.HandleFunc(
		"GET /api/user/favorites",
		jhttp.NewEndpoint(
			recipeHandler.GetUserFavorites,
			nil,
			userMiddleware,
		),
	)
	mux.HandleFunc(
		"POST /api/user/favorite-recipe",
		jhttp.NewEndpoint(
			recipeHandler.FavoriteRecipe,
			nil,
			userMiddleware,
		),
	)
	mux.HandleFunc(
		"DELETE /api/user/unfavorite-recipe",
		jhttp.NewEndpoint(
			recipeHandler.UnFavoriteRecipe,
			nil,
			userMiddleware,
		),
	)

	// Test
	mux.HandleFunc(
		"POST /api/ping",
		jhttp.NewEndpoint(
			HandlePing,
			nil,
		),
	)

	fmt.Printf("Starting server on port %s\n", config.Port)
	http.ListenAndServe(fmt.Sprintf(":%s", config.Port), mux)
}
