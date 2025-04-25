package handlers

import "net/http"

// HTTPError represents an HTTP error
type HTTPError struct {
	Status  int    `json:"status"`
	Message string `json:"message"`
	Err     error  `json:"-"`
}

// NewBadRequestError creates a new BadRequest HTTP error
func NewBadRequestError(message string) HTTPError {
	return HTTPError{
		Status:  http.StatusBadRequest,
		Message: message,
		Err:     nil,
	}
}
