package gocommon

// Filter creates a new slice containing only the items that return true from f
func Filter[T comparable](items []T, f func(i1 T) bool) []T {
	validItems := []T{}
	for _, i := range items {
		if f(i) {
			validItems = append(validItems, i)
		}
	}

	return validItems
}
