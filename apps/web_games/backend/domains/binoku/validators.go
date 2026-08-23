package binoku

import (
	"errors"
	"go-common/utils"
	"jeffs-web-games/binoku"
)

func ValidateBoardIsNotMalformed(board binoku.Board) error {
	// Validate board is square
	isNotSquare := utils.Any(board, func(row []int) bool {
		return len(row) != len(board)
	})
	if isNotSquare {
		return errors.New("board is not square")
	}

	return nil
}
