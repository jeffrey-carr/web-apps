package errors

import (
	"fmt"
	"net/http"
)

// JHTTPError is a custom error that is returned by all Jeffrey Carr
// certified endpoints
type JHTTPError struct {
	error
	StatusCode int    `json:"status"`
	Message    string `json:"message"`
	Data       any    `json:"data,omitempty"`
}

func (e JHTTPError) Error() string {
	return fmt.Sprintf("[%d]: %s", e.StatusCode, e.Message)
}

// NewEmptyOKError is a weird one, it returns a 204 (no-content) as an error.
// Right now just using it in the middleware to allow stopping a request early from a middleware
func NewEmptyOKError() *JHTTPError {
	return &JHTTPError{
		StatusCode: http.StatusNoContent,
		Message:    "OK",
	}
}

// NewBadRequestError creates a new HTTP bad request error
func NewBadRequestError(msg string) *JHTTPError {
	return &JHTTPError{
		StatusCode: http.StatusBadRequest,
		Message:    msg,
	}
}

// NewNotFoundError creates a new HTTP Not Found error
func NewNotFoundError[T any](requested T) *JHTTPError {
	type NotFoundData struct {
		Requested T
	}

	return &JHTTPError{
		StatusCode: http.StatusNotFound,
		Message:    "Not found",
		Data:       NotFoundData{Requested: requested},
	}
}

// NewInternalServerError creates a new HTTP Internal Server Error
func NewInternalServerError(err error) *JHTTPError {
	var errMsg string
	if err != nil {
		errMsg = err.Error()
	}

	return &JHTTPError{
		StatusCode: http.StatusInternalServerError,
		Message:    "Internal server error",
		Data:       errMsg,
	}
}

// NewUnauthorizedError creates a new HTTP Unauthorized error
func NewUnauthorizedError() *JHTTPError {
	return &JHTTPError{
		StatusCode: http.StatusUnauthorized,
		Message:    "Not authorized to access this resource",
	}
}

// NewForbiddenError creates a new forbidden (403) error
func NewForbiddenError() *JHTTPError {
	return &JHTTPError{
		StatusCode: http.StatusForbidden,
		Message:    "Hey, you aren't supposed to be here. Get outta here",
	}
}

// NewValidationError creates a new HTTP validation error. The
// `errs` parameter should be a map of field -> error
func NewValidationError(validationErr string) *JHTTPError {
	return NewBadRequestError(validationErr)
}
