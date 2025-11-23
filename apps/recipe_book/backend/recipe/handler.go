package recipe

import (
	"context"
	"fmt"
	"go-common/jcontext"
	"go-common/jhttp"
	JHTTPErrors "go-common/jhttp/errors"
	recipeBookTypes "recipe-book/types"
)

// Handler represents the recipe handler
type Handler struct {
	controller Controller
}

func NewHandler(controller Controller) Handler {
	return Handler{
		controller: controller,
	}
}

// Create allows users to create new recipes
func (h Handler) Create(ctx context.Context, r jhttp.RequestData[CreateRecipeRequest]) (*string, *JHTTPErrors.JHTTPError) {
	user, ok := jcontext.GetUser(ctx)
	if !ok {
		fmt.Println("no user :(")
		return nil, JHTTPErrors.NewUnauthorizedError()
	}

	if r.Body == nil {
		return nil, JHTTPErrors.NewBadRequestError("Bad request")
	}

	request := *r.Body
	if validationErr := ValidateRecipeCreateRequest(request); validationErr != "" {
		fmt.Printf("Validation failed! %s\n", validationErr)
		return nil, JHTTPErrors.NewValidationError(validationErr)
	}

	recipe, err := h.controller.CreateRecipe(ctx, user, request)
	if err != nil {
		return nil, JHTTPErrors.NewInternalServerError(err)
	}

	return &recipe.Slug, nil
}

// Favorite recipe saves a recipe to a user's list of favorite recipes. Supports both UUID and slug identifiers
func (h Handler) FavoriteRecipe(ctx context.Context, r jhttp.RequestData[struct{}]) (*struct{}, *JHTTPErrors.JHTTPError) {
	user, ok := jcontext.GetUser(ctx)
	if !ok {
		return nil, JHTTPErrors.NewUnauthorizedError()
	}

	recipeID := r.Query.Get(RecipeIDQueryParameterName)
	if recipeID == "" {
		return nil, JHTTPErrors.NewBadRequestError("Recipe ID is required")
	}

	err := h.controller.FavoriteRecipe(ctx, user, recipeID)
	if err != nil {
		return nil, JHTTPErrors.NewInternalServerError(err)
	}

	return nil, nil
}

// Get gets a recipe. It can get a recipe by it's UUID or slug
func (h Handler) Get(ctx context.Context, r jhttp.RequestData[struct{}]) (*Recipe, *JHTTPErrors.JHTTPError) {
	recipeID, ok := r.PathValues[RecipeIDPathVar]
	if !ok {
		return nil, JHTTPErrors.NewBadRequestError("Recipe ID is required")
	}

	recipe, err := h.controller.GetRecipe(ctx, recipeID)
	if err == recipeBookTypes.ErrNotFound {
		return nil, JHTTPErrors.NewNotFoundError(recipeID)
	} else if err != nil {
		return nil, JHTTPErrors.NewInternalServerError(err)
	}

	return &recipe, nil
}

// GetRecipes isn't completed yet
func (h Handler) GetRecipes(ctx context.Context, r jhttp.RequestData[struct{}]) (*[]Recipe, *JHTTPErrors.JHTTPError) {
	recipes, err := h.controller.GetHomeRecipes(ctx)
	if err != nil {
		return nil, JHTTPErrors.NewInternalServerError(err)
	}

	return &recipes, nil
}
