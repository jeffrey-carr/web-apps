package files

import (
	"slices"
	"strings"
)

// IsImageFile returns if something is an image file
func IsImageFile(mime string) bool {
	return slices.Contains(AllowedImageTypes, strings.ToLower(mime))
}
