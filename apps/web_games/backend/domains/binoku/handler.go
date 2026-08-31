package binoku

import (
	"context"
	"go-common/jcontext"
	"go-common/jhttp"
	"go-common/jhttp/errors"
	"go-common/jlogging"
	"jeffs-web-games/binoku"
	"jeffs-web-games/stats"
	"strconv"

	"github.com/sirupsen/logrus"
)

type Handler struct {
	controller Controller
	stats      stats.Controller
	logger     jlogging.Logger
}

func NewHandler(controller Controller, statsController stats.Controller, logger jlogging.Logger) Handler {
	return Handler{
		controller: controller,
		stats:      statsController,
		logger:     logger,
	}
}

func parseInt(str string) (int, error) {
	i64, err := strconv.ParseInt(str, 10, 64)
	return int(i64), err
}

func (h Handler) NewGame(ctx context.Context, r jhttp.RequestData[struct{}]) (*binoku.Board, *errors.JHTTPError) {
	size := 4
	sizeQuery := r.Query.Get("size")
	if sizeQuery != "" {
		requestedSize, err := parseInt(sizeQuery)
		if err == nil {
			size = requestedSize
		}
	}
	logger := h.logger.WithFields(logrus.Fields{
		"action": "newGame",
		"size":   size,
	})

	if size%2 != 0 {
		logger.Error("size is invalid: not even")
		return nil, errors.NewBadRequestError("Board size must be an even number")
	}

	if size < 4 || size > 10 {
		logger.Error("size is invalid: not between 4 and 10")
		return nil, errors.NewBadRequestError("Board size must be between 4 and 10")
	}

	board, err := h.controller.GenerateBoard(ctx, size)
	if err != nil {
		logger.WithError(err).Error("error generating board")
		return nil, errors.NewInternalServerError(err)
	}

	user, userPresent := jcontext.GetUser(ctx)
	if userPresent {
		logger = logger.WithField(jlogging.UserUUIDLogLabel, user.UUID)
		_, err = h.stats.UpdateGameStats(ctx, user, stats.GameNameBinoku, stats.TypePlayed)
		// Don't blow up the whole request because we failed to record the stats... we should just
		// log the error
		if err != nil {
			logger.WithError(err).Error("failed to update user's game stats")
		}
	}

	logger.Info("created new binoku board")
	return &board, nil
}

// ValidateBoard validates that a board is correct
func (h Handler) ValidateBoard(ctx context.Context, r jhttp.RequestData[binoku.Board]) (*ValidateBoardResponse, *errors.JHTTPError) {
	if r.Body == nil {
		return nil, errors.NewBadRequestError("Board is required for validation")
	}
	if err := ValidateBoardIsNotMalformed(*r.Body); err != nil {
		return nil, errors.NewBadRequestError(err.Error())
	}
	logger := h.logger.WithField("board", r.Body)

	isValid, invalidRows, invalidCols, err := h.controller.ValidateGuess(ctx, *r.Body)
	if err != nil {
		logger.WithError(err).Error("error validating guess")
		return nil, errors.NewInternalServerError(err)
	}
	logger = logger.WithField("isValid", isValid)

	user, userPresent := jcontext.GetUser(ctx)
	if userPresent && isValid {
		logger = logger.WithField(jlogging.UserUUIDLogLabel, user.UUID)
		logger.Info("user made guess")
		_, err = h.stats.UpdateGameStats(ctx, user, stats.GameNameBinoku, stats.TypeCompleted)
		// Don't blow up the whole request because we failed to record the stats... we should just
		// log the error
		if err != nil {
			logger.WithError(err).Error("failed to update user's game stats")
		}
	}

	return &ValidateBoardResponse{
		Valid: isValid,
		Hint: InvalidBoardHint{
			Rows: invalidRows,
			Cols: invalidCols,
		},
	}, nil
}
