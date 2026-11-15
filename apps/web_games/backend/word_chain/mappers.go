package word_chain

import (
	"go-common/jhttp/sse"
	"go-common/types"
	"go-common/utils"
	"maps"
	"slices"
	"strings"
)

func GenerateChain(dictionary map[string][]string) []string {
	lastWord := utils.PickRandom(slices.Collect(maps.Keys(dictionary)))
	usedWords := utils.NewSet(lastWord)
	chain := make([]string, 0, TargetChainLength)

	for len(chain) < TargetChainLength {
		availableWords := dictionary[lastWord]
		potentialNextWord := CleanWord(utils.PickRandom(availableWords))

		if usedWords.Has(potentialNextWord) {
			continue
		}

		usedWords.Add(potentialNextWord)
		chain = append(chain, potentialNextWord)
		lastWord = potentialNextWord
	}

	return chain
}

// ConcealWord conceals len(word)-numRevealed letters and obscures
// the rest with '?'
func ConcealWord(word string, nRevealed int) string {
	if nRevealed >= len(word) {
		return word
	}

	str := word[:nRevealed]
	str += strings.Repeat("?", len(word)-nRevealed)
	return str
}

// CountRevealed counts the number of revealed letters in the word
func CountRevealed(word string) int {
	return strings.IndexRune(word, '?')
}

// CleanWord cleans up a word
func CleanWord(word string) string {
	return strings.ToLower(strings.TrimSpace(word))
}

// ConstructPlayerJoinedMessage creates a player joined message for a user
func ConstructPlayerJoinedMessage(user types.CommonUser, isHost bool) sse.Message[playerJoinedData] {
	return sse.Message[playerJoinedData]{
		Level:  sse.MessageLevelInfo,
		Action: sseActionPlayerJoined,
		Data: playerJoinedData{
			UUID:      user.UUID,
			Name:      user.FName,
			Character: user.Character,
			IsHost:    isHost,
		},
	}
}

// ConstructPlayerLeftMessage creates a player left message for a user
func ConstructPlayerLeftMessage(user types.CommonUser) sse.Message[playerLeftData] {
	return sse.Message[playerLeftData]{
		Level:  sse.MessageLevelInfo,
		Action: sseActionPlayerLeft,
		Data: playerLeftData{
			UUID: user.UUID,
		},
	}
}

// ConstructGameStartMessage creates a game start message
func ConstructGameStartMessage(initialData GameState) sse.Message[gameStartData] {
	return sse.Message[gameStartData]{
		Level:  sse.MessageLevelInfo,
		Action: sseActionGameStart,
		Data:   initialData,
	}
}

// ConstructPlayerProgressMessage creates a player progress message
func ConstructPlayerProgressMessage(
	playerUUID string,
	correct bool,
	progress int,
	penaltyInSeconds int,
	revealedLetters int,
) sse.Message[playerProgressData] {
	return sse.Message[playerProgressData]{
		Level:  sse.MessageLevelInfo,
		Action: sseActionProgressUpdate,
		Data: playerProgressData{
			PlayerUUID:       playerUUID,
			Correct:          correct,
			Progress:         progress,
			PenaltyInSeconds: penaltyInSeconds,
			RevealedLetters:  revealedLetters,
		},
	}
}

// ConstructPlayerWinMessage constructs a player win message
func ConstructPlayerWinMessage(user types.CommonUser, lobby sse.Lobby[GameSession]) sse.Message[playerWinData] {
	var chain []string
	playerData := map[string]playerWinIndividualData{}
	for userUUID, userData := range lobby.Users {
		gameData, ok := lobby.GameData[userUUID]
		if !ok {
			continue
		}
		if chain == nil {
			chain = gameData.Chain
		}

		playerData[userUUID] = playerWinIndividualData{
			Name:           userData.User.FName,
			Character:      userData.User.Character,
			FinalProgress:  gameData.State.Progress,
			DisconnectedAt: userData.DisconnectedAt,
		}
	}

	return sse.Message[playerWinData]{
		Level:  sse.MessageLevelInfo,
		Action: sseActionPlayerWin,
		Data: playerWinData{
			WinningUUID: user.UUID,
			Chain:       chain,
			PlayerData:  playerData,
		},
	}
}

// ConstructProposeRematchMessage constructs a new propose rematch message
func ConstructProposeRematchMessage() sse.Message[*struct{}] {
	return sse.Message[*struct{}]{
		Level:  sse.MessageLevelInfo,
		Action: sseActionProposeRematch,
	}
}

// ConstructRespondRematchMessage constructs a reponse to a rematch proposal
func ConstructRespondRematchMessage(accepted bool) sse.Message[rematchResponseData] {
	return sse.Message[rematchResponseData]{
		Level:  sse.MessageLevelInfo,
		Action: sseActionRespondRematch,
		Data: rematchResponseData{
			Accepted: accepted,
		},
	}
}
