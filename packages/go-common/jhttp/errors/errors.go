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

func NewBadRequestError(msg string) *JHTTPError {
	return &JHTTPError{
		StatusCode: http.StatusInternalServerError,
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

func NewUnauthorizedError() *JHTTPError {
	return &JHTTPError{
		StatusCode: http.StatusUnauthorized,
		Message:    "Not authorized to access this resource",
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
