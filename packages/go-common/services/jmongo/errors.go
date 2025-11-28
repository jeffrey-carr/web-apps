package jmongo

import "errors"

var (
	// ErrNotConnected is thrown when the collection is unavailable
	ErrNotConnected = errors.New("database connection error")
)
