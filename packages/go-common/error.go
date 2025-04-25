package gocommon

import "net/http"

// HTTPResponse is the struct for an HTTP Response
type HTTPResponse[T any] struct {
	Status int `json:"status"`
	Data   T   `json:"data"`
}

// GenericMessage is the format for when we are just sending a message
type GenericMessage struct {
	Message string `json:"message"`
}

// NewBadRequestError creates a new BadRequest error
func NewBadRequestError(message string) HTTPResponse[GenericMessage] {
	return HTTPResponse[GenericMessage]{
		Status: http.StatusBadRequest,
		Data: GenericMessage{
			Message: message,
		},
	}
}

// NewInternalServerError creates a new internal server error
func NewInternalServerError(err error) HTTPResponse[GenericMessage] {
	return HTTPResponse[GenericMessage]{
		Status: http.StatusInternalServerError,
		Data: GenericMessage{
			Message: err.Error(),
		},
	}
}
