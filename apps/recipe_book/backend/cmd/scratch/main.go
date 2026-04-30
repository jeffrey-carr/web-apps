package main

import (
	"context"
	"federation/sdk"
	"fmt"
	"go-common/services/jmongo"
	"go-common/utils"
	recipeDomain "recipe-book/domains/recipe"
	"recipe-book/recipe"
	"recipe-book/types"
	"strings"

	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

// Services holds all initialized components for easy access in the scratchpad.
type Services struct {
	Config           types.Config
	MongoClient      *mongo.Client
	RecipeRepo       recipe.Repository
	RecipeController recipe.Controller
	RecipeHandler    recipeDomain.Handler
	FederationSDK    sdk.SDK
}

func main() {
	ctx := context.Background()

	// Loading config from project root
	config, err := utils.OpenAndReadJSON[types.Config](".env")
	if err != nil {
		panic(fmt.Errorf("could not load config from .env: %w", err))
	}

	// SERVICES //
	mongoClient, err := mongo.Connect(options.Client().ApplyURI(config.MongoURL))
	if err != nil {
		panic(fmt.Errorf("could not connect to MongoDB: %w", err))
	}
	defer func() {
		if err := mongoClient.Disconnect(ctx); err != nil {
			fmt.Printf("Error disconnecting from MongoDB: %v\n", err)
		}
	}()

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

	// REPOSITORIES //
	recipeRepo := recipe.NewRepository(recipeMongoCollection, userFavoritesMongoCollection, tagMongoCollection)

	// CONTROLLERS //
	recipeController := recipe.NewController(federationSDK, recipeRepo)

	// HANDLERS //
	recipeHandler := recipeDomain.NewHandler(recipeController)

	services := &Services{
		Config:           config,
		MongoClient:      mongoClient,
		RecipeRepo:       recipeRepo,
		RecipeController: recipeController,
		RecipeHandler:    recipeHandler,
		FederationSDK:    federationSDK,
	}

	fmt.Println("--- Scratchpad Session Started ---")
	if err := run(ctx, services); err != nil {
		fmt.Printf("Error during scratchpad execution: %v\n", err)
	}
	fmt.Println("--- Scratchpad Session Ended ---")
}

func run(ctx context.Context, s *Services) error {
	// ARBITRARY CODE GOES HERE //

	recipes, err := s.RecipeRepo.GetAllUserRecipes(ctx, "e590c126-acb0-4490-be81-6dca3c294e90")
	if err != nil {
		return err
	}

	recipeByUUID := map[string]recipeDomain.Recipe{}
	recToCount := map[string]int{}
	for _, rec := range recipes {
		cleanedName := strings.ToLower(strings.TrimSpace(rec.Name))
		recToCount[cleanedName]++
		recipeByUUID[rec.UUID] = rec
	}

	for name, count := range recToCount {
		if count > 1 {
			fmt.Printf("Recipe %s has %d instances\n", name, count)
		}
	}

	return nil
}
