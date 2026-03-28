package recipe

import (
	"context"
	"go-common/types"
)

type Controller interface {
	CreateRecipe(ctx context.Context, user types.CommonUser, createRequest CreateRecipeRequest) (Recipe, error)
	GetRecipe(ctx context.Context, recipeID string) (Recipe, error)
	DeleteRecipe(ctx context.Context, recipeUUID string) error
	FavoriteRecipe(ctx context.Context, user types.CommonUser, recipeID string) (UserFavorite, error)
	UnFavoriteRecipe(ctx context.Context, user types.CommonUser, recipeUUID string) error
	GetPublicRecipe(ctx context.Context, recipeID string) (PublicRecipe, error)
	GetAllUserFavorites(ctx context.Context, userUUID string) ([]UserFavorite, error)
	GetHomeRecipes(ctx context.Context, page, limit int64) ([]PublicRecipe, error)
	Search(ctx context.Context, opts SearchOpts) ([]PublicRecipe, error)
	FuzzySearchRecipeName(ctx context.Context, query string) ([]Recipe, error)
	GetAllTags(ctx context.Context) ([]Tag, error)
}
