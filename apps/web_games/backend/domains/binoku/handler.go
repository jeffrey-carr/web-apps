package binoku

import (
	"context"
	"go-common/jcontext"
	"go-common/jhttp"
	"go-common/jhttp/errors"
	"jeffs-web-games/binoku"
	"jeffs-web-games/stats"
	"strconv"
)

type Handler struct {
	controller Controller
	stats      stats.Controller
}

func NewHandler(controller Controller, statsController stats.Controller) Handler {
	return Handler{
		controller: controller,
		stats:      statsController,
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

	if size%2 != 0 {
		return nil, errors.NewBadRequestError("Board size must be an even number")
	}

	if size < 4 || size > 10 {
		return nil, errors.NewBadRequestError("Board size must be between 4 and 10")
	}

	board, err := h.controller.GenerateBoard(ctx, size)
	if err != nil {
		return nil, errors.NewInternalServerError(err)
	}

	user, userPresent := jcontext.GetUser(ctx)
	if userPresent {
		_, err = h.stats.UpdateGameStats(ctx, user, stats.GameNameBinoku, stats.TypePlayed)
		// Don't blow up the whole request because we failed to record the stats... we should just
		// log the error
		if err != nil {
			// TODO: log
		}
	}

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

	isValid, invalidRows, invalidCols, err := h.controller.ValidateGuess(ctx, *r.Body)
	if err != nil {
		return nil, errors.NewInternalServerError(err)
	}

	user, userPresent := jcontext.GetUser(ctx)
	if userPresent && isValid {
		_, err = h.stats.UpdateGameStats(ctx, user, stats.GameNameBinoku, stats.TypeCompleted)
		// Don't blow up the whole request because we failed to record the stats... we should just
		// log the error
		if err != nil {
			// TODO: log
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
