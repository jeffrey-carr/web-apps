package word_chain

import (
	"context"
	"go-common/jcontext"
	"go-common/jhttp"
	"go-common/jhttp/errors"
	"go-common/jlogging"
	"jeffs-web-games/stats"
	"jeffs-web-games/word_chain"
	"strings"
)

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

	game, err := h.controller.NewGame(ctx)
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

	if r.Body == nil {
		return nil, errors.NewBadRequestError("Bad request")
	}
	if word_chain.CleanWord(r.Body.Guess) == "" {
		return nil, errors.NewBadRequestError("Guess is required")
	}
	if strings.TrimSpace(r.Body.EncryptedState) == "" {
		return nil, errors.NewBadRequestError("Game state is required")
	}
	logger.WithField("guess", r.Body.Guess)

	response, err := h.controller.ValidateGuess(ctx, *r.Body)
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
