package word_chain

import (
	"go-common/jhttp/sse"
	"go-common/types"
	"time"
)

const (
	sseActionPlayerJoined   sse.Action = "player_joined"
	sseActionPlayerLeft     sse.Action = "player_left"
	sseActionProgressUpdate sse.Action = "progress_update"
	sseActionGameStart      sse.Action = "game_start"
	sseActionPlayerWin      sse.Action = "winner"
	sseActionProposeRematch sse.Action = "propose_rematch"
	sseActionRespondRematch sse.Action = "respond_rematch"
)

type playerJoinedData struct {
	UUID      string              `json:"uuid"`
	Name      string              `json:"name"`
	Character types.UserCharacter `json:"character"`
	IsHost    bool                `json:"isHost"`
}

type playerLeftData struct {
	UUID string `json:"uuid"`
}

type gameStartData = GameState

type playerProgressData = struct {
	PlayerUUID       string `json:"playerUUID"`
	Correct          bool   `json:"correct"`
	Progress         int    `json:"progress"`
	PenaltyInSeconds int    `json:"penaltyInSeconds,omitempty"`
	RevealedLetters  int    `json:"revealedLetters"`
}

type playerWinData = struct {
	WinningUUID string                             `json:"winningUUID"`
	Chain       []string                           `json:"chain"`
	PlayerData  map[string]playerWinIndividualData `json:"playerData"`
}

type playerWinIndividualData struct {
	Name           string              `json:"name"`
	Character      types.UserCharacter `json:"character"`
	FinalProgress  int                 `json:"finalProgress"`
	DisconnectedAt *time.Time          `json:"disconnectedAt,omitempty"`
}

type rematchResponseData struct {
	Accepted bool `json:"accepted"`
}
