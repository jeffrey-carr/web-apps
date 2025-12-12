package handlers

import (
	"context"
	"go-common/jcontext"
	"go-common/jhttp"
	JHTTPErrors "go-common/jhttp/errors"
	"go-common/types"
	"recipe-book/recipe"
	recipeBookTypes "recipe-book/types"
)

// RecipeHandler represents the recipe handler
type RecipeHandler struct {
	controller recipe.Controller
}

// NewRecipeHandler creates a new Recipe handler
func NewRecipeHandler(controller recipe.Controller) RecipeHandler {
	return RecipeHandler{
		controller: controller,
	}
}

// Create allows users to create new recipes
func (h RecipeHandler) Create(ctx context.Context, r jhttp.RequestData[recipe.CreateRecipeRequest]) (*string, *JHTTPErrors.JHTTPError) {
	user, ok := jcontext.GetUser(ctx)
	if !ok {
		return nil, JHTTPErrors.NewUnauthorizedError()
	}

	if r.Body == nil {
		return nil, JHTTPErrors.NewBadRequestError("Bad request")
	}

	request := *r.Body
	if validationErr := recipe.ValidateRecipeCreateRequest(request); validationErr != "" {
		return nil, JHTTPErrors.NewValidationError(validationErr)
	}

	recipe, err := h.controller.CreateRecipe(ctx, user, request)
	if err != nil {
		return nil, JHTTPErrors.NewInternalServerError(err)
	}

	return &recipe.Slug, nil
}

// DeleteRecipe deletes a recipe
func (h RecipeHandler) DeleteRecipe(ctx context.Context, r jhttp.RequestData[struct{}]) (*struct{}, *JHTTPErrors.JHTTPError) {
	user, ok := jcontext.GetUser(ctx)
	if !ok {
		return nil, JHTTPErrors.NewUnauthorizedError()
	}

	recipeUUID := r.Query.Get(recipe.RecipeIDQueryParameterName)
	if recipeUUID == "" {
		return nil, JHTTPErrors.NewBadRequestError("Recipe UUID is required")
	}

	// If the user is an admin, we can skip fetching the recipe and just delete the thing
	if user.IsAdmin {
		return nil, h.deleteRecipe(ctx, recipeUUID)
	}

	rec, err := h.controller.GetRecipe(ctx, recipeUUID)
	if err == types.ErrNotFound {
		return nil, JHTTPErrors.NewNotFoundError(recipeUUID)
	}
	if err != nil {
		return nil, JHTTPErrors.NewInternalServerError(err)
	}

	if user.UUID != rec.AuthorUUID {
		return nil, JHTTPErrors.NewUnauthorizedError()
	}

	return nil, h.deleteRecipe(ctx, recipeUUID)
}

func (h RecipeHandler) deleteRecipe(ctx context.Context, recipeUUID string) *JHTTPErrors.JHTTPError {
	err := h.controller.DeleteRecipe(ctx, recipeUUID)
	if err == types.ErrNotFound {
		return JHTTPErrors.NewNotFoundError(recipeUUID)
	}
	if err != nil {
		return JHTTPErrors.NewInternalServerError(err)
	}

	return nil
}

// FavoriteRecipe saves a recipe to a user's list of favorite recipes. Supports both UUID and slug identifiers
func (h RecipeHandler) FavoriteRecipe(ctx context.Context, r jhttp.RequestData[struct{}]) (*recipe.UserFavorite, *JHTTPErrors.JHTTPError) {
	user, ok := jcontext.GetUser(ctx)
	if !ok {
		return nil, JHTTPErrors.NewUnauthorizedError()
	}

	recipeID := r.Query.Get(recipe.RecipeIDQueryParameterName)
	if recipeID == "" {
		return nil, JHTTPErrors.NewBadRequestError("Recipe ID is required")
	}

	fav, err := h.controller.FavoriteRecipe(ctx, user, recipeID)
	if err == recipe.ErrAlreadyFavorited {
		return nil, JHTTPErrors.NewBadRequestError("Recipe is already favorited")
	}
	if err != nil {
		return nil, JHTTPErrors.NewInternalServerError(err)
	}

	return &fav, nil
}

// UnFavoriteRecipe unfavorites a recipe
func (h RecipeHandler) UnFavoriteRecipe(ctx context.Context, r jhttp.RequestData[struct{}]) (*struct{}, *JHTTPErrors.JHTTPError) {
	user, ok := jcontext.GetUser(ctx)
	if !ok {
		return nil, JHTTPErrors.NewUnauthorizedError()
	}

	recipeID := r.Query.Get(recipe.RecipeIDQueryParameterName)
	if recipeID == "" {
		return nil, JHTTPErrors.NewBadRequestError("Recipe ID is required")
	}

	err := h.controller.UnFavoriteRecipe(ctx, user, recipeID)
	if err == recipe.ErrNotFavorited {
		return nil, JHTTPErrors.NewBadRequestError("Recipe is not favorited")
	}
	if err != nil {
		return nil, JHTTPErrors.NewInternalServerError(err)
	}

	return nil, nil
}

// GetUserFavorites gets all of a user's favorites
func (h RecipeHandler) GetUserFavorites(ctx context.Context, r jhttp.RequestData[struct{}]) (*[]recipe.UserFavorite, *JHTTPErrors.JHTTPError) {
	user, ok := jcontext.GetUser(ctx)
	if !ok {
		return nil, JHTTPErrors.NewBadRequestError("User is not logged in.")
	}

	favorites, err := h.controller.GetAllUserFavorites(ctx, user)
	if err != nil {
		return nil, JHTTPErrors.NewInternalServerError(err)
	}

	return &favorites, nil
}

// Get gets a recipe. It can get a recipe by it's UUID or slug
func (h RecipeHandler) Get(ctx context.Context, r jhttp.RequestData[struct{}]) (*recipe.Recipe, *JHTTPErrors.JHTTPError) {
	recipeID, ok := r.PathValues[recipe.RecipeIDPathVar]
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
func (h RecipeHandler) GetRecipes(ctx context.Context, r jhttp.RequestData[struct{}]) (*[]recipe.Recipe, *JHTTPErrors.JHTTPError) {
	recipes, err := h.controller.GetHomeRecipes(ctx)
	if err != nil {
		return nil, JHTTPErrors.NewInternalServerError(err)
	}

	return &recipes, nil
}
