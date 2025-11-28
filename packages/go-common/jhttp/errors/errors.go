package errors

import (
	"fmt"
	"net/http"
)

type JHTTPError struct {
	error
	StatusCode int    `json:"status"`
	Message    string `json:"message"`
	Data       any    `json:"data"`
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

func NewBadRequestError(msg string) *JHTTPError {
	return &JHTTPError{
		StatusCode: http.StatusBadRequest,
		Message:    msg,
	}
}

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

// NewUnauthorizedError creates a new unauthorized (401) error
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
func NewValidationError(errs map[string]string) *JHTTPError {
	return &JHTTPError{
		StatusCode: http.StatusBadRequest,
		Message:    "Error validating some fields",
		Data:       errs,
	}
}

// NewNotFoundError creates a new NotFound error
func NewNotFoundError() *JHTTPError {
	return &JHTTPError{
		StatusCode: http.StatusNotFound,
		Message:    "Not found",
	}
}
