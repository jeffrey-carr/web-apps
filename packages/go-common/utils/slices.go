package utils

import "math/rand/v2"

// Fill fills an array with zeroed values
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
}

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

// FilterAndMap is like Filter and Map smushed into one
func FilterAndMap[T any, K any](s []T, f func(item T) (K, bool)) []K {
	var results []K
	for _, item := range s {
		if r, ok := f(item); ok {
			results = append(results, r)
		}
	}

	return results
}

// PickRandom gets a random item from a slice
func PickRandom[T any](s []T) T {
	var ret T
	if len(s) == 0 {
		return ret
	}

	i := rand.IntN(len(s))
	return s[i]
}

// Shuffle shuffles the content of a slice in-place
func Shuffle[T any](s []T) {
	rand.Shuffle(len(s), func(i, j int) {
		s[i], s[j] = s[j], s[i]
	})
}

func RemoveFirst[T any](s []T) T {
	var val T
	if len(s) == 0 {
		return val
	}

	val = s[len(s)-1]
	s = s[:len(s)-1]
	return val
}
