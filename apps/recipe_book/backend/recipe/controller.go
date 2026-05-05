package recipe

import (
	"context"
	"errors"
	"federation/sdk"
	"fmt"
	"go-common/jcontext"
	"go-common/types"
	"go-common/utils"
	"recipe-book/domains/files"
	"recipe-book/domains/recipe"
	"recipe-book/mappers"
	"strconv"
	"strings"
)

var (
	// ErrAlreadyFavorited is returned when you try to favorite a recipe that
	// has already been favorited
	ErrAlreadyFavorited = errors.New("recipe is already favorited")
	// ErrNotFavorited is returned when you try to unfavorite a recipe you
	// don't have favorited
	ErrNotFavorited = errors.New("recipe is not favorited")
	// ErrCategoryNotFound is returned when an invalid category is passed
	// in a create request
	ErrCategoryNotFound = errors.New("could not find category")
)

// Controller controls the business logic for recipes
type Controller struct {
	repo            Repository
	federationSDK   sdk.SDK
	filesController files.Controller
}

// NewController creates a new recipe controller
func NewController(federationSDK sdk.SDK, repo Repository, filesController files.Controller) Controller {
	return Controller{
		repo:            repo,
		federationSDK:   federationSDK,
		filesController: filesController,
	}
}

// CreateRecipe creates a new recipe
func (c Controller) CreateRecipe(ctx context.Context, user types.CommonUser, createRequest recipe.CreateRecipeRequest, imageCreateRequest *files.CreateRequest) (recipe.Recipe, error) {
	var image *files.File
	if imageCreateRequest != nil {
		imageResult, err := c.filesController.UploadImage(ctx, *imageCreateRequest, user)
		if err != nil {
			return recipe.Recipe{}, err
		}

		image = &imageResult
	}

	tags, err := c.tagNamesToTags(ctx, createRequest.TagNames)
	if err != nil {
		return recipe.Recipe{}, err
	}

	slug, err := c.getAvailableSlug(ctx, createRequest.Name)
	if err != nil {
		return recipe.Recipe{}, err
	}
	createRequest.Slug = slug

	rec, err := CreateRequestToRecipe(createRequest, tags, image, user)
	if err != nil {
		return recipe.Recipe{}, err
	}

	err = c.repo.Put(ctx, rec)
	if err != nil {
		return recipe.Recipe{}, err
	}

	return rec, nil
}

// UpdateRecipe applies an update request to a recipe
func (c Controller) UpdateRecipe(
	ctx context.Context,
	existingRecipe recipe.Recipe,
	updateRequest recipe.UpdateRequest,
	imageCreateRequest *files.CreateRequest,
) (recipe.Recipe, error) {
	var newSlug *string
	if updateRequest.Name != nil {
		slug, err := c.getAvailableSlug(ctx, *updateRequest.Name)
		if err != nil {
			return existingRecipe, err
		}
		newSlug = &slug
	}
	var updatedTagUUIDs *[]string
	if updateRequest.TagNames != nil {
		tags, err := c.tagNamesToTags(ctx, *updateRequest.TagNames)
		if err != nil {
			return existingRecipe, err
		}
		tagUUIDs := utils.Map(tags, func(tag recipe.Tag) string { return tag.UUID })
		updatedTagUUIDs = &tagUUIDs
	}

	var newImage *files.File
	if imageCreateRequest != nil {
		user, ok := jcontext.GetUser(ctx)
		if !ok {
			return existingRecipe, errors.New("could not get user")
		}
		var createdImage files.File
		var err error
		if existingRecipe.ImageUUID != "" {
			existingImageFile, err := c.filesController.GetByUUID(ctx, existingRecipe.ImageUUID)
			if err != nil {
				return existingRecipe, err
			}

			createdImage, err = c.swapImage(ctx, *imageCreateRequest, existingImageFile, user)
		} else {
			createdImage, err = c.filesController.UploadImage(ctx, *imageCreateRequest, user)
		}
		if err != nil {
			return existingRecipe, err
		}

		newImage = &createdImage
	}

	existingRecipe = ApplyUpdateRequest(updateRequest, existingRecipe, newSlug, updatedTagUUIDs, newImage)
	err := c.repo.Update(ctx, existingRecipe)
	if err != nil {
		return recipe.Recipe{}, err
	}

	return existingRecipe, nil
}

// DeleteRecipe deletes a recipe
func (c Controller) DeleteRecipe(ctx context.Context, recipeUUID string) error {
	return c.repo.DeleteRecipe(ctx, recipeUUID)
}

// GetAllUserFavorites gets all a user's favorited recipes
// TODO: pagination
func (c Controller) GetAllUserFavorites(ctx context.Context, userUUID string) ([]recipe.UserFavorite, error) {
	return c.repo.GetAllUserFavorites(ctx, userUUID)
}

// FavoriteRecipe saves a user's favorite recipe
func (c Controller) FavoriteRecipe(ctx context.Context, user types.CommonUser, recipeID string) (recipe.UserFavorite, error) {
	exists, err := c.repo.GetAllUserFavorites(ctx, user.UUID)
	if err != nil {
		return recipe.UserFavorite{}, err
	}
	if utils.Any(exists, func(favorite recipe.UserFavorite) bool { return favorite.RecipeUUID == recipeID }) {
		return recipe.UserFavorite{}, ErrAlreadyFavorited
	}

	rec, err := c.GetRecipe(ctx, recipeID)
	if err != nil {
		return recipe.UserFavorite{}, err
	}

	favObject := FavoriteRequestToFavorite(user, rec)
	return c.repo.SaveUserFavorite(ctx, favObject)
}

// UnFavoriteRecipe unfavorites a recipe
func (c Controller) UnFavoriteRecipe(ctx context.Context, user types.CommonUser, recipeUUID string) error {
	favorites, err := c.repo.GetAllUserFavorites(ctx, user.UUID)
	if err != nil {
		return err
	}

	favorite, found := utils.Find(favorites, func(favorite recipe.UserFavorite) bool { return favorite.RecipeUUID == recipeUUID })
	if !found {
		return ErrNotFavorited
	}

	return c.repo.UnFavoriteRecipe(ctx, favorite.UUID)
}

// GetRecipe gets a recipe by it's ID. It supports both UUID and slug identifiers
func (c Controller) GetRecipe(ctx context.Context, recipeID string) (recipe.Recipe, error) {
	var rec recipe.Recipe
	var err error
	if utils.IsUUID(recipeID) {
		rec, err = c.repo.GetRecipeByUUID(ctx, recipeID)
	} else {
		rec, err = c.repo.GetRecipeBySlug(ctx, recipeID)
	}

	return rec, err
}

// GetPublicRecipe gets the full public recipe by it's ID. It supports both UUID and slug identifiers
func (c Controller) GetPublicRecipe(ctx context.Context, recipeID string) (recipe.PublicRecipe, error) {
	rec, err := c.GetRecipe(ctx, recipeID)
	if err != nil {
		return recipe.PublicRecipe{}, err
	}

	publicRecs, err := c.fillInRecipesToPublicRecipes(ctx, []recipe.Recipe{rec})
	if err != nil {
		return recipe.PublicRecipe{}, err
	}
	if len(publicRecs) < 1 {
		return recipe.PublicRecipe{}, types.ErrNotFound
	}

	return publicRecs[0], nil
}

// GetAllTags gets all tags
func (c Controller) GetAllTags(ctx context.Context) ([]recipe.Tag, error) {
	return c.repo.GetAllTags(ctx)
}

// Search allows searching for recipes
func (c Controller) Search(ctx context.Context, opts recipe.SearchOpts) ([]recipe.PublicRecipe, int64, error) {
	var userFavoriteUUIDs []string
	if opts.FavoritesOnly {
		user, ok := jcontext.GetUser(ctx)
		if !ok {
			return nil, 0, errors.New("not logged in")
		}
		userFavorites, err := c.repo.GetAllUserFavorites(ctx, user.UUID)
		if err != nil && err != types.ErrNotFound {
			return nil, 0, err
		}
		if len(userFavorites) == 0 {
			return []recipe.PublicRecipe{}, 0, nil
		}
		userFavoriteUUIDs = utils.Map(userFavorites, func(favorite recipe.UserFavorite) string {
			return favorite.RecipeUUID
		})
	}

	recipes, total, err := c.repo.Search(ctx, opts, userFavoriteUUIDs)
	if err == types.ErrNotFound {
		return nil, 0, nil
	}
	if err != nil {
		return nil, 0, err
	}

	publicRecipes, err := c.fillInRecipesToPublicRecipes(ctx, recipes)
	return publicRecipes, total, err
}

// fillInRecipestoPublicRecipes fills in the missing info (author details, etc) onto a recipe
// and strips out any sensitive information
func (c Controller) fillInRecipesToPublicRecipes(ctx context.Context, recipes []recipe.Recipe) ([]recipe.PublicRecipe, error) {
	var favoriteUUIDs utils.Set[string]
	if user, ok := jcontext.GetUser(ctx); ok {
		favorites, err := c.repo.GetAllUserFavorites(ctx, user.UUID)
		if err != nil && err != types.ErrNotFound {
			return nil, err
		}
		favoriteUUIDsSlice := utils.Map(favorites, func(fav recipe.UserFavorite) string { return fav.RecipeUUID })
		favoriteUUIDs = utils.NewSet(favoriteUUIDsSlice...)
	}

	uniqueAuthorUUIDs := utils.NewSet[string]()
	uniqueTagUUIDs := utils.NewSet[string]()
	for _, rec := range recipes {
		uniqueAuthorUUIDs.Add(rec.AuthorUUID)
		uniqueTagUUIDs.Add(rec.TagUUIDs...)
	}

	authors, err := c.federationSDK.GetUsersByUUIDs(ctx, uniqueAuthorUUIDs.ToSlice())
	if err != nil {
		return nil, err
	}
	authorsByUUID := map[string]*types.CommonUser{}
	authorsSlice := *authors
	for i := range authorsSlice {
		authorsByUUID[authorsSlice[i].UUID] = &authorsSlice[i]
	}

	tags, err := c.repo.GetTagsByUUID(ctx, uniqueTagUUIDs.ToSlice())
	if err != nil {
		return nil, err
	}
	tagsByUUID := map[string]recipe.Tag{}
	for _, tag := range tags {
		tagsByUUID[tag.UUID] = tag
	}

	publicRecipes := make([]recipe.PublicRecipe, len(recipes))
	for i, rec := range recipes {
		hasUnknown := false
		recipeTags := make([]recipe.Tag, len(rec.TagUUIDs))
		for i, tagUUID := range rec.TagUUIDs {
			t, ok := tagsByUUID[tagUUID]
			if ok {
				recipeTags[i] = t
			} else if !hasUnknown {
				recipeTags[i] = recipe.UnknownTag
				hasUnknown = true
			}
		}

		publicRecipes[i] = ToPublicRecipe(
			rec,
			recipeTags,
			authorsByUUID[rec.AuthorUUID],
			favoriteUUIDs.Has(rec.UUID),
		)
	}

	return publicRecipes, nil
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

	// Find the next available number
	if len(sluggedRecipes) == 0 {
		return slugified, nil
	}

	utils.Filter(sluggedRecipes, func(r recipe.Recipe) bool { return len(r.Slug) > 0 })

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

	return slugified, nil
}

func (c Controller) tagNamesToTags(ctx context.Context, tagNames []string) ([]recipe.Tag, error) {
	uniqueTags := utils.NewSet(
		utils.FilterAndMap(
			tagNames,
			func(tagName string) (string, bool) {
				trimmed := strings.TrimSpace(tagName)
				return trimmed, trimmed != ""
			},
		)...,
	)
	tags := make([]recipe.Tag, 0, uniqueTags.Size())
	for name := range uniqueTags.Iter {
		tag, err := c.repo.UpsertTag(ctx, name)
		if err != nil {
			return nil, err
		}
		tags = append(tags, tag)
	}

	return tags, nil
}

func (c Controller) swapImage(ctx context.Context, imageCreateRequest files.CreateRequest, existingImage files.File, user types.CommonUser) (files.File, error) {
	newImage, err := c.filesController.UploadImage(ctx, imageCreateRequest, user)
	if err != nil {
		return files.File{}, err
	}

	err = c.filesController.DeleteFile(ctx, existingImage)
	if err != nil {
		// TODO: make some noise that the image got uploaded but there was an error deleting the old one
	}

	return newImage, nil
}
