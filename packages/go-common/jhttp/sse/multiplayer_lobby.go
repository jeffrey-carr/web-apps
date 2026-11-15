package sse

import (
	"encoding/json"
	"errors"
	"fmt"
	"go-common/types"
	"go-common/utils"
	"maps"
	"slices"
	"sync"
	"time"

	"go.uber.org/multierr"
)

// ErrCodeInUse is returned when a lobby is attempted to be created by
// a code in use
var ErrCodeInUse = errors.New("code in use")

// ErrLobbyNotExist is returned when a lobby doesn't exist
var ErrLobbyNotExist = errors.New("lobby does not exist")

type userData struct {
	User           types.CommonUser
	DisconnectedAt *time.Time

	comms chan string
}

// NewLobby creates a new lobby and initiates the maps
func NewLobby[T any](
	hostUUID string,
	code string,
	minPlayers int,
	maxPlayers int,
	canJoinAfterStart bool,
) Lobby[T] {
	return Lobby[T]{
		HostUUID:          hostUUID,
		Code:              code,
		Users:             map[string]userData{},
		GameData:          map[string]T{},
		minPlayers:        minPlayers,
		maxPlayers:        maxPlayers,
		canJoinAfterStart: canJoinAfterStart,
	}
}

type Lobby[T any] struct {
	HostUUID string
	Code     string
	// Users is a map of UserUUID -> user data
	Users map[string]userData
	// GameData is a map of UserUUID -> user game data
	GameData map[string]T

	minPlayers, maxPlayers               int
	started, finished, canJoinAfterStart bool
	winners                              []string
}

// CanStart returns if a lobby is ready to start or not
func (l Lobby[T]) CanStart() bool {
	return l.Size() >= l.minPlayers
}

// Started returns if the lobby has already started
func (l Lobby[T]) Started() bool {
	return l.started
}

// Capacity returns its capacity, or max amount of players allowed to
// connect
func (l Lobby[T]) Capacity() int {
	return l.maxPlayers
}

// Size returns the size of the lobby, or how many players are currently connected
func (l Lobby[T]) Size() int {
	dat := slices.Collect(maps.Values(l.Users))
	return len(utils.Filter(dat, func(data userData) bool { return data.DisconnectedAt == nil }))
}

// Winners returns the winners of the lobby
func (l Lobby[T]) Winners() []string {
	if !l.finished {
		return nil
	}

	return l.winners
}

// MultiplayerLobbyManager managers an SSE multiplayer lobby
type MultiplayerLobbyManager[T any] interface {
	// Create creates a new lobby
	Create(code string, ownerUUID string) error
	// Join joins an existing lobby
	Join(code string, user types.CommonUser, commChannel chan string) error
	// Start marks a lobby started
	Start(code string) (Lobby[T], error)
	// Finish marks a lobby finished and stores the winners
	Finish(code string, winners []string) (Lobby[T], error)
	// Restart re-sets up a lobby
	Reset(code string) (Lobby[T], error)
	// Get returns the available data on a lobby and a flag for whether the lobby was found or not
	Get(code string) (l Lobby[T], ok bool)
	//  RemoveFromLobby removes a user from a lobby
	RemoveFromLobby(code string, user types.CommonUser) (int, error)
	// MarkDisconnected marks a user disconnected from a lobby, but keeps them in it
	MarkDisconnected(code string, user types.CommonUser) error
	// UpdateUserGameData updates a user's game data
	UpdateUserGameData(code string, data T, userUUID string) (Lobby[T], error)
	// BulkUpdateUserGameData updates a group of user's game data. takes a builder function
	// to avoid sharing pass-by-reference data structures between user maps
	BulkUpdateUserGameData(code string, dataBuilder func(userUUID string) T, userUUIDs ...string) (Lobby[T], error)
	// ShutDownLobby notifies users and closes a lobby
	ShutDownLobby(code string) error
	// Message sends a message to a set of users
	Message(code string, data any, userUUIDs ...string) error
	// Broadcast sends a message to all connected users
	Broadcast(code string, data any) error
	// Braodcast broadcasts a message to all users excluding the ones matching the passed-in UUIDs
	BroadcastExcluding(code string, data any, excludingUUIDs ...string) error
}

type lobbyManager[T any] struct {
	lobbies map[string]Lobby[T]
	lock    sync.RWMutex

	// min and max players per lobby
	minPPL, maxPPL           int
	canJoinLobbiesAfterStart bool
}

// NewLobby creates a new Multiplayer Lobby
func NewMultiplayerLobby[T any](
	minPlayers,
	maxPlayers int,
	canJoinLobbiesAfterStart bool,
) (MultiplayerLobbyManager[T], error) {
	minPPL := max(1, minPlayers)
	maxPPL := max(1, maxPlayers)

	if minPPL > maxPPL {
		return nil, errors.New("invalid min/max players")
	}

	return &lobbyManager[T]{
		lobbies:                  map[string]Lobby[T]{},
		lock:                     sync.RWMutex{},
		minPPL:                   minPPL,
		maxPPL:                   maxPPL,
		canJoinLobbiesAfterStart: canJoinLobbiesAfterStart,
	}, nil
}

func (m *lobbyManager[T]) Create(code string, ownerUUID string) error {
	m.lock.Lock()
	defer m.lock.Unlock()

	if _, ok := m.lobbies[code]; ok {
		return ErrCodeInUse
	}

	lobby := NewLobby[T](
		ownerUUID,
		code,
		m.minPPL,
		m.maxPPL,
		m.canJoinLobbiesAfterStart,
	)
	m.lobbies[code] = lobby

	return nil
}

func (m *lobbyManager[T]) Join(code string, user types.CommonUser, commChannel chan string) error {
	m.lock.Lock()
	defer m.lock.Unlock()

	l, ok := m.lobbies[code]
	if !ok {
		return ErrLobbyNotExist
	}

	if userData, userInLobby := l.Users[user.UUID]; userInLobby {
		userData.comms = commChannel
		userData.DisconnectedAt = nil
		l.Users[user.UUID] = userData
		m.lobbies[code] = l
		return nil
	}

	if l.started && !l.canJoinAfterStart {
		return errors.New("lobby has already started")
	}

	if l.Size() >= l.Capacity() {
		return errors.New("lobby full")
	}

	l.Users[user.UUID] = userData{
		User:  user,
		comms: commChannel,
	}
	m.lobbies[code] = l

	return nil
}

func (m *lobbyManager[T]) Start(code string) (Lobby[T], error) {
	m.lock.Lock()
	defer m.lock.Unlock()

	lobby, ok := m.lobbies[code]
	if !ok {
		return lobby, ErrLobbyNotExist
	}

	if !lobby.CanStart() {
		return lobby, errors.New("cannot start lobby")
	}

	if lobby.started {
		return lobby, errors.New("lobby already started")
	}

	lobby.started = true
	m.lobbies[code] = lobby
	return lobby, nil
}

func (m *lobbyManager[T]) Finish(code string, winners []string) (Lobby[T], error) {
	m.lock.Lock()
	defer m.lock.Unlock()

	lobby, ok := m.lobbies[code]
	if !ok {
		return lobby, ErrLobbyNotExist
	}

	if !lobby.started {
		return lobby, errors.New("lobby not started")
	}
	// already finished, nothing to do
	if lobby.finished {
		return lobby, nil
	}

	lobby.finished = true
	lobby.winners = slices.Clone(winners)
	m.lobbies[code] = lobby

	return lobby, nil
}

func (m *lobbyManager[T]) Reset(code string) (Lobby[T], error) {
	m.lock.Lock()
	defer m.lock.Unlock()

	lobby, ok := m.lobbies[code]
	if !ok {
		return lobby, ErrLobbyNotExist
	}

	if !lobby.finished {
		return lobby, errors.New("lobby not finished yet")
	}

	// Reset user data
	resetUserData := map[string]userData{}
	for userUUID, data := range lobby.Users {
		if data.DisconnectedAt != nil {
			continue
		}
		resetUserData[userUUID] = userData{
			User:  data.User,
			comms: data.comms,
		}
	}

	lobby = NewLobby[T](
		lobby.HostUUID,
		code,
		m.minPPL,
		m.maxPPL,
		m.canJoinLobbiesAfterStart,
	)
	lobby.Users = resetUserData
	m.lobbies[code] = lobby

	return lobby, nil
}

func (m *lobbyManager[T]) Get(code string) (l Lobby[T], ok bool) {
	m.lock.RLock()
	defer m.lock.RUnlock()

	l, ok = m.lobbies[code]
	return
}

func (m *lobbyManager[T]) RemoveFromLobby(code string, user types.CommonUser) (int, error) {
	m.lock.Lock()
	defer m.lock.Unlock()

	lobby, ok := m.lobbies[code]
	if !ok {
		return 0, ErrLobbyNotExist
	}

	userData, userExists := lobby.Users[user.UUID]
	if !userExists {
		return len(lobby.Users), nil
	}

	if userData.comms != nil {
		close(userData.comms)
	}

	delete(lobby.Users, user.UUID)
	m.lobbies[code] = lobby

	// if no players remain, clean up the server
	remaining := len(lobby.Users)
	if remaining == 0 {
		m.closeLobby(code)
	}

	return remaining, nil
}

func (m *lobbyManager[T]) MarkDisconnected(code string, user types.CommonUser) error {
	m.lock.Lock()
	defer m.lock.Unlock()

	lobby, ok := m.lobbies[code]
	if !ok {
		return ErrLobbyNotExist
	}

	data, found := lobby.Users[user.UUID]
	if !found {
		return nil
	}

	now := time.Now()
	data.DisconnectedAt = &now
	lobby.Users[user.UUID] = data
	m.lobbies[code] = lobby

	m.sendMessage(NewConnectionMessage(ConnectionStateDisconnected), data)

	// if all users are disconnected, clean up the lobby
	if utils.AllIter(maps.Values(lobby.Users), func(data userData) bool {
		return data.DisconnectedAt != nil
	}) {
		m.closeLobby(code)
	}

	return nil
}

func (m *lobbyManager[T]) Message(code string, data any, userUUIDs ...string) error {
	m.lock.Lock()
	l, ok := m.lobbies[code]
	if !ok {
		m.lock.Unlock()
		return ErrLobbyNotExist
	}

	var merrs error
	users := make([]userData, 0, len(userUUIDs))
	for _, uuid := range userUUIDs {
		data, ok := l.Users[uuid]
		if !ok {
			merrs = multierr.Append(merrs, fmt.Errorf("user not found: %s", uuid))
			continue
		}

		users = append(users, data)
	}
	m.lock.Unlock()

	return multierr.Append(merrs, m.sendMessage(data, users...))
}

func (m *lobbyManager[T]) Broadcast(code string, data any) error {
	m.lock.Lock()
	l, ok := m.lobbies[code]
	if !ok {
		m.lock.Unlock()
		return ErrLobbyNotExist
	}

	users := utils.Filter(
		slices.Collect(maps.Values(l.Users)),
		func(data userData) bool { return data.DisconnectedAt == nil },
	)
	m.lock.Unlock()

	return m.sendMessage(data, users...)
}

func (m *lobbyManager[T]) BroadcastExcluding(code string, data any, excludingUUIDs ...string) error {
	exclude := utils.NewSet(excludingUUIDs...)

	m.lock.RLock()
	l, ok := m.lobbies[code]
	if !ok {
		return ErrLobbyNotExist
	}

	users := utils.Filter(
		slices.Collect(maps.Values(l.Users)),
		func(data userData) bool { return !exclude.Has(data.User.UUID) && data.DisconnectedAt == nil },
	)
	m.lock.RUnlock()
	return m.sendMessage(data, users...)
}

// TODO: make this less susceptible to race conditions. Maybe some kind of etag to make sure we aren't
// overwriting data
func (m *lobbyManager[T]) UpdateUserGameData(code string, data T, userUUID string) (Lobby[T], error) {
	m.lock.Lock()
	defer m.lock.Unlock()

	lobby, ok := m.lobbies[code]
	if !ok {
		return Lobby[T]{}, ErrLobbyNotExist
	}

	// First, check if the user is connected
	if _, ok := lobby.Users[userUUID]; !ok {
		// TODO: make named error
		return Lobby[T]{}, errors.New("user not connected")
	}

	lobby.GameData[userUUID] = data

	m.lobbies[code] = lobby
	return lobby, nil
}

func (m *lobbyManager[T]) BulkUpdateUserGameData(code string, dataBuilder func(userUUID string) T, userUUIDs ...string) (Lobby[T], error) {
	m.lock.Lock()
	defer m.lock.Unlock()

	lobby, ok := m.lobbies[code]
	if !ok {
		return Lobby[T]{}, ErrLobbyNotExist
	}

	for _, uuid := range userUUIDs {
		// First, check if the user is connected
		if _, ok := lobby.Users[uuid]; !ok {
			continue
		}

		lobby.GameData[uuid] = dataBuilder(uuid)
	}

	m.lobbies[code] = lobby
	return lobby, nil
}

func (m *lobbyManager[T]) ShutDownLobby(code string) error {
	m.lock.Lock()
	defer m.lock.Unlock()

	if _, lobbyExists := m.lobbies[code]; !lobbyExists {
		return ErrLobbyNotExist
	}

	m.closeLobby(code)
	return nil
}

func (m *lobbyManager[T]) sendMessage(data any, users ...userData) error {
	b, err := json.Marshal(data)
	if err != nil {
		return err
	}

	// SSE requires messages to be prefixed with `data: ` and
	// terminated with `\n\n`
	message := fmt.Sprintf("data: %s\n\n", string(b))

	for _, data := range users {
		if data.comms == nil {
			continue
		}
		select {
		case data.comms <- message:
		default:
			fmt.Printf("warning: channel buffer full for user %s, dropped message\n", data.User.UUID)
		}
	}

	return nil
}

// closeLobby takes care of all chores to safely clean up a lobby.
//
// Lock must be taken BEFORE calling this method
func (m *lobbyManager[T]) closeLobby(code string) {
	lobby, ok := m.lobbies[code]
	if !ok {
		return
	}

	// send server closed blast to all players, even disconnected ones in case they
	// might get the message
	userData := slices.Collect(maps.Values(lobby.Users))
	err := m.sendMessage(
		NewConnectionMessage(ConnectionStateLobbyClosed),
		userData...,
	)
	if err != nil {
		// TODO: log
	}

	// close any remaining communication channels
	for _, data := range userData {
		if data.comms != nil {
			close(data.comms)
		}
	}

	delete(m.lobbies, code)
}
