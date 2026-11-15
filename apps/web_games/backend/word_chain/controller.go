package word_chain

import (
	"context"
	"encoding/json"
	"errors"
	"federation/sdk"
	"fmt"
	"go-common/jhttp/sse"
	"go-common/services/jencryption"
	"go-common/types"
	"go-common/utils"
	"maps"
	"net/http"
	"slices"
	"strings"
)

type Controller struct {
	federation        sdk.SDK
	dictionary        map[string][]string
	encryptionService jencryption.Encryption
	lobbyManager      sse.MultiplayerLobbyManager[GameSession]
}

// NewController creates a new Word Chain controller
func NewController(
	federationSDK sdk.SDK,
	dictionary map[string][]string,
	encryptionService jencryption.Encryption,
) Controller {
	manager, _ := sse.NewMultiplayerLobby[GameSession](2, 2, false)

	return Controller{
		federation:        federationSDK,
		dictionary:        dictionary,
		encryptionService: encryptionService,
		lobbyManager:      manager,
	}
}

func (c Controller) NewSingleplayerGame(_ context.Context) (GamePackage, error) {
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

func (c Controller) ValidateGuess(ctx context.Context, request ValidateGuessRequest, user types.CommonUser) (ValidateGuessResponse, error) {
	var session GameSession
	var err error
	isSingleplayer := request.EncryptedState != ""
	if isSingleplayer {
		session, err = c.decryptGameState(request.EncryptedState)
		if err != nil {
			return ValidateGuessResponse{}, err
		}
	} else {
		lobby, ok := c.lobbyManager.Get(request.LobbyCode)
		if !ok {
			return ValidateGuessResponse{}, sse.ErrLobbyNotExist
		}
		session, ok = lobby.GameData[user.UUID]
		if !ok {
			// TODO: named error
			return ValidateGuessResponse{}, errors.New("user not in lobby")
		}
	}

	if session.State.Progress >= len(session.Chain) {
		return ValidateGuessResponse{}, fmt.Errorf("invalid progress: state progress (%d) >= chain length (%d)", session.State.Progress, len(session.Chain))
	}

	cleanedGuess := CleanWord(request.Guess)
	correct := cleanedGuess == session.Chain[session.State.Progress]

	var updatedState GameSession
	var penaltySeconds int
	var victory bool

	if correct {
		updatedState, victory, err = c.handleCorrectGuess(ctx, session)
		if err != nil {
			return ValidateGuessResponse{}, err
		}
	} else {
		penaltySeconds = IncorrectPenaltySeconds
		updatedState, err = c.handleIncorrectGuess(ctx, session)
	}

	// Encrypt state to send to FE (if singleplayer, stateless)
	// Otherwise, store state in memory (if multiplayer)
	var freshlyEncryptedState string
	if isSingleplayer {
		freshlyEncryptedState, err = c.encryptGameState(updatedState)
		if err != nil {
			return ValidateGuessResponse{}, err
		}
	} else {
		_, err = c.lobbyManager.UpdateUserGameData(request.LobbyCode, updatedState, user.UUID)
		if err != nil {
			return ValidateGuessResponse{}, err
		}
	}

	// If multiplayer, let all other players know what just happened so they can show their player
	if !isSingleplayer {
		if victory {
			lobby, ok := c.lobbyManager.Get(request.LobbyCode)
			if !ok {
				return ValidateGuessResponse{}, errors.New("lobby does not exist")
			}

			// TODO: log error
			c.lobbyManager.Finish(request.LobbyCode, []string{user.UUID})
			c.lobbyManager.Broadcast(request.LobbyCode, ConstructPlayerWinMessage(user, lobby))
		} else {
			revealedLetters := CountRevealed(updatedState.State.RevealedChain[updatedState.State.Progress])
			// TODO: log error
			c.lobbyManager.BroadcastExcluding(
				request.LobbyCode,
				ConstructPlayerProgressMessage(
					user.UUID,
					correct,
					updatedState.State.Progress,
					penaltySeconds,
					revealedLetters,
				),
				user.UUID,
			)
		}
	}

	return ValidateGuessResponse{
		State:            updatedState.State,
		EncryptedState:   freshlyEncryptedState,
		Correct:          correct,
		Victory:          victory,
		PenaltyInSeconds: penaltySeconds,
	}, nil
}

func (c Controller) handleCorrectGuess(ctx context.Context, session GameSession) (GameSession, bool, error) {
	progress := session.State.Progress
	currentWord := session.Chain[progress]

	var victory bool
	session.State.RevealedChain[progress] = currentWord

	progress++
	session.State.Progress = progress
	victory = progress == len(session.Chain)
	if !victory {
		session.State.RevealedChain[progress] = ConcealWord(session.Chain[progress], 1)
	}

	return session, victory, nil
}

func (c Controller) handleIncorrectGuess(ctx context.Context, session GameSession) (GameSession, error) {
	progress := session.State.Progress
	currentWord := session.Chain[progress]

	revealedLetters := CountRevealed(session.State.RevealedChain[progress])
	toReveal := min(len(currentWord)-1, revealedLetters+1)
	session.State.RevealedChain[progress] = ConcealWord(currentWord, toReveal)
	return session, nil
}

// CreateLobby creates a new lobby returns the code to join that lobby
func (c Controller) CreateLobby(ctx context.Context, user types.CommonUser) (string, error) {
	// Generate the lobby code
	var code string
	taken := true
	for taken {
		words := slices.Collect(maps.Keys(c.dictionary))

		codeWords := make([]string, 0, 3)
		for len(codeWords) != cap(codeWords) {
			codeWords = append(codeWords, utils.PickRandom(words))
		}

		code = strings.Join(codeWords, "-")
		err := c.lobbyManager.Create(code, user.UUID)
		taken = err == sse.ErrCodeInUse
	}

	return code, nil
}

func (c Controller) JoinLobby(
	ctx context.Context,
	user types.CommonUser,
	writer http.ResponseWriter,
	code string,
	comms chan string,
) error {
	err := c.lobbyManager.Join(code, user, comms)
	if err != nil {
		return err
	}

	lobby, ok := c.lobbyManager.Get(code)
	if !ok {
		return sse.ErrLobbyNotExist
	}

	connectedUserUUIDs := slices.Collect(maps.Keys(lobby.Users))
	connectedUserUUIDs = utils.Filter(connectedUserUUIDs, func(uuid string) bool { return uuid != user.UUID })
	usersPtr, err := c.federation.GetUsersByUUIDs(ctx, connectedUserUUIDs)
	if err != nil {
		return err
	}
	if usersPtr == nil {
		return errors.New("failed to get connected users")
	}
	users := *usersPtr

	for _, connectedUser := range users {
		message := ConstructPlayerJoinedMessage(connectedUser, connectedUser.UUID == lobby.HostUUID)
		err := c.lobbyManager.Message(code, message, user.UUID)
		if err != nil {
			continue
		}
	}

	// then everyone else know
	message := ConstructPlayerJoinedMessage(user, user.UUID == lobby.HostUUID)
	err = c.lobbyManager.Broadcast(code, message)
	if err != nil {
		return err
	}

	return nil
}

func (c Controller) StartMultiplayerGame(
	ctx context.Context,
	user types.CommonUser,
	code string,
) error {
	lobby, ok := c.lobbyManager.Get(code)
	if !ok {
		// TODO: named error
		return errors.New("lobby does not exist")
	}

	if !lobby.CanStart() {
		// TODO: named error
		return errors.New("lobby is not ready to start")
	}

	// Generate a chain for each player
	chain := GenerateChain(c.dictionary)
	if chain == nil {
		return errors.New("could not generate chain")
	}

	revealed := make([]string, 0, len(chain))
	// Reveal the first word, and the first letter of the next word
	revealed = append(revealed, chain[0])
	revealed = append(revealed, ConcealWord(chain[1], 1))
	for _, word := range chain[2:] {
		revealed = append(revealed, ConcealWord(word, 0))
	}

	createUserStartingData := func(_ string) GameSession {
		userChain := make([]string, len(chain))
		userRevealed := make([]string, len(revealed))

		copy(userChain, chain)
		copy(userRevealed, revealed)

		state := GameState{
			RevealedChain: userRevealed,
			Progress:      1,
		}
		return GameSession{
			State: state,
			Chain: userChain,
		}
	}

	userUUIDs := slices.Collect(maps.Keys(lobby.Users))
	lobby, err := c.lobbyManager.BulkUpdateUserGameData(code, createUserStartingData, userUUIDs...)
	if err != nil {
		return err
	}
	lobby, err = c.lobbyManager.Start(code)
	if err != nil {
		return err
	}

	return c.lobbyManager.Broadcast(
		code,
		ConstructGameStartMessage(createUserStartingData("").State),
	)
}

func (c Controller) LeaveLobby(
	ctx context.Context,
	user types.CommonUser,
	code string,
) error {
	// If the host is leaving, shut down the lobby
	lobby, exists := c.lobbyManager.Get(code)
	if !exists {
		return nil
	}
	if lobby.HostUUID == user.UUID {
		err := c.lobbyManager.ShutDownLobby(code)
		if err == sse.ErrLobbyNotExist {
			return nil
		}
		return err
	}

	nRemaining, err := c.lobbyManager.RemoveFromLobby(code, user)
	if err == sse.ErrLobbyNotExist {
		// Server does not exist, nothing else to do
		return nil
	}
	if err != nil {
		return err
	}

	if nRemaining > 0 {
		return c.lobbyManager.Broadcast(code, ConstructPlayerLeftMessage(user))
	}

	return nil
}

// DisconnectFromLobby disconnects a user from a lobby without removing them
func (c Controller) DisconnectFromLobby(
	ctx context.Context,
	user types.CommonUser,
	code string,
) error {
	err := c.lobbyManager.MarkDisconnected(code, user)
	if err != nil {
		return err
	}

	return c.lobbyManager.Broadcast(code, ConstructPlayerLeftMessage(user))
}

// LobbyExists returns whether or not there is a lobby with the given code
func (c Controller) LobbyExists(code string) (exists bool) {
	_, exists = c.lobbyManager.Get(code)
	return
}

func (c Controller) ProposeRematch(code string, user types.CommonUser) error {
	lobby, exists := c.lobbyManager.Get(code)
	if !exists {
		return sse.ErrLobbyNotExist
	}

	if !lobby.Started() {
		return nil
	}

	return c.lobbyManager.BroadcastExcluding(
		code,
		ConstructProposeRematchMessage(),
		user.UUID,
	)
}

func (c Controller) RespondToRematchProposal(code string, user types.CommonUser, accepted bool) error {
	if accepted {
		_, err := c.lobbyManager.Reset(code)
		if err != nil {
			return err
		}
	}

	return c.lobbyManager.BroadcastExcluding(
		code,
		ConstructRespondRematchMessage(accepted),
		user.UUID,
	)
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
