package binoku

import (
	"context"
	"errors"
	"go-common/utils"
)

type Controller struct{}

func NewController() Controller {
	return Controller{}
}

func (c Controller) GenerateBoard(_ context.Context, size int) (Board, error) {
	board := make([][]int, size)

	// Fill with empty spaces
	for rowI := range size {
		row := make([]int, size)

		for colI := range size {
			row[colI] = Empty
		}

		board[rowI] = row
	}

	var success bool
	board, success = FillBoard(board, 0, 0)
	if !success {
		return nil, errors.New("error generating board")
	}

	return ThinBoard(board), nil
}

// ValidateGuess takes in a board and returns whether or not it is
// valid, which rows are invalid, and which columns are invalid
func (c Controller) ValidateGuess(_ context.Context, guess Board) (bool, []int, []int, error) {
	for rowI, row := range guess {
		// Validate there are no empty spaces
		for colI, v := range row {
			if v == Empty {
				return false, []int{rowI}, []int{colI}, nil
			}
		}
		hasEmpty := utils.Any(row, func(v int) bool {
			return v == Empty
		})
		if hasEmpty {
			return false, nil, nil, nil
		}
	}

	isValid, badRows, badCols := BoardIsValid(guess)
	return isValid, badRows, badCols, nil
}
