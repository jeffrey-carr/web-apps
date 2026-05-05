package recipe

import (
	"context"
	"go-common/types"
	"recipe-book/domains/files"
)

// Controller represents a recipe controller
type Controller interface {
	CreateRecipe(
		ctx context.Context,
		user types.CommonUser,
		createRequest CreateRecipeRequest,
		imageCreateRequest *files.CreateRequest,
	) (Recipe, error)
	GetRecipe(ctx context.Context, recipeID string) (Recipe, error)
	UpdateRecipe(
		ctx context.Context,
		existingRecipe Recipe,
		updateRequest UpdateRequest,
		imageCreateRequest *files.CreateRequest,
	) (Recipe, error)
	DeleteRecipe(ctx context.Context, recipeUUID string) error
	FavoriteRecipe(ctx context.Context, user types.CommonUser, recipeID string) (UserFavorite, error)
	UnFavoriteRecipe(ctx context.Context, user types.CommonUser, recipeUUID string) error
	GetPublicRecipe(ctx context.Context, recipeID string) (PublicRecipe, error)
	GetAllUserFavorites(ctx context.Context, userUUID string) ([]UserFavorite, error)
	Search(ctx context.Context, opts SearchOpts) ([]PublicRecipe, int64, error)
	GetAllTags(ctx context.Context) ([]Tag, error)
}
