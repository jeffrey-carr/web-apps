package recipe

import (
	"context"
	"go-common/jcontext"
	"go-common/jhttp"
	JHTTPErrors "go-common/jhttp/errors"
	"go-common/types"
	"go-common/utils"
	"strconv"
	"strings"
)

const (
	RecipeIDPathVar            = "recipeID"
	RecipeIDQueryParameterName = "recipe"
)

// RecipeHandler represents the recipe handler
type RecipeHandler struct {
	controller Controller
}

// NewRecipeHandler creates a new Recipe handler
func NewRecipeHandler(controller Controller) RecipeHandler {
	return RecipeHandler{
		controller: controller,
	}
}

// Create allows users to create new recipes
func (h RecipeHandler) Create(ctx context.Context, r jhttp.RequestData[CreateRecipeRequest]) (*CreateRecipeResponse, *JHTTPErrors.JHTTPError) {
	user, ok := jcontext.GetUser(ctx)
	if !ok {
		return nil, JHTTPErrors.NewUnauthorizedError()
	}

	if r.Body == nil {
		return nil, JHTTPErrors.NewBadRequestError("Bad request")
	}

	request := *r.Body
	if validationErr := ValidateRecipeCreateRequest(request); validationErr != "" {
		return nil, JHTTPErrors.NewValidationError(validationErr)
	}

	recipe, err := h.controller.CreateRecipe(ctx, user, request)
	if err != nil {
		return nil, JHTTPErrors.NewInternalServerError(err)
	}

	return &CreateRecipeResponse{Slug: recipe.Slug}, nil
}

func (h RecipeHandler) Update(ctx context.Context, r jhttp.RequestData[RecipeUpdateRequest]) (*Recipe, *JHTTPErrors.JHTTPError) {
	user, ok := jcontext.GetUser(ctx)
	if !ok {
		return nil, JHTTPErrors.NewUnauthorizedError()
	}

	recipeUUID := r.Query.Get("recipe")
	if recipeUUID == "" {
		return nil, JHTTPErrors.NewBadRequestError("Recipe UUID is required")
	}

	if r.Body == nil {
		return nil, JHTTPErrors.NewBadRequestError("Bad request")
	}

	request := *r.Body
	if validationErr := ValidateRecipeUpdateRequest(request); validationErr != "" {
		return nil, JHTTPErrors.NewValidationError(validationErr)
	}

	existingRecipe, err := h.controller.GetRecipe(ctx, recipeUUID)
	if err == types.ErrNotFound {
		return nil, JHTTPErrors.NewNotFoundError(recipeUUID)
	}
	if err != nil {
		return nil, JHTTPErrors.NewInternalServerError(err)
	}

	if !user.IsAdmin && existingRecipe.AuthorUUID != user.UUID {
		return nil, JHTTPErrors.NewForbiddenError()
	}

	updatedRecipe, err := h.controller.UpdateRecipe(ctx, existingRecipe, request)
	if err != nil {
		return nil, JHTTPErrors.NewInternalServerError(err)
	}

	return &updatedRecipe, nil
}

// DeleteRecipe deletes a recipe
func (h RecipeHandler) DeleteRecipe(ctx context.Context, r jhttp.RequestData[struct{}]) (*struct{}, *JHTTPErrors.JHTTPError) {
	user, ok := jcontext.GetUser(ctx)
	if !ok {
		return nil, JHTTPErrors.NewUnauthorizedError()
	}

	recipeUUID := r.Query.Get(RecipeIDQueryParameterName)
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
func (h RecipeHandler) FavoriteRecipe(ctx context.Context, r jhttp.RequestData[struct{}]) (*UserFavorite, *JHTTPErrors.JHTTPError) {
	user, ok := jcontext.GetUser(ctx)
	if !ok {
		return nil, JHTTPErrors.NewUnauthorizedError()
	}

	recipeID := r.Query.Get(RecipeIDQueryParameterName)
	if recipeID == "" {
		return nil, JHTTPErrors.NewBadRequestError("Recipe ID is required")
	}

	fav, err := h.controller.FavoriteRecipe(ctx, user, recipeID)
	if err == ErrAlreadyFavorited {
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

	recipeID := r.Query.Get(RecipeIDQueryParameterName)
	if recipeID == "" {
		return nil, JHTTPErrors.NewBadRequestError("Recipe ID is required")
	}

	err := h.controller.UnFavoriteRecipe(ctx, user, recipeID)
	if err == ErrNotFavorited {
		return nil, JHTTPErrors.NewBadRequestError("Recipe is not favorited")
	}
	if err != nil {
		return nil, JHTTPErrors.NewInternalServerError(err)
	}

	return nil, nil
}

// GetUserFavorites gets all of a user's favorites
func (h RecipeHandler) GetUserFavorites(ctx context.Context, r jhttp.RequestData[struct{}]) (*[]UserFavorite, *JHTTPErrors.JHTTPError) {
	user, ok := jcontext.GetUser(ctx)
	if !ok {
		return nil, JHTTPErrors.NewBadRequestError("User is not logged in.")
	}

	favorites, err := h.controller.GetAllUserFavorites(ctx, user.UUID)
	if err == types.ErrNotFound {
		return nil, JHTTPErrors.NewNotFoundError(user.UUID)
	}
	if err != nil {
		return nil, JHTTPErrors.NewInternalServerError(err)
	}

	return &favorites, nil
}

// Get gets a recipe. It can get a recipe by it's UUID or slug
func (h RecipeHandler) Get(ctx context.Context, r jhttp.RequestData[struct{}]) (*PublicRecipe, *JHTTPErrors.JHTTPError) {
	recipeID, ok := r.PathValues[RecipeIDPathVar]
	if !ok {
		return nil, JHTTPErrors.NewBadRequestError("Recipe ID is required")
	}

	recipe, err := h.controller.GetPublicRecipe(ctx, recipeID)
	if err == types.ErrNotFound {
		return nil, JHTTPErrors.NewNotFoundError(recipeID)
	} else if err != nil {
		return nil, JHTTPErrors.NewInternalServerError(err)
	}

	return &recipe, nil
}

// GetAllTags gets all existing tags
// TODO: make the tag fetch iterative on the front as user types
func (h RecipeHandler) GetAllTags(ctx context.Context, r jhttp.RequestData[struct{}]) (*[]Tag, *JHTTPErrors.JHTTPError) {
	tags, err := h.controller.GetAllTags(ctx)
	if err != nil {
		return nil, JHTTPErrors.NewInternalServerError(err)
	}

	return &tags, nil
}

// Search searches for a specified recipe. If no search parameters are passed, gets 10 random recipes
func (h RecipeHandler) Search(ctx context.Context, r jhttp.RequestData[struct{}]) (*PaginatedResponse[[]PublicRecipe], *JHTTPErrors.JHTTPError) {
	recipeName := r.Query.Get("name")
	favoritesOnly := r.Query.Get("favorites_only")
	tagUUIDsString := r.Query.Get("tags")
	tagUUIDs := strings.Split(tagUUIDsString, ",")
	tagUUIDs = utils.Filter(tagUUIDs, func(uuid string) bool { return uuid != "" })
	authorUUID := r.Query.Get("author")
	limitStr := r.Query.Get("limit")
	pageStr := r.Query.Get("page")

	if favoritesOnly == "true" {
		_, ok := jcontext.GetUser(ctx)
		if !ok {
			return nil, JHTTPErrors.NewUnauthorizedError()
		}
	}

	opts := SearchOpts{
		FavoritesOnly: favoritesOnly == "true",
	}

	if recipeName != "" {
		opts.Name = &recipeName
	}
	if len(tagUUIDs) > 0 {
		opts.TagUUIDs = &tagUUIDs
	}
	if authorUUID != "" {
		opts.AuthorUUID = &authorUUID
	}

	var limit int64
	var page int64
	var err error
	if limitStr != "" {
		limit, err = strconv.ParseInt(limitStr, 10, 64)
		if err != nil {
			return nil, JHTTPErrors.NewBadRequestError("limit must be an integer")
		}
		if limit <= 0 {
			return nil, JHTTPErrors.NewBadRequestError("limit must be >= 0")
		}
	}
	if pageStr != "" {
		page, err = strconv.ParseInt(pageStr, 10, 64)
		if err != nil {
			return nil, JHTTPErrors.NewBadRequestError("page must be an integer")
		}
	}
	if limit <= 0 {
		limit = 10
	}
	opts.Limit = min(limit, 200)
	opts.Page = max(1, page)

	recipes, total, err := h.controller.Search(ctx, opts)
	if err == types.ErrNotFound {
		return nil, JHTTPErrors.NewNotFoundError(opts)
	}
	if err != nil {
		return nil, JHTTPErrors.NewInternalServerError(err)
	}

	return &PaginatedResponse[[]PublicRecipe]{
		Data:  recipes,
		Total: total,
		Page:  opts.Page,
		Limit: opts.Limit,
	}, nil
}
