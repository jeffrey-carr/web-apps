package utils

import "fmt"

// PrintHello prints hello. Why do I even have this
func PrintHello() {
	fmt.Println("hello world")
}

// Fill creates a new slice of empty
func Fill[T any](length int) []T {
	var items []T
	for range length {
		var item T
		items = append(items, item)
	}

	return items
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
