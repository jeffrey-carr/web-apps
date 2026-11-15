package utils

import (
	"iter"
	"maps"
	"sync"
)

type tMap[K comparable, V any] struct {
	lock sync.RWMutex

	data map[K]V
}

type ThreadedMap[K comparable, V any] interface {
	// Put puts data into the map
	Put(K, V)
	// Get gets data from the map
	Get(K) (V, bool)
	// Delete deletes data from the map by its key
	Delete(K)
	// Size returns the number of items in the map
	Size() int
	// Iter iterates over the map. Maps do not guarantee order,
	// so neither does this iterator
	Iter() iter.Seq2[K, V]
}

// NewThreadedMap creates a new threaded map
func NewThreadedMap[K comparable, V any]() ThreadedMap[K, V] {
	return &tMap[K, V]{
		lock: sync.RWMutex{},
		data: map[K]V{},
	}
}

func (m *tMap[K, V]) Put(k K, v V) {
	m.lock.Lock()
	defer m.lock.Unlock()

	m.data[k] = v
}

func (m *tMap[K, V]) Get(k K) (V, bool) {
	m.lock.RLock()
	defer m.lock.RUnlock()

	v, ok := m.data[k]
	return v, ok
}

func (m *tMap[K, V]) Delete(k K) {
	m.lock.Lock()
	defer m.lock.Unlock()

	delete(m.data, k)
}

func (m *tMap[K, V]) Size() int {
	m.lock.RLock()
	defer m.lock.RUnlock()

	return len(m.data)
}

func (m *tMap[K, V]) Iter() iter.Seq2[K, V] {
	m.lock.RLock()
	d := maps.Clone(m.data)
	m.lock.RUnlock()

	return func(yield func(k K, v V) bool) {
		for k, v := range d {
			if !yield(k, v) {
				return
			}
		}
	}
}
