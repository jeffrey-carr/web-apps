package auth

import (
	"go-common/types"
	"slices"
	"strings"
)

// FIXME - these all need improvement

func ValidateEmail(email string) string {
	if len(email) == 0 {
		return "Email is required"
	}

	return ""
}

func ValidatePassword(password string) string {
	if len(password) < 12 {
		return "Password must be at least 12 characters"
	}

	return ""
}

func ValidateName(name string) string {
	if len(name) == 0 {
		return "Name is required"
	}

	return ""
}

func ValidateCharacter(character types.UserCharacter) string {
	if !slices.Contains(types.AvailableCharacters, character) {
		return "Invalid character"
	}

	return ""
}

func ValidateLoginRequest(request LoginRequest) string {
	email := strings.TrimSpace(request.Email)
	if errMsg := ValidateEmail(email); len(errMsg) > 0 {
		return errMsg
	}

	password := strings.TrimSpace(request.Password)
	if errMsg := ValidatePassword(password); len(errMsg) > 0 {
		return errMsg
	}

	return ""
}

func ValidateCreateUserRequest(request CreateUserRequest) string {
	email := strings.TrimSpace(request.Email)
	if errMsg := ValidateEmail(email); len(errMsg) > 0 {
		return errMsg
	}

	password := strings.TrimSpace(request.Password)
	if errMsg := ValidatePassword(password); len(errMsg) > 0 {
		return errMsg
	}

	if errMsg := ValidateEmail(email); len(errMsg) > 0 {
		return errMsg
	}

	fName := strings.TrimSpace(request.FName)
	if errMsg := ValidateName(fName); len(errMsg) > 0 {
		return errMsg
	}

	lName := strings.TrimSpace(request.LName)
	if errMsg := ValidateName(lName); len(errMsg) > 0 {
		return errMsg
	}

	if errMsg := ValidateCharacter(request.Character); len(errMsg) > 0 {
		return errMsg
	}

	return ""
}
