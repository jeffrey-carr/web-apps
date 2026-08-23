package word_chain

import (
	"context"
	"fmt"
	"go-common/jcontext"
	"go-common/jhttp"
	"go-common/jhttp/errors"
	"jeffs-web-games/stats"
	"jeffs-web-games/word_chain"
	"strings"
)

type Handler struct {
	controller word_chain.Controller
	stats      stats.Controller
}

func NewHandler(controller word_chain.Controller, statsController stats.Controller) Handler {
	return Handler{
		controller: controller,
		stats:      statsController,
	}
}

// NewGame creates a new word chain game
func (h Handler) NewGame(ctx context.Context, _ jhttp.RequestData[struct{}]) (*word_chain.GamePackage, *errors.JHTTPError) {
	game, err := h.controller.NewGame(ctx)
	if err != nil {
		return nil, errors.NewInternalServerError(err)
	}

	user, userPresent := jcontext.GetUser(ctx)
	if userPresent {
		_, err = h.stats.UpdateGameStats(ctx, user, stats.GameNameWordChain, stats.TypePlayed)
		// Don't blow up the whole request because we failed to record the stats... we should just
		// log the error
		if err != nil {
			// TODO: log
		}
	}

	return &game, nil
}

func (h Handler) ValidateGuess(ctx context.Context, r jhttp.RequestData[word_chain.ValidateGuessRequest]) (*word_chain.ValidateGuessResponse, *errors.JHTTPError) {
	if r.Body == nil {
		return nil, errors.NewBadRequestError("Bad request")
	}
	if word_chain.CleanWord(r.Body.Guess) == "" {
		return nil, errors.NewBadRequestError("Guess is required")
	}
	if strings.TrimSpace(r.Body.EncryptedState) == "" {
		return nil, errors.NewBadRequestError("Game state is required")
	}

	fmt.Printf("Validating word chain guess \"%s\"...\n", r.Body.Guess)
	response, err := h.controller.ValidateGuess(ctx, *r.Body)
	if err != nil {
		return nil, errors.NewInternalServerError(err)
	}

	user, userPresent := jcontext.GetUser(ctx)
	if userPresent && response.Victory {
		_, err = h.stats.UpdateGameStats(ctx, user, stats.GameNameWordChain, stats.TypeCompleted)
		// Don't blow up the whole request because we failed to record the stats... we should just
		// log the error
		if err != nil {
			// TODO: log
		}
	}

	return &response, nil
}
