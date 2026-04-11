package recipe

import (
	"context"
	"go-common/types"
)

type Controller interface {
	CreateRecipe(ctx context.Context, user types.CommonUser, createRequest CreateRecipeRequest) (Recipe, error)
	GetRecipe(ctx context.Context, recipeID string) (Recipe, error)
	UpdateRecipe(ctx context.Context, existingRecipe Recipe, updateRequest RecipeUpdateRequest) (Recipe, error)
	DeleteTag(ctx context.Context, tagUUID string) error
	DeleteRecipe(ctx context.Context, recipeUUID string) error
	FavoriteRecipe(ctx context.Context, user types.CommonUser, recipeID string) (UserFavorite, error)
	UnFavoriteRecipe(ctx context.Context, user types.CommonUser, recipeUUID string) error
	GetPublicRecipe(ctx context.Context, recipeID string) (PublicRecipe, error)
	GetAllUserFavorites(ctx context.Context, userUUID string) ([]UserFavorite, error)
	Search(ctx context.Context, opts SearchOpts) ([]PublicRecipe, int64, error)
	FuzzySearchRecipeName(ctx context.Context, query string) ([]Recipe, error)
	GetAllTags(ctx context.Context) ([]Tag, error)
}
