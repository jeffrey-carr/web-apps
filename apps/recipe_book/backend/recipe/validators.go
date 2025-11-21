package recipe

import (
	"fmt"
	"net/url"
	"slices"
	"strings"
)

// ValidateRecipeCreateRequest validates a recipe create request
func ValidateRecipeCreateRequest(request CreateRecipeRequest) string {
	if len(strings.Trim(request.Name, " ")) == 0 {
		return "Recipe name is required."
	}

	if request.CookTimeMs < 0 {
		return "Cook time cannot be negative."
	}

	if request.ImportedURL != "" {
		_, err := url.Parse(request.ImportedURL)
		if err != nil {
			return "Invalid import URL"
		}
	}

	if len(request.Sections) == 0 {
		return "At least one section is required."
	}

	for _, section := range request.Sections {
		if validationErr := ValidateRecipeSection(section); validationErr != "" {
			return validationErr
		}
	}

	return ""
}

// ValidateRecipeSection validates a single section in a recipe
func ValidateRecipeSection(section Section) string {
	for _, ingredient := range section.Ingredients {
		if ingredientErr := ValidateRecipeIngredient(ingredient); ingredientErr != "" {
			return ingredientErr
		}
	}
	for _, direction := range section.Directions {
		if directionErr := ValidateRecipeDirection(direction); directionErr != "" {
			return directionErr
		}
	}
	return ""
}

// ValidateRecipeIngredient validates a single ingredient in a recipe
func ValidateRecipeIngredient(ingredient Ingredient) string {
	if len(strings.TrimSpace(ingredient.Name)) == 0 {
		return "Direction must have instructions."
	}

	if ingredient.Unit != "" && !slices.Contains(IngredientUnits, strings.ToLower(ingredient.Unit)) {
		return fmt.Sprintf("Invalid ingredient unit: %s", ingredient.Unit)
	}

	return ""
}

// ValidateRecipeDirection validates a single direction in a recipe
func ValidateRecipeDirection(direction Direction) string {
	if len(strings.TrimSpace(direction.Step)) == 0 {
		return "Direction must have instructions."
	}

	return ""
}
