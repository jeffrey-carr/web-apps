package utils

func Fill[T any](length int) []T {
	var items []T
	for range length {
		var item T
		items = append(items, item)
	}

	return items
}

// Any returns if any items in s cause f to return true
func Any[T any](s []T, f func(T) bool) bool {
	if len(s) == 0 {
		return false
	}

	for _, x := range s {
		if f(x) {
			return true
		}
	}

	return false
}

// Find finds the first item in s where f is true
func Find[T any](s []T, f func(T) bool) (item T, found bool) {
	for _, item = range s {
		if f(item) {
			found = true
			return
		}
	}

	return
}

// Map applies the supplied function to every item in the slice and returns the results
func Map[T, K any](s []T, f func(T) K) []K {
	results := make([]K, 0, len(s))
	for _, item := range s {
		results = append(results, f(item))
	}

	return results
// Filter accepts a slice and a predicate function. Items for which the predicate
// returns true are retained in the returned slice.
func Filter[T any](s []T, f func(item T) bool) []T {
	var items []T
	for _, item := range s {
		if f(item) {
			items = append(items, item)
		}
	}

	return items
}
