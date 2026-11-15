package word_chain

import (
	"context"
	"go-common/jcontext"
	"go-common/jhttp"
	"go-common/jhttp/errors"
	"go-common/jhttp/sse"
	"go-common/jlogging"
	"jeffs-web-games/stats"
	"jeffs-web-games/word_chain"
	"strings"
)

const sseNamespace = "word_chain"

type Handler struct {
	controller word_chain.Controller
	stats      stats.Controller
	logger     jlogging.Logger
}

func NewHandler(
	controller word_chain.Controller,
	statsController stats.Controller,
	logger jlogging.Logger,
) Handler {
	return Handler{
		controller: controller,
		stats:      statsController,
		logger:     logger,
	}
}

// NewGame creates a new word chain game
func (h Handler) NewGame(ctx context.Context, _ jhttp.RequestData[struct{}]) (*word_chain.GamePackage, *errors.JHTTPError) {
	logger := h.logger.WithField("action", "newGame")

	game, err := h.controller.NewSingleplayerGame(ctx)
	if err != nil {
		logger.WithError(err).Error("failed to create new game")
		return nil, errors.NewInternalServerError(err)
	}
	logger = logger.WithField("game", game)

	user, userPresent := jcontext.GetUser(ctx)
	if userPresent {
		logger = logger.WithField(jlogging.UserUUIDLogLabel, user.UUID)
		_, err = h.stats.UpdateGameStats(ctx, user, stats.GameNameWordChain, stats.TypePlayed)
		// Don't blow up the whole request because we failed to record the stats... we should just
		// log the error
		if err != nil {
			logger.WithError(err).Error("failed to update user's game stats")
		}
	}

	logger.Info("created new game")
	return &game, nil
}

func (h Handler) ValidateGuess(ctx context.Context, r jhttp.RequestData[word_chain.ValidateGuessRequest]) (*word_chain.ValidateGuessResponse, *errors.JHTTPError) {
	logger := h.logger.WithField("action", "validateGuess")

	isMultiplayer := r.Body.LobbyCode != ""
	user, userIsPresent := jcontext.GetUser(ctx)
	if isMultiplayer && !userIsPresent {
		return nil, errors.NewUnauthorizedError()
	}

	if r.Body == nil {
		return nil, errors.NewBadRequestError("Bad request")
	}
	if word_chain.CleanWord(r.Body.Guess) == "" {
		return nil, errors.NewBadRequestError("Guess is required")
	}
	if strings.TrimSpace(r.Body.EncryptedState) == "" && strings.TrimSpace(r.Body.LobbyCode) == "" {
		return nil, errors.NewBadRequestError("Bad request")
	}
	logger.WithField("guess", r.Body.Guess)

	response, err := h.controller.ValidateGuess(ctx, *r.Body, user)
	if err != nil {
		logger.WithError(err).Error("failed to validate guess")
		return nil, errors.NewInternalServerError(err)
	}

	user, userPresent := jcontext.GetUser(ctx)
	if userPresent && response.Victory {
		logger = logger.WithField(jlogging.UserUUIDLogLabel, user.UUID)
		logger.Info("user made guess")
		_, err = h.stats.UpdateGameStats(ctx, user, stats.GameNameWordChain, stats.TypeCompleted)
		// Don't blow up the whole request because we failed to record the stats... we should just
		// log the error
		if err != nil {
			logger.WithError(err).Error("failed to update user stats")
		}
	}

	return &response, nil
}

func (h Handler) CreateLobby(ctx context.Context, r jhttp.RequestData[struct{}]) (*CreateLobbyResponse, *errors.JHTTPError) {
	user, userIsPresent := jcontext.GetUser(ctx)
	if !userIsPresent {
		return nil, errors.NewUnauthorizedError()
	}

	code, err := h.controller.CreateLobby(ctx, user)
	if err != nil {
		return nil, errors.NewInternalServerError(err)
	}

	return &CreateLobbyResponse{Code: code}, nil
}

func (h Handler) JoinLobby(ctx context.Context, r jhttp.RequestData[struct{}]) (*struct{}, *errors.JHTTPError) {
	user, userIsPresent := jcontext.GetUser(ctx)
	if !userIsPresent {
		return nil, errors.NewUnauthorizedError()
	}

	code, ok := r.PathValues[LobbyCodePathVar]
	if !ok {
		return nil, errors.NewBadRequestError("Code is required")
	}
	if len(strings.Split(code, "-")) != 3 {
		return nil, errors.NewBadRequestError("Invalid code")
	}

	if r.Writer == nil {
		return nil, errors.NewInternalServerError(nil)
	}

	if !h.controller.LobbyExists(code) {
		return nil, errors.NewNotFoundError(code)
	}

	handle, comms, httpErr := sse.HandleNewConnection(ctx, r.Writer)
	if httpErr != nil {
		return nil, httpErr
	}

	err := h.controller.JoinLobby(ctx, user, *r.Writer, code, comms)
	if err == sse.ErrLobbyNotExist {
		return nil, errors.NewNotFoundError(code)
	}

	handle()

	// TODO: log error
	h.controller.DisconnectFromLobby(ctx, user, code)
	return nil, nil
}

func (h Handler) LeaveLobby(ctx context.Context, r jhttp.RequestData[struct{}]) (*struct{}, *errors.JHTTPError) {
	user, userIsPresent := jcontext.GetUser(ctx)
	if !userIsPresent {
		return nil, errors.NewUnauthorizedError()
	}

	code, ok := r.PathValues[LobbyCodePathVar]
	if !ok {
		return nil, errors.NewBadRequestError("Code is required")
	}
	if len(strings.Split(code, "-")) != 3 {
		return nil, errors.NewBadRequestError("Invalid code")
	}

	err := h.controller.LeaveLobby(ctx, user, code)
	if err != nil {
		return nil, errors.NewInternalServerError(err)
	}

	return nil, nil
}

func (h Handler) StartLobby(ctx context.Context, r jhttp.RequestData[struct{}]) (*struct{}, *errors.JHTTPError) {
	user, userIsPresent := jcontext.GetUser(ctx)
	if !userIsPresent {
		return nil, errors.NewUnauthorizedError()
	}

	code, ok := r.PathValues[LobbyCodePathVar]
	if !ok {
		return nil, errors.NewBadRequestError("Code is required")
	}
	if len(strings.Split(code, "-")) != 3 {
		return nil, errors.NewBadRequestError("Invalid code")
	}

	err := h.controller.StartMultiplayerGame(ctx, user, code)
	if err != nil {
		return nil, errors.NewInternalServerError(err)
	}

	return nil, nil
}

func (h Handler) ProposeRematch(ctx context.Context, r jhttp.RequestData[struct{}]) (*struct{}, *errors.JHTTPError) {
	user, userIsPresent := jcontext.GetUser(ctx)
	if !userIsPresent {
		return nil, errors.NewUnauthorizedError()
	}

	code, ok := r.PathValues[LobbyCodePathVar]
	if !ok {
		return nil, errors.NewBadRequestError("Code is required")
	}
	if len(strings.Split(code, "-")) != 3 {
		return nil, errors.NewBadRequestError("Invalid code")
	}

	err := h.controller.ProposeRematch(code, user)
	if err == sse.ErrLobbyNotExist {
		return nil, errors.NewNotFoundError(code)
	}
	if err != nil {
		return nil, errors.NewInternalServerError(err)
	}

	return nil, nil
}

func (h Handler) RespondToRematchProposal(ctx context.Context, r jhttp.RequestData[RespondToRematchProposalRequest]) (*struct{}, *errors.JHTTPError) {
	user, userIsPresent := jcontext.GetUser(ctx)
	if !userIsPresent {
		return nil, errors.NewUnauthorizedError()
	}

	code, ok := r.PathValues[LobbyCodePathVar]
	if !ok {
		return nil, errors.NewBadRequestError("Code is required")
	}
	if len(strings.Split(code, "-")) != 3 {
		return nil, errors.NewBadRequestError("Invalid code")
	}

	err := h.controller.RespondToRematchProposal(code, user, r.Body.Accepted)
	if err == sse.ErrLobbyNotExist {
		return nil, errors.NewNotFoundError(code)
	}
	if err != nil {
		return nil, errors.NewInternalServerError(err)
	}

	return nil, nil
}
