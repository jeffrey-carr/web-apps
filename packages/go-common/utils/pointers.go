package utils

// Ptr turns something into a pointer
func Ptr[T any](value T) *T {
	return &value
}
