package auth

import (
	"go-common/types"
	"time"
)

// CreateUserRequest is used to create a new user
type CreateUserRequest struct {
	Email     string              `json:"email"`
	Password  string              `json:"password"`
	FName     string              `json:"fName"`
	LName     string              `json:"lName"`
	Character types.UserCharacter `json:"character"`
}

// LoginRequest is used to log in
type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

// LogoutRequest is used to logout
type LogoutRequest struct {
	LogoutEverywhere bool `json:"logoutEverywhere"`
}

// BulkGetUsersRequest is used to get users in bulk
type BulkGetUsersRequest struct {
	UUIDs []string `json:"uuids"`
}

// CookieOpts are the options you can pass a cookie
type CookieOpts struct {
	// MaxAge is the maximum age from now a cookie can be.
	// It should not be used with ExpiresAt
	MaxAge *time.Duration
	// ExpiresAt is an explicit time the cookie expires at. It
	// takes priority over MaxAge
	ExpiresAt *time.Time
}
