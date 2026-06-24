package utils

// Ptr turns something into a pointer
func Ptr[T any](value T) *T {
	return &value
}

// Deref safely deferences a pointer
func Deref[T any](ptr *T) T {
	var ret T
	if ptr != nil {
		ret = *ptr
	}

	return ret
}
