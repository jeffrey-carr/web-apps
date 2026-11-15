package word_chain

const LobbyCodePathVar = "code"

// CreateLobbyResponse is the response to a CreateLobby request
type CreateLobbyResponse struct {
	Code string `json:"code"`
}

type RespondToRematchProposalRequest struct {
	Accepted bool `json:"accepted"`
}
