package gocommon

import "net/http"

// HTTPResponse is the struct for an HTTP Response
type HTTPResponse struct {
	Status int `json:"status"`
	Data   any `json:"data,omitempty"`
}

// GenericMessage is the type for a generic message
type GenericMessage struct {
	Message string `json:"message"`
}

// NewBadRequestError creates a new BadRequest error
func NewBadRequestError(message string) HTTPResponse {
	return HTTPResponse{
		Status: http.StatusBadRequest,
		Data: GenericMessage{
			Message: message,
		},
	}
}

// ErrorMessageData is the response type for an error message
type ErrorMessageData struct {
	FriendlyErr string `json:"friendlyErr"`
	Err         error  `json:"err"`
	ErrMessage  string `json:"errMessage"`
}

// NewInternalServerError creates a new internal server error
func NewInternalServerError(err error, message string) HTTPResponse {
	return HTTPResponse{
		Status: http.StatusInternalServerError,
		Data: ErrorMessageData{
			FriendlyErr: message,
			Err:         err,
			ErrMessage:  err.Error(),
		},
	}
}
