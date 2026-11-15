package sse

import (
	"time"
)

// ConnectionData is our server's information about SSE connections
type ConnectionData struct {
	Comm        chan string
	ConnectedAt time.Time
}

// MessageLevel is the level at which is the message is being sent
type MessageLevel string

// The different available message levels
const (
	MessageLevelConnection = "connection"
	MessageLevelError      = "error"
	MessageLevelWarning    = "warning"
	MessageLevelInfo       = "info"
)

type ConnectionState string

const (
	ConnectionStateConnected     ConnectionState = "connected"
	ConnectionStateDisconnected  ConnectionState = "disconnected"
	ConnectionStateLobbyNotExist ConnectionState = "lobby_not_exist"
	ConnectionStateLobbyClosed   ConnectionState = "lobby_closed"
)

type Action string

// Message is a message sent over SSE
type Message[T any] struct {
	Level  MessageLevel `json:"level"`
	Action Action       `json:"action,omitempty"`
	Data   T            `json:"data"`
}

// GenericMessage is a generic SSE message
type GenericMessage struct {
	Message string `json:"message"`
}

// ConnectionMessageData is the data that gets sent along with a connection
// message
type ConnectionMessageData struct {
	State ConnectionState `json:"state"`
}

// ConnectionMessage is the message the BE sends to inform the FE about its
// connection state
type ConnectionMessage = Message[ConnectionMessageData]

// NewConnectionMessage is a convenience method for creating a new connection message
func NewConnectionMessage(state ConnectionState) ConnectionMessage {
	return ConnectionMessage{
		Level: MessageLevelConnection,
		Data:  ConnectionMessageData{State: state},
	}
}
