package recipe

import (
	"context"
	"fmt"
	"go-common/services/mongo"
	"time"
)

const (
	authorUUIDKey = "authorUUID"
	userUUIDKey   = "userUUID"
	slugKey       = "slug"
)

// Repository represents the recipe repository
type Repository struct {
	recipeClient    mongo.Mongo[Recipe]
	favoritesClient mongo.Mongo[UserFavorite]
}

// NewRepository creates a new Recipe repository
func NewRepository(
	recipeMongoClient mongo.Mongo[Recipe],
	favoritesMongoClient mongo.Mongo[UserFavorite],
) Repository {
	return Repository{
		recipeClient:    recipeMongoClient,
		favoritesClient: favoritesMongoClient,
	}
}

// GetAllUserRecipes gets all a user's created recipes (duh)
func (r *Repository) GetAllUserRecipes(ctx context.Context, userUUID string) ([]Recipe, error) {
	return r.recipeClient.GetByKey(ctx, authorUUIDKey, userUUID)
}

// GetAllUserFavorites gets all a user's favorited recipes
func (r *Repository) GetAllUserFavorites(ctx context.Context, userUUID string) ([]UserFavorite, error) {
	return r.favoritesClient.GetByKey(ctx, userUUIDKey, userUUID)
}

// Create saves a recipe in Mongo
func (r *Repository) Create(ctx context.Context, recipe Recipe) error {
	recipe.CreatedAt = time.Now().UnixMilli()
	recipe.ModifiedAt = time.Now().UnixMilli()
	return r.recipeClient.InsertItem(ctx, recipe)
}

// SaveUserFavorite saves a user favorite in Mongo
func (r *Repository) SaveUserFavorite(ctx context.Context, favorite UserFavorite) error {
	favorite.FavoritedAt = time.Now().UnixMilli()
	return r.favoritesClient.InsertItem(ctx, favorite)
}

// GetRecipeByUUID gets a recipe by its UUID
func (r *Repository) GetRecipeByUUID(ctx context.Context, uuid string) (Recipe, error) {
	return r.recipeClient.GetByUUID(ctx, uuid)
}

// GetRecipeBySlug gets a recipe by its slug
func (r *Repository) GetRecipeBySlug(ctx context.Context, slug string) (Recipe, error) {
	recipes, err := r.recipeClient.GetByKey(ctx, slugKey, slug)
	if err != nil {
		return Recipe{}, err
	}

	return recipes[0], nil
}

// GetRecipes gets a ranom set of `limit` recipes
func (r *Repository) GetRecipes(ctx context.Context, page, limit int64) ([]Recipe, error) {
	return r.recipeClient.ListItems(ctx, page, min(limit, 10))
}

// GetMatchingSlugPrefix gets a list of recipes that have a matching slug prefix
func (r *Repository) GetMatchingSlugPrefix(ctx context.Context, slug string) ([]Recipe, error) {
	return r.recipeClient.PrefixSearch(ctx, slugKey, fmt.Sprintf("%s(-([0-9]+)?)?$", slug))
}
