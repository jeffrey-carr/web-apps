package binoku

// ValidateBoardResponse is the response to a
// ValidateBoard request
type ValidateBoardResponse struct {
	Valid bool             `json:"valid"`
	Hint  InvalidBoardHint `json:"hint"`
}

// InvalidBoardHint is the data returned to hint
// to the player what is wrong with the board
type InvalidBoardHint struct {
	Rows []int `json:"rows"`
	Cols []int `json:"cols"`
}
