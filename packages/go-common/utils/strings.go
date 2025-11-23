package utils

import (
	"regexp"

	"github.com/google/uuid"
)

// NewUUID creates a new UUID string
func NewUUID() string {
	return uuid.NewString()
}

// IsUUID returns if the presented string is a UUID or not
func IsUUID(suspect string) bool {
	if len(suspect) == 0 {
		return false
	}

	re := regexp.MustCompile("^[a-zA-Z0-9]{8}-(?:[a-zA-Z0-9]{4}-){3}[a-zA-Z0-9]{12}$")
	found := re.FindString(suspect)
	return len(found) > 0
}
