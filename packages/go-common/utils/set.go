package utils

// Set represents a Set data structure
type Set[T comparable] struct {
	data map[T]struct{}
}

// NewSet creates a new set with the initial values
func NewSet[T comparable](initialValues ...T) Set[T] {
	set := Set[T]{data: map[T]struct{}{}}
	for _, item := range initialValues {
		set.Add(item)
	}

	return set
}

// Add adds an item to the set
func (s *Set[T]) Add(items ...T) {
	for _, item := range items {
		s.data[item] = struct{}{}
	}
}

// Contains returns whether the item is in the set or not
func (s *Set[T]) Has(item T) bool {
	_, ok := s.data[item]
	return ok
}

func (s *Set[T]) Remove(item T) {
	if !s.Has(item) {
		return
	}

	delete(s.data, item)
}

func (s *Set[T]) Clear() {
	s.data = map[T]struct{}{}
}

// Size returns the current size of the set
func (s *Set[T]) Size() int {
	return len(s.data)
}

// ToSlice converts the set to a slice
func (s *Set[T]) ToSlice() []T {
	items := make([]T, 0, len(s.data))
	for item := range s.Iter {
		items = append(items, item)
	}

	return items
}

// Iter returns an iterator over the values in the set
func (s *Set[T]) Iter(yield func(T) bool) {
	for item := range s.data {
		if !yield(item) {
			return
		}
	}
}

// Clone safely clones the set.
func (s *Set[T]) Clone() Set[T] {
	newData := make(map[T]struct{}, len(s.data))
	for item := range s.Iter {
		newData[item] = struct{}{}
	}

	return Set[T]{data: newData}
}
