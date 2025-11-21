package mappers

import (
	"regexp"
	"strings"
)

// SlugifyString takes a string and replaces it with a slug friendly version
func SlugifyString(str string) (string, error) {
	removeRegex, err := regexp.Compile(`['"!?,\.]`)
	if err != nil {
		return "", err
	}
	replaceRegex, err := regexp.Compile("[^a-z0-9_-]+")
	if err != nil {
		return str, err
	}

	lower := strings.ToLower(str)
	cleaned := removeRegex.ReplaceAllString(lower, "")
	cleaned = replaceRegex.ReplaceAllString(cleaned, "-")

	return cleaned, nil
}
