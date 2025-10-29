package utils

import "fmt"

func PrintHello() {
	fmt.Println("hello world")
}

func Fill[T any](length int) []T {
	var items []T
	for range length {
		var item T
		items = append(items, item)
	}

	return items
}
