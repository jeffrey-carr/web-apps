package word_chain

type GameSession struct {
	State GameState `json:"state"`
	Chain []string  `json:"chain"`
}

type GameState struct {
	RevealedChain []string `json:"chain"`
	Progress      int      `json:"progress"`
}

type GamePackage struct {
	GameState
	EncryptedState string `json:"encryptedState"`
}

// ValidateGuessRequest is the request to validate a word chain guess
type ValidateGuessRequest struct {
	Guess string `json:"guess"`
	// LobbyCode is provided when the user is playing in a multiplayer game
	LobbyCode string `json:"lobbyCode"`
	// EncryptedState is provided when the user is playing in a singleplayer game
	EncryptedState string `json:"encryptedState"`
}

// ValidateGuessResponse is the response to a validate guess request
type ValidateGuessResponse struct {
	State            GameState `json:"state"`
	EncryptedState   string    `json:"encryptedState,omitempty"`
	Correct          bool      `json:"correct"`
	Victory          bool      `json:"victory"`
	PenaltyInSeconds int       `json:"penaltyInSeconds"`
}
