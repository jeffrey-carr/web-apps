package recipe

import (
	"go-common/types"
	"go-common/utils"
	"net/url"
	"recipe-book/domains/recipe"
	"strconv"
	"strings"
	"time"
)

// CreateRequestToRecipe converts a CreateRequest into a Recipe
func CreateRequestToRecipe(request recipe.CreateRecipeRequest, tags []recipe.Tag, user types.CommonUser) (recipe.Recipe, error) {
	name := strings.TrimSpace(request.Name)
	// TODO: clean for XSS
	description := strings.TrimSpace(request.Description)

	tagUUIDs := utils.Map(tags, func(tag recipe.Tag) string { return tag.UUID })

	importedURL := strings.TrimSpace(request.OriginalURL)
	if importedURL != "" {
		// The URL is validated in the validator, so this error shouldn't happen
		url, err := url.Parse(importedURL)
		if err != nil {
			return recipe.Recipe{}, err
		}

		url.RawQuery = ""
		url.RawFragment = ""
		importedURL = url.String()
	}

	for i, section := range request.Sections {
		for j, ingredient := range section.Ingredients {
			amt, ok := AttemptToParseAmountStr(ingredient.AmountStr)
			if ok {
				ingredient.Amount = amt
				section.Ingredients[j] = ingredient
			}
		}
		request.Sections[i] = section
	}

	status := recipe.StatusPublic
	if !request.Publish {
		status = recipe.StatusPrivate
	}

	return recipe.Recipe{
		UUID:        utils.NewUUID(),
		Name:        name,
		Description: description,
		CookTimeMs:  request.CookTimeMs,
		OriginalURL: request.OriginalURL,
		TagUUIDs:    tagUUIDs,
		AuthorUUID:  user.UUID,
		Slug:        request.Slug,
		Status:      status,
		Sections:    request.Sections,
		CreatedAt:   time.Now().UnixMilli(),
	}, nil
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

	return total, false
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
	var authorUUID, authorLName string
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
		ImageURL:    "",
		Status:      rec.Status,
		IsFavorited: isFavorited,
		CreatedAt:   rec.CreatedAt,
		ModifiedAt:  rec.ModifiedAt,
	}
}
