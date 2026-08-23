package binoku

import (
	"context"
	"jeffs-web-games/binoku"
)

// Controller represents a binoku controller
type Controller interface {
	GenerateBoard(context.Context, int) (binoku.Board, error)
	ValidateGuess(context.Context, binoku.Board) (bool, []int, []int, error)
}
