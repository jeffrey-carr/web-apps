package recipe

import (
	"go-common/types"
	"go-common/utils"
	"net/url"
	"recipe-book/domains/files"
	"recipe-book/domains/recipe"
	"strconv"
	"strings"
	"time"
)

// CreateRequestToRecipe converts a CreateRequest into a Recipe
func CreateRequestToRecipe(
	request recipe.CreateRecipeRequest,
	tags []recipe.Tag,
	image *files.File,
	user types.CommonUser,
) (recipe.Recipe, error) {
	rec := recipe.Recipe{
		UUID: utils.NewUUID(),
		Name: strings.TrimSpace(request.Name),
		// TODO: clean for XSS
		Description: strings.TrimSpace(request.Description),
		CookTimeMs:  request.CookTimeMs,
		TagUUIDs:    utils.Map(tags, func(t recipe.Tag) string { return t.UUID }),
		AuthorUUID:  user.UUID,
		Slug:        request.Slug,
		Status:      recipe.StatusPublic,
		CreatedAt:   time.Now().UnixMilli(),
	}

	importedURL := strings.TrimSpace(request.OriginalURL)
	if importedURL != "" {
		// The URL is validated in the validator, so this error shouldn't happen
		url, err := url.Parse(importedURL)
		if err != nil {
			return recipe.Recipe{}, err
		}

		url.RawQuery = ""
		url.RawFragment = ""
		rec.OriginalURL = url.String()
	}

	cleanedSections := make([]recipe.Section, 0, len(request.Sections))
	for _, section := range request.Sections {
		for j, ingredient := range section.Ingredients {
			amt, ok := AttemptToParseAmountStr(ingredient.AmountStr)
			if ok {
				ingredient.Amount = amt
				section.Ingredients[j] = ingredient
			}
		}

		cleanedSections = append(cleanedSections, section)
	}
	rec.Sections = cleanedSections

	if !request.Publish {
		rec.Status = recipe.StatusDraft
	}

	if image != nil {
		rec.ImageUUID = image.UUID
		rec.ImageURL = image.URL
	}

	return rec, nil
}

// ApplyUpdateRequest applies an update request to an existing recipe
func ApplyUpdateRequest(
	updateRequest recipe.UpdateRequest,
	existingRecipe recipe.Recipe,
	newSlug *string,
	tagUUIDs *[]string,
	newImage *files.File,
) recipe.Recipe {
	if updateRequest.Name != nil {
		existingRecipe.Name = *updateRequest.Name
	}

	if newSlug != nil {
		existingRecipe.Slug = *newSlug
	}

	if updateRequest.Description != nil {
		existingRecipe.Description = *updateRequest.Description
	}

	if tagUUIDs != nil {
		existingRecipe.TagUUIDs = *tagUUIDs
	}

	if updateRequest.CookTimeMs != nil {
		existingRecipe.CookTimeMs = *updateRequest.CookTimeMs
	}

	if updateRequest.OriginalURL != nil {
		existingRecipe.OriginalURL = *updateRequest.OriginalURL
	}

	if updateRequest.Status != nil {
		existingRecipe.Status = *updateRequest.Status
	}

	if updateRequest.Sections != nil {
		existingRecipe.Sections = *updateRequest.Sections
	}

	if newImage != nil {
		existingRecipe.ImageUUID = newImage.UUID
		existingRecipe.ImageURL = newImage.URL
	}

	return existingRecipe
}

// AttemptToParseAmountStr does its best at determining the actual
// numerical amount specified in the recipe.
func AttemptToParseAmountStr(amountStr string) (float32, bool) {
	parts := strings.Split(amountStr, " ")
	var total float32
	for _, part := range parts {
		fractional := strings.Split(part, "/")
		if len(fractional) > 1 {
			numerator, err := strconv.ParseInt(fractional[0], 10, 32)
			if err != nil {
				return 0, false
			}
			denominator, err := strconv.ParseInt(fractional[1], 10, 32)
			if err != nil {
				return 0, false
			}
			total += float32(numerator) / float32(denominator)
		} else {
			amt, err := strconv.ParseFloat(fractional[0], 32)
			if err != nil {
				return 0, false
			}
			total += float32(amt)
		}
	}

	return total, true
}

// FavoriteRequestToFavorite converts a FavoriteRequest into a Favorite
func FavoriteRequestToFavorite(
	user types.CommonUser,
	rec recipe.Recipe,
) recipe.UserFavorite {
	return recipe.UserFavorite{
		UUID:        utils.NewUUID(),
		RecipeUUID:  rec.UUID,
		UserUUID:    user.UUID,
		FavoritedAt: time.Now().UnixMilli(),
	}
}

// ToPublicRecipe applies the missing info and strips out
// sensitive info from a Recipe to make it a full PublicRecipe
func ToPublicRecipe(
	rec recipe.Recipe,
	tags []recipe.Tag,
	author *types.CommonUser,
	isFavorited bool,
) recipe.PublicRecipe {
	authorUUID := rec.AuthorUUID
	var authorLName string
	authorFName := "Unknown"
	if author != nil {
		authorUUID = author.UUID
		authorFName = author.FName
		authorLName = author.LName
	}

	return recipe.PublicRecipe{
		UUID:        rec.UUID,
		Name:        rec.Name,
		Description: rec.Description,
		CookTimeMs:  rec.CookTimeMs,
		OriginalURL: rec.OriginalURL,
		Tags:        tags,
		Sections:    rec.Sections,
		Slug:        rec.Slug,
		AuthorUUID:  authorUUID,
		AuthorFName: authorFName,
		AuthorLName: authorLName,
		ImageURL:    rec.ImageURL,
		Status:      rec.Status,
		IsFavorited: isFavorited,
		CreatedAt:   rec.CreatedAt,
		ModifiedAt:  rec.ModifiedAt,
	}
}
