package recipe

import (
	"context"
	"fmt"
	"go-common/types"
	"go-common/utils"
	"recipe-book/mappers"
	recipeBookTypes "recipe-book/types"
	"strconv"
)

// Controller controls the business logic for recipes
type Controller struct {
	repo Repository
}

// NewController creates a new recipe controller
func NewController(repo Repository) Controller {
	return Controller{
		repo: repo,
	}
}

// CreateRecipe creates a new recipe
func (c Controller) CreateRecipe(ctx context.Context, user types.CommonUser, createRequest CreateRecipeRequest) (Recipe, error) {
	slug, err := c.getAvailableSlug(ctx, createRequest.Name)
	if err != nil {
		return Recipe{}, err
	}
	createRequest.Slug = slug

	recipe, err := recipeCreateRequestToRecipe(createRequest, user)
	if err != nil {
		return Recipe{}, err
	}

	err = c.repo.Create(ctx, recipe)
	if err != nil {
		return Recipe{}, err
	}
	return Recipe{}, nil
}

// FavoriteRecipe saves a user's favorite recipe
func (c Controller) FavoriteRecipe(ctx context.Context, user types.CommonUser, recipeID string) error {
	rec, err := c.GetRecipe(ctx, recipeID)
	if err != nil {
		return err
	}

	favObject := recipeFavoriteRequestToFavorite(user, rec)
	return c.repo.SaveUserFavorite(ctx, favObject)
}

// GetRecipe gets a recipe by it's ID. It supports both UUID and slug identifiers
func (c Controller) GetRecipe(ctx context.Context, recipeID string) (Recipe, error) {
	var recipe Recipe
	var err error
	if utils.IsUUID(recipeID) {
		recipe, err = c.repo.GetRecipeByUUID(ctx, recipeID)
	} else {
		recipe, err = c.repo.GetRecipeBySlug(ctx, recipeID)
	}
	if err != nil {
		return Recipe{}, err
	}

	return recipe, nil
}

// GetAllUserFavorites gets all a user's favorites
func (c Controller) GetAllUserFavorites(ctx context.Context, user types.CommonUser) ([]UserFavorite, error) {
	favs, err := c.repo.GetAllUserFavorites(ctx, user.UUID)
	if err != nil && err != recipeBookTypes.ErrNotFound {
		return nil, err
	}

	return favs, nil
}

// GetHomeRecipes gets the list of recipes for the home screen, curated for
// the users
func (c Controller) GetHomeRecipes(ctx context.Context) ([]Recipe, error) {
	return c.repo.GetRecipes(ctx, 1, 10)
}

// getAvailableSlug gets the next available slug for a recipe name
func (c Controller) getAvailableSlug(ctx context.Context, recipeName string) (string, error) {
	slugified, err := mappers.SlugifyString(recipeName)
	if err != nil {
		return "", err
	}

	sluggedRecipes, err := c.repo.GetMatchingSlugPrefix(ctx, slugified)
	if err != nil {
		return "", err
	}
	fmt.Printf("got %d recipes with similar slugs:\n", len(sluggedRecipes))
	for _, r := range sluggedRecipes {
		fmt.Printf("\tRecipe: %s\n", r.Name)
		fmt.Printf("\tSlug: %s\n", r.Slug)
	}

	// Find the next available number
	if len(sluggedRecipes) == 0 {
		return slugified, nil
	}

	utils.Filter(sluggedRecipes, func(r Recipe) bool { return len(r.Slug) > 0 })

	biggest := 0
	for _, r := range sluggedRecipes {
		slugNumStr := r.Slug[len(r.Slug)-1:]
		slugNum, err := strconv.ParseInt(slugNumStr, 0, 64)
		if err != nil {
			continue
		}

		biggest = max(biggest, int(slugNum))
	}

	slugified = fmt.Sprintf("%s-%d", slugified, biggest+1)
	fmt.Printf("final slug: %s\n", slugified)

	return slugified, nil
}
