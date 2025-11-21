package recipe

import (
	"go-common/types"
	"go-common/utils"
	"net/url"
	"strings"
	"time"
)

func recipeCreateRequestToRecipe(request CreateRecipeRequest, user types.CommonUser) (Recipe, error) {
	// TODO - generate slug
	// TODO - update created at
	// TODO - update status
	// TODO - update author uuid
	name := strings.TrimSpace(request.Name)
	// TODO - clean for XSS
	description := strings.TrimSpace(request.Description)

	// TODO - slug

	importedURL := strings.TrimSpace(request.ImportedURL)
	if importedURL != "" {
		// The URL is validated in the validator, so this error shouldn't happen
		url, err := url.Parse(importedURL)
		if err != nil {
			return Recipe{}, err
		}

		url.RawQuery = ""
		url.RawFragment = ""
		importedURL = url.String()
	}

	status := StatusPublic
	if !request.Publish {
		status = StatusPrivate
	}

	return Recipe{
		UUID:        utils.NewUUID(),
		Name:        name,
		Description: description,
		CookTimeMs:  request.CookTimeMs,
		Slug:        request.Slug,
		ImportedURL: importedURL,
		AuthorUUID:  user.UUID,
		Status:      status,
		Sections:    request.Sections,
		CreatedAt:   time.Now().Unix(),
	}, nil
}
