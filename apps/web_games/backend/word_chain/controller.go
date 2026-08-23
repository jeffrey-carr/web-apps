package word_chain

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"go-common/services/jencryption"
	"go-common/utils"
)

type Controller struct {
	dictionary        map[string][]string
	encryptionService jencryption.Encryption
}

// NewController creates a new Word Chain controller
func NewController(
	dictionary map[string][]string,
	encryptionService jencryption.Encryption,
) Controller {
	return Controller{
		dictionary:        dictionary,
		encryptionService: encryptionService,
	}
}

func (c Controller) NewGame(_ context.Context) (GamePackage, error) {
	chain := GenerateChain(c.dictionary)
	if chain == nil {
		return GamePackage{}, errors.New("could not generate chain")
	}

	revealed := make([]string, 0, len(chain))
	// Reveal the first word, and the first letter of the next word
	revealed = append(revealed, chain[0])
	revealed = append(revealed, ConcealWord(chain[1], 1))
	for _, word := range chain[2:] {
		revealed = append(revealed, ConcealWord(word, 0))
	}

	state := GameState{
		UUID:          utils.NewUUID(),
		RevealedChain: revealed,
		Progress:      1,
	}
	data := GameSession{
		State: state,
		Chain: chain,
	}

	encryptedState, err := c.encryptGameState(data)
	if err != nil {
		return GamePackage{}, err
	}

	return GamePackage{
		state,
		encryptedState,
	}, nil
}

func (c Controller) ValidateGuess(ctx context.Context, request ValidateGuessRequest) (ValidateGuessResponse, error) {
	gameState, err := c.decryptGameState(request.EncryptedState)
	if err != nil {
		return ValidateGuessResponse{}, err
	}

	if gameState.State.Progress >= len(gameState.Chain) {
		return ValidateGuessResponse{}, fmt.Errorf("invalid progress: state progress (%d) >= chain length (%d)", gameState.State.Progress, len(gameState.Chain))
	}

	progress := gameState.State.Progress
	currentWord := gameState.Chain[progress]
	cleanedGuess := CleanWord(request.Guess)

	var updatedState GameSession
	var correct, victory bool
	if cleanedGuess == gameState.Chain[gameState.State.Progress] {
		correct = true
		gameState.State.RevealedChain[progress] = currentWord

		progress++
		gameState.State.Progress = progress
		victory = progress == len(gameState.Chain)
		if !victory {
			gameState.State.RevealedChain[progress] = ConcealWord(gameState.Chain[progress], 1)
		}

		updatedState = gameState
	} else {
		revealedLetters := CountRevealed(gameState.State.RevealedChain[progress])
		toReveal := min(len(currentWord)-1, revealedLetters+1)
		gameState.State.RevealedChain[progress] = ConcealWord(currentWord, toReveal)
		updatedState = gameState
	}

	freshlyEncryptedState, err := c.encryptGameState(updatedState)
	if err != nil {
		return ValidateGuessResponse{}, err
	}

	return ValidateGuessResponse{
		Game: GamePackage{
			gameState.State,
			freshlyEncryptedState,
		},
		Correct: correct,
		Victory: victory,
	}, nil
}

func (c Controller) encryptGameState(state GameSession) (string, error) {
	encoded, err := json.Marshal(state)
	if err != nil {
		return "", nil
	}

	encryptedState, err := c.encryptionService.Encrypt(encoded)
	if err != nil {
		return "", err
	}

	return encryptedState, nil
}

func (c Controller) decryptGameState(encryptedState string) (GameSession, error) {
	unencryptedState, err := c.encryptionService.Decrypt(encryptedState)
	if err != nil {
		return GameSession{}, err
	}

	var state GameSession
	err = json.Unmarshal(unencryptedState, &state)
	return state, err
}
