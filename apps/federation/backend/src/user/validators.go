package user

import (
	"go-common/types"
	"slices"
)

// ValidateName validates a name
func ValidateName(name string) string {
	if len(name) == 0 {
		return "Name is required"
	}

	return ""
}

// ValidateCharacter validates a character
func ValidateCharacter(character types.UserCharacter) string {
	if !slices.Contains(types.AvailableCharacters, character) {
		return "Invalid character"
	}

	return ""
}

// ValidateUpdateRequest validates an update request
func ValidateUpdateRequest(request UpdateUserRequest) string {
	if request.FirstName != nil {
		if err := ValidateName(*request.FirstName); err != "" {
			return err
		}
	}
	if request.LastName != nil {
		if err := ValidateName(*request.LastName); err != "" {
			return err
		}
	}
	if request.Character != nil {
		if err := ValidateCharacter(*request.Character); err != "" {
			return err
		}
	}

	return ""
}
