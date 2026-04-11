package sdk

import "errors"

// errors

// ErrNoAPIKey is returned when the API key is not defined
var ErrNoAPIKey = errors.New("api key was not found")

// ErrNotFound is returned when it is a not found error
var ErrNotFound = errors.New("not found")
