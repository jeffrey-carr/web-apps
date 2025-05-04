package gocommon

// Set implements a standard set
type Set[T comparable] interface {
	Add(item T)
	AddAll(items ...T)
	Has(item T) bool
	Delete(item T)
	Slice() []T
	Size() int
}

// NewSet creates a new set with the items provided
func NewSet[T comparable](baseItems ...T) Set[T] {
	newSet := set[T]{
		items: map[T]struct{}{},
	}

	for _, item := range baseItems {
		newSet.Add(item)
	}

	return &newSet
}

type set[T comparable] struct {
	items map[T]struct{}
}

func (s *set[T]) Add(item T) {
	s.items[item] = struct{}{}
}

func (s *set[T]) AddAll(items ...T) {
	for _, item := range items {
		s.Add(item)
	}
}

func (s *set[T]) Has(item T) bool {
	_, exists := s.items[item]
	return exists
}

func (s *set[T]) Delete(item T) {
	delete(s.items, item)
}

func (s *set[T]) Slice() []T {
	allItems := []T{}
	for key := range s.items {
		allItems = append(allItems, key)
	}

	return allItems
}

func (s *set[T]) Size() int {
	return len(s.items)
}
