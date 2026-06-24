package recipe

import (
	"context"
	"encoding/json"
	"go-common/jcontext"
	"go-common/jhttp"
	JHTTPErrors "go-common/jhttp/errors"
	"go-common/types"
	"go-common/utils"
	"net/http"
	"net/url"
	"recipe-book/domains/files"
	"strconv"
	"strings"
)

const (
	// RecipeIDPathVar is the path variable for a recipe ID
	RecipeIDPathVar = "recipeID"
	// RecipeIDQueryParameterName is the query parameter for a recipe ID
	RecipeIDQueryParameterName = "recipe"
)

// Handler represents the recipe handler
type Handler struct {
	controller Controller
}

// NewHandler creates a new Recipe handler
func NewHandler(controller Controller) Handler {
	return Handler{
		controller: controller,
	}
}

// Create allows users to create new recipes
func (h Handler) Create(ctx context.Context, r jhttp.RequestData[struct{}]) (*CreateRecipeResponse, *JHTTPErrors.JHTTPError) {
	user, ok := jcontext.GetUser(ctx)
	if !ok {
		return nil, JHTTPErrors.NewUnauthorizedError()
	}

	err := r.Request.ParseMultipartForm(files.MaxSizeMB << 20)
	if err != nil {
		return nil, JHTTPErrors.NewBadRequestError("File is too large")
	}

	request, imageCreateRequest, httpErr := formDataToRequest[CreateRecipeRequest](r.Request, "createRequest")
	if httpErr != nil {
		return nil, httpErr
	}

	if validationErr := ValidateRecipeCreateRequest(request); validationErr != "" {
		return nil, JHTTPErrors.NewValidationError(validationErr)
	}

	recipe, err := h.controller.CreateRecipe(ctx, user, request, imageCreateRequest)
	if err != nil {
		return nil, JHTTPErrors.NewInternalServerError(err)
	}

	return &CreateRecipeResponse{Slug: recipe.Slug}, nil
}

// Update handles an update request
func (h Handler) Update(ctx context.Context, r jhttp.RequestData[struct{}]) (*PublicRecipe, *JHTTPErrors.JHTTPError) {
	user, ok := jcontext.GetUser(ctx)
	if !ok {
		return nil, JHTTPErrors.NewUnauthorizedError()
	}

	recipeUUID := r.Query.Get("recipe")
	if recipeUUID == "" {
		return nil, JHTTPErrors.NewBadRequestError("Recipe UUID is required")
	}

	err := r.Request.ParseMultipartForm(files.MaxSizeMB << 20)
	if err != nil {
		return nil, JHTTPErrors.NewBadRequestError("File is too large")
	}

	request, imageCreateRequest, httpErr := formDataToRequest[UpdateRequest](r.Request, "updateRequest")
	if httpErr != nil {
		return nil, httpErr
	}

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

	updatedRecipe, err := h.controller.UpdateRecipe(ctx, existingRecipe, request, imageCreateRequest)
	if err != nil {
		return nil, JHTTPErrors.NewInternalServerError(err)
	}

	publicRecipe, err := h.controller.GetPublicRecipe(ctx, updatedRecipe.UUID)
	if err != nil {
		return nil, JHTTPErrors.NewInternalServerError(err)
	}

	return &publicRecipe, nil
}

// DeleteRecipe deletes a recipe
func (h Handler) DeleteRecipe(ctx context.Context, r jhttp.RequestData[struct{}]) (*struct{}, *JHTTPErrors.JHTTPError) {
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

func (h Handler) deleteRecipe(ctx context.Context, recipeUUID string) *JHTTPErrors.JHTTPError {
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
func (h Handler) FavoriteRecipe(ctx context.Context, r jhttp.RequestData[struct{}]) (*UserFavorite, *JHTTPErrors.JHTTPError) {
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
func (h Handler) UnFavoriteRecipe(ctx context.Context, r jhttp.RequestData[struct{}]) (*struct{}, *JHTTPErrors.JHTTPError) {
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
func (h Handler) GetUserFavorites(ctx context.Context, r jhttp.RequestData[struct{}]) (*[]UserFavorite, *JHTTPErrors.JHTTPError) {
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
func (h Handler) Get(ctx context.Context, r jhttp.RequestData[struct{}]) (*PublicRecipe, *JHTTPErrors.JHTTPError) {
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

	if recipe.Status == StatusDraft {
		user, ok := jcontext.GetUser(ctx)
		if !ok {
			return nil, JHTTPErrors.NewUnauthorizedError()
		} else if user.UUID != recipe.AuthorUUID {
			return nil, JHTTPErrors.NewForbiddenError()
		}
	}

	return &recipe, nil
}

// GetAllTags gets all existing tags
// TODO: make the tag fetch iterative on the front as user types
func (h Handler) GetAllTags(ctx context.Context, r jhttp.RequestData[struct{}]) (*[]Tag, *JHTTPErrors.JHTTPError) {
	tags, err := h.controller.GetAllTags(ctx)
	if err != nil {
		return nil, JHTTPErrors.NewInternalServerError(err)
	}

	return &tags, nil
}

// Search searches for a specified recipe. If no search parameters are passed, gets 10 random recipes
func (h Handler) Search(ctx context.Context, r jhttp.RequestData[struct{}]) (*PaginatedResponse[[]PublicRecipe], *JHTTPErrors.JHTTPError) {
	opts, httpErr := queryToSearchParams(r.Query)
	if httpErr != nil {
		return nil, httpErr
	}

	user, userLoggedIn := jcontext.GetUser(ctx)
	if opts.FavoritesOnly || opts.IncludeDrafts {
		if !userLoggedIn {
			return nil, JHTTPErrors.NewUnauthorizedError()
		}
	}

	recipes, total, err := h.controller.Search(ctx, opts)
	if err == types.ErrNotFound {
		return nil, JHTTPErrors.NewNotFoundError(opts)
	}
	if err != nil {
		return nil, JHTTPErrors.NewInternalServerError(err)
	}

	// On one hand, it kinda sucks to blow up the whole request because of (what is most likely) a coding error.
	// On the other hand, if we just filter out the not-allowed recipes and return what we can, the other info
	// (like total number of results) is incorrect. We could just subtract the removed recipes from the total,
	// but there will still be an unknown number of private recipes included in that total. That'll confuse
	// the frontend into thinking the user can jump to somthing like, say, page 25 when we don't actually have
	// that many recipes to show.
	// I'm sure there's something smarter we can do, but this is a personal project on a free website so whatever
	if utils.Any(recipes, func(rec PublicRecipe) bool {
		return rec.Status == StatusDraft && rec.AuthorUUID != user.UUID
	}) {
		return nil, JHTTPErrors.NewUnauthorizedError()
	}

	return &PaginatedResponse[[]PublicRecipe]{
		Data:  recipes,
		Total: total,
		Page:  opts.Page,
		Limit: opts.Limit,
	}, nil
}

func queryToSearchParams(query *url.Values) (SearchOpts, *JHTTPErrors.JHTTPError) {
	opts := SearchOpts{}
	if query == nil {
		return opts, nil
	}

	recipeName := query.Get("name")
	favoritesOnly := query.Get("favorites_only")
	includeDrafts := query.Get("drafts")
	selectedTagUUIDsString := query.Get("selectedTags")
	inverseTagUUIDsString := query.Get("inverseTags")
	selectedTagUUIDs := strings.Split(selectedTagUUIDsString, ",")
	selectedTagUUIDs = utils.Filter(selectedTagUUIDs, func(uuid string) bool { return uuid != "" })
	inverseTagUUIDs := strings.Split(inverseTagUUIDsString, ",")
	inverseTagUUIDs = utils.Filter(inverseTagUUIDs, func(uuid string) bool { return uuid != "" })
	authorUUID := query.Get("author")
	limitStr := query.Get("limit")
	pageStr := query.Get("page")

	var limit int64
	var page int64
	var err error
	if limitStr != "" {
		limit, err = strconv.ParseInt(limitStr, 10, 64)
		if err != nil {
			return SearchOpts{}, JHTTPErrors.NewBadRequestError("limit must be an integer")
		}
		if limit <= 0 {
			return SearchOpts{}, JHTTPErrors.NewBadRequestError("limit must be >= 0")
		}
	}
	if pageStr != "" {
		page, err = strconv.ParseInt(pageStr, 10, 64)
		if err != nil {
			return SearchOpts{}, JHTTPErrors.NewBadRequestError("page must be an integer")
		}
	}
	if limit <= 0 {
		limit = 10
	}

	if recipeName != "" {
		opts.Name = &recipeName
	}
	if len(selectedTagUUIDs) > 0 {
		opts.SelectedTagUUIDs = &selectedTagUUIDs
	}
	if len(inverseTagUUIDs) > 0 {
		opts.InverseTagUUIDs = &inverseTagUUIDs
	}
	if authorUUID != "" {
		opts.AuthorUUID = &authorUUID
	}
	opts.FavoritesOnly = strings.ToLower(favoritesOnly) == "true"
	opts.IncludeDrafts = strings.ToLower(includeDrafts) == "true"
	opts.Limit = min(limit, 200)
	opts.Page = max(1, page)

	return opts, nil
}

func formDataToRequest[T any](r *http.Request, requestKey string) (T, *files.CreateRequest, *JHTTPErrors.JHTTPError) {
	var request T
	err := r.ParseMultipartForm(files.MaxSizeMB << 20)
	if err != nil {
		return request, nil, JHTTPErrors.NewBadRequestError("File is too large")
	}

	requestStr := r.FormValue(requestKey)
	err = json.Unmarshal([]byte(requestStr), &request)
	if err != nil {
		return request, nil, JHTTPErrors.NewBadRequestError("Invalid request")
	}

	imageFile, handler, err := r.FormFile("image")
	if err == http.ErrMissingFile {
		return request, nil, nil
	}
	if err != nil {
		return request, nil, JHTTPErrors.NewBadRequestError("Error reading image")
	}
	defer imageFile.Close()

	imageCreateRequest := files.CreateRequest{
		Name: handler.Filename,
		// MIME is hidden in a map that looks like:
		// map[Content-Disposition:[form-data; name="image"; filename="Screenshot 2026-04-09 at 5.40.27 PM.png"] Content-Type:[image/png]]
		// Get will pull that value out of the array for us
		MIME:       handler.Header.Get("Content-Type"),
		Size:       handler.Size,
		Visibility: files.PublicVisibility,
		Data:       imageFile,
	}

	return request, &imageCreateRequest, nil
}
