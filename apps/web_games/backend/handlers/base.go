package handlers

import (
	"net/http"
)

// HandlerFunction represents a handler function
type HandlerFunction func(*http.Request) (any, HTTPError)

// NewHandler creates a new handler
func NewHandler(name string) func(w http.ResponseWriter, r *http.Request) {
	return nil
}
