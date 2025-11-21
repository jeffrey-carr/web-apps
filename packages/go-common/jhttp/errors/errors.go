package errors

import (
	"fmt"
	"net/http"
)

type JHTTPError struct {
	error
	StatusCode int    `json:"status"`
	Message    string `json:"message"`
	Data       any    `json:"data,omitempty"`
}

func (e JHTTPError) Error() string {
	return fmt.Sprintf("[%d]: %s", e.StatusCode, e.Message)
}

// NewBadRequestError creates a new HTTP bad request error
func NewBadRequestError(msg string) *JHTTPError {
	return &JHTTPError{
		StatusCode: http.StatusBadRequest,
		Message:    msg,
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

// NewValidationError creates a new HTTP validation error. The
// `errs` parameter should be a map of field -> error
func NewValidationError(validationErr string) *JHTTPError {
	return NewBadRequestError(validationErr)
}
