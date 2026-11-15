package sse

import (
	"encoding/json"
	"errors"
	"fmt"
	"go-common/utils"
	"maps"
	"net/http"
	"slices"
	"sync"
	"time"
)

// ErrTooManyClients is returned when the maximum number of clients are already connected to the
// server
var ErrTooManyClients = errors.New("max number of clients already connected")

// ErrNamespaceNotExist is returned when the given namespace does not exist
var ErrNamespaceNotExist = errors.New("namespace does not exist")

type manager struct {
	clients    map[string]map[string]ConnectionData
	maxClients *int

	lock sync.RWMutex
}

type Manager interface {
	// CheckAndReserveNamespace checks if the given namespace is available and reserves it. Returns
	// a boolean indicating if the namespace was available or not
	CheckAndReserveNamespace(namespace string) bool
	// RemoveNamespace removes a namespace and gracefully closes all client connections
	RemoveNamespace(namespace string) error
	// AddClient adds a new client to the manager
	AddClient(namespace string, responseWriter http.ResponseWriter, clientID string, commsChannel chan string) error
	// RemoveClient removes clients with the specified IDs from the manager
	// GetConnections returns all current connections for a given namespace, and a boolean
	// if that namespace was present
	GetConnections(namespace string) (map[string]ConnectionData, bool)
	// RemoveClients removes the given client IDs (if they exist) and returns the number of connections
	// remaining in the namespace
	RemoveClients(namespace string, clientIDs ...string) (int, error)
	// SetMax sets the max number of clients allowed to connect. Setting the max
	// to 0 or less means "no max"
	SetMax(n int)
	// MessageClient sends a message to a specific client
	MessageClients(namespace string, data any, clientIDs ...string) error
	// Broadcast sends a message to all clients, excluding any provided
	Broadcast(namespace string, data any, excludedClientIDs ...string) error
	// AllConnectedUsers returns a list of all the users currenctly connected to the server
	// across all namespaces
	AllConnectedUsers() []string
	// ListNamespaces lists the namespaces this manager is managing
	ListNamespaces() []string
}

func NewManager() Manager {
	return &manager{
		clients: map[string]map[string]ConnectionData{},
		lock:    sync.RWMutex{},
	}
}

func (m *manager) SetMax(n int) {
	m.lock.Lock()
	defer m.lock.Unlock()

	if n <= 0 {
		m.maxClients = nil
		return
	}

	m.maxClients = &n
}

func (m *manager) CheckAndReserveNamespace(namespace string) bool {
	m.lock.Lock()
	defer m.lock.Unlock()

	_, taken := m.clients[namespace]
	if taken {
		return false
	}

	m.clients[namespace] = map[string]ConnectionData{}
	return true
}

func (m *manager) RemoveNamespace(namespace string) error {
	m.lock.Lock()
	defer m.lock.Unlock()

	connections, ok := m.clients[namespace]
	if !ok {
		return fmt.Errorf("unknown namespace: %s", namespace)
	}

	for connection := range maps.Values(connections) {
		close(connection.Comm)
	}

	delete(m.clients, namespace)
	return nil
}

func (m *manager) AddClient(namespace string, w http.ResponseWriter, clientID string, comms chan string) error {
	if namespace == "" {
		return errors.New("namespace is required")
	}
	if clientID == "" {
		return errors.New("client ID is required")
	}

	m.lock.Lock()
	defer m.lock.Unlock()

	connections, ok := m.clients[namespace]
	if !ok {
		return ErrNamespaceNotExist
	}

	if m.maxClients != nil && m.size() >= *m.maxClients {
		return ErrTooManyClients
	}

	data := ConnectionData{
		Comm:        comms,
		ConnectedAt: time.Now(),
	}

	m.setHeaders(w)

	connections[clientID] = data
	return nil
}

func (m *manager) GetConnections(namespace string) (map[string]ConnectionData, bool) {
	m.lock.Lock()
	defer m.lock.Unlock()

	conns, ok := m.clients[namespace]
	return conns, ok
}

func (m *manager) RemoveClients(namespace string, clientIDs ...string) (int, error) {
	m.lock.Lock()
	defer m.lock.Unlock()

	clients, ok := m.clients[namespace]
	if !ok {
		return 0, ErrNamespaceNotExist
	}

	for _, id := range clientIDs {
		client, ok := clients[id]
		if !ok {
			continue
		}

		close(client.Comm)
		delete(clients, id)
	}

	return len(clients), nil
}

func (m *manager) Broadcast(namespace string, data any, excludedClientIDs ...string) error {
	m.lock.Lock()
	defer m.lock.Unlock()

	namespaceData, ok := m.clients[namespace]
	if !ok {
		return ErrNamespaceNotExist
	}

	excludedClientsSet := utils.NewSet(excludedClientIDs...)
	var clients []ConnectionData
	for clientID, connection := range namespaceData {
		if excludedClientsSet.Has(clientID) {
			continue
		}

		clients = append(clients, connection)
	}

	if len(clients) == 0 {
		return nil
	}

	return m.sendMessage(data, clients)
}

func (m *manager) MessageClients(namespace string, data any, clientIDs ...string) error {
	m.lock.Lock()
	defer m.lock.Unlock()

	namespaceData, ok := m.clients[namespace]
	if !ok {
		return ErrNamespaceNotExist
	}

	clients := make([]ConnectionData, 0, len(clientIDs))
	for _, id := range clientIDs {
		if client, ok := namespaceData[id]; ok {
			clients = append(clients, client)
		}
	}

	return m.sendMessage(data, clients)
}

func (m *manager) AllConnectedUsers() []string {
	m.lock.Lock()
	defer m.lock.Unlock()

	userUUIDs := utils.NewSet[string]()
	for connections := range maps.Values(m.clients) {
		userUUIDs.Add(slices.Collect(maps.Keys(connections))...)
	}

	return userUUIDs.ToSlice()
}

func (m *manager) ListNamespaces() []string {
	m.lock.RLock()
	defer m.lock.RUnlock()

	return slices.Collect(maps.Keys(m.clients))
}

func (m *manager) sendMessage(data any, clients []ConnectionData) error {
	b, err := json.Marshal(data)
	if err != nil {
		return err
	}

	// SSE requires messages to be prefixed with `data: ` and
	// terminated with `\n\n`
	message := fmt.Sprintf("data: %s\n\n", string(b))

	for _, client := range clients {
		client.Comm <- message
	}

	return nil
}

// size returns the total number of connections. Does not grab the lock first so it can be used
// within other methods
func (m *manager) size() int {
	allApps := slices.Collect(maps.Values(m.clients))
	allConnections := utils.Map(allApps, func(appConnections map[string]ConnectionData) []ConnectionData {
		return slices.Collect(maps.Values(appConnections))
	})
	return utils.Sum(utils.Map(allConnections, func(conns []ConnectionData) int { return len(conns) })...)
}

func (m *manager) setHeaders(w http.ResponseWriter) {
	w.Header().Set("Content-Type", "text/event-stream")
	w.Header().Set("Cache-Control", "no-cache")
	w.Header().Set("Connection", "keep-alive")
	w.WriteHeader(http.StatusOK)
}
