package main

// CreateTournamentRequest is the http request to create a new tournament
type CreateTournamentRequest struct {
	Title string `json:"title"`
}

// UpdateTournamentRequest is the http request to update an existing tournament
type UpdateTournamentRequest struct {
	TournamentUUID string `json:"tournamentUUID"`
	Title          string `json:"title"`
}

// CheckTournamentUUIDResponse is the http response to a "check tournament" request
type CheckTournamentUUIDResponse struct {
	Exists bool `json:"exists"`
}

// CreateBracketRequest is the http request to create a new bracket
type CreateBracketRequest struct {
	Title    string            `json:"title"`
	Choices  BracketTree[Bear] `json:"choices"`
	Champion Bear              `json:"champion"`
}

type UpdateBracketRequest struct {
	Title    *string            `json:"title"`
	Choices  *BracketTree[Bear] `json:"choices"`
	Champion Bear               `json:"champion"`
}

type GetBracketsRequest struct {
	BracketUUIDs []string `json:"bracketUUIDs"`
}
