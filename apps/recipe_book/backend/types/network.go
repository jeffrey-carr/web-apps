package types

// Response is a standard backend response
type Response[T any] struct {
	Message      string `json:"message"`
	ErrorMessage string `json:"errorMessage"`
	Data         T      `json:"data,omitempty"`
}
