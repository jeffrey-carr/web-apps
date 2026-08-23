package utils

// Stack is the stack data structure
type Stack[T any] interface {
	Push(...T)
	Pop() T
	Size() int
	ToSlice() []T
}

type stack[T any] struct {
	data []T
}

// NewStack creates a new stack
func NewStack[T any](initialItems ...T) Stack[T] {
	return &stack[T]{data: initialItems}
}

// Push adds an item to the top of the stack
func (s *stack[T]) Push(items ...T) {
	s.data = append(s.data, items...)
}

// Pop removes the item from the top of the stack
func (s *stack[T]) Pop() T {
	if len(s.data) == 0 {
		var zero T
		return zero
	}

	value := s.data[len(s.data)-1:][0]
	s.data = s.data[:len(s.data)-1]
	return value
}

// Size returns the number of items in the stack
func (s *stack[T]) Size() int {
	return len(s.data)
}

// ToSlice converts the stack to a slice. It returns
// a fresh copy of the data, so mutating the array does
// not affect the stack
func (s *stack[T]) ToSlice() []T {
	var ret []T
	copy(ret, s.data)
	return ret
}
