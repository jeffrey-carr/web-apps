package recipe

import (
	"context"
	"fmt"
	"go-common/jcontext"
	"go-common/jhttp"
	JHTTPErrors "go-common/jhttp/errors"
	"go-common/types"
	"go-common/utils"
	"recipe-book/mappers"
	"strconv"
)

// Handler represents the recipe handler
type Handler struct {
	Repo Repository
}

// Create allows users to create new recipes
func (h Handler) Create(ctx context.Context, r jhttp.RequestData[CreateRecipeRequest]) (*string, *JHTTPErrors.JHTTPError) {
	user, ok := ctx.Value(jcontext.UserKey).(types.CommonUser)
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

	slug, err := h.getAvailableSlug(ctx, request.Name)
	if err != nil {
		return nil, JHTTPErrors.NewInternalServerError(err)
	}
	request.Slug = slug

	recipe, err := recipeCreateRequestToRecipe(request, user)
	if err != nil {
		return nil, JHTTPErrors.NewInternalServerError(err)
	}

	err = h.Repo.Create(ctx, recipe)
	if err != nil {
		return nil, JHTTPErrors.NewInternalServerError(err)
	}

	return &recipe.Slug, nil
}

// GetRecipes isn't completed yet
func (h Handler) GetRecipes(ctx context.Context, r jhttp.RequestData[struct{}]) (*[]Recipe, *JHTTPErrors.JHTTPError) {
	// TODO - pageination
	recipes, err := h.Repo.GetRecipes(ctx, 1, 10)
	if err != nil {
		return nil, JHTTPErrors.NewInternalServerError(err)
	}

	return &recipes, nil
}

func (h Handler) getAvailableSlug(ctx context.Context, recipeName string) (string, error) {
	slugified, err := mappers.SlugifyString(recipeName)
	if err != nil {
		return "", err
	}

	sluggedRecipes, err := h.Repo.GetMatchingSlugPrefix(ctx, slugified)
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
