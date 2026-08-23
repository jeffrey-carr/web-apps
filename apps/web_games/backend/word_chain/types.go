package word_chain

type GameSession struct {
	State GameState `json:"state"`
	Chain []string  `json:"chain"`
}

type GameState struct {
	UUID          string   `json:"uuid"`
	RevealedChain []string `json:"chain"`
	Progress      int      `json:"progress"`
}

type GamePackage struct {
	GameState
	EncryptedState string `json:"encryptedState"`
}

// ValidateGuessRequest is the request to validate a word chain guess
type ValidateGuessRequest struct {
	Guess          string `json:"guess"`
	EncryptedState string `json:"encryptedState"`
}

// ValidateGuessResponse is the response to a validate guess request
type ValidateGuessResponse struct {
	Game    GamePackage `json:"game"`
	Correct bool        `json:"correct"`
	Victory bool        `json:"victory"`
}
