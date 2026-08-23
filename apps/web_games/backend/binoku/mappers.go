package binoku

import (
	"go-common/utils"
	"math"
	"slices"
)

// FillBoard takes an empty board and fills it with a valid board
func FillBoard(board Board, row, col int) (Board, bool) {
	n := len(board)
	if row == n {
		return board, true
	}

	nextRow := row
	nextCol := col + 1
	if nextCol >= n {
		nextCol = 0
		nextRow++
	}

	// Randomly pick a 0 or 1
	options := []int{0, 1}
	utils.Shuffle(options)
	for _, val := range options {
		if ValueIsValid(board, row, col, val) {
			board[row][col] = val
			if board, ok := FillBoard(board, nextRow, nextCol); ok {
				return board, ok
			}
			// It didn't work, undo move
			board[row][col] = Empty
		}
	}

	return nil, false
}

// ValueIsValid validates if the provided value is valid in the
// given cell
func ValueIsValid(toValidate [][]int, row, col, val int) bool {
	board := CloneBoard(toValidate)
	board[row][col] = val
	isValid, _, _ := BoardIsValid(board)
	return isValid
}

// BoardIsValid verifies if the given board is valid.
//
// The game has 3 rules:
//  1. There must be an equal number of 1's and 0's in each row/column
//  2. There cannot be more than 2 consecutive values next to each other in each row/column
//  3. There cannot be any identical rows or any identical columns
//
// Returns whether the board is valid as well as the invalid rows
// and invalid columns
func BoardIsValid(board [][]int) (bool, []int, []int) {
	checkRows := func(board [][]int) (bool, []int, []int) {
		for rowI, row := range board {
			if !ValidateRuleOne(row) {
				return false, []int{rowI}, nil
			}

			if !ValidateRuleTwo(row) {
				return false, []int{rowI}, nil
			}

			if isValid, invalidRow := ValidateRuleThree(rowI, board); !isValid {
				return false, []int{rowI, invalidRow}, nil
			}
		}

		return true, nil, nil
	}

	// Transpose the matrix 90 degrees for the column check
	transposed := CloneBoard(board)
	for i := range len(transposed) {
		for j := i + 1; j < len(transposed); j++ {
			temp := transposed[i][j]
			transposed[i][j] = transposed[j][i]
			transposed[j][i] = temp
		}
	}

	rowsAreValid, invalidRows, invalidCols := checkRows(board)
	colsAreValid, otherInvalidCols, otherInvalidRows := checkRows(transposed)

	return rowsAreValid && colsAreValid, append(invalidRows, otherInvalidRows...), append(invalidCols, otherInvalidCols...)
}

// ValidateRuleOne validates the first rule: there must be an
// equal number of 1's and 0's in each row/column
func ValidateRuleOne(row []int) bool {
	rowZeroes, rowOnes := 0, 0
	for _, v := range row {
		if v == 0 {
			rowZeroes++
		}
		if v == 1 {
			rowOnes++
		}
	}

	return rowZeroes <= len(row)/2 && rowOnes <= len(row)/2
}

// ValidateRuleTwo validates the second rule: there cannot be more than
// 2 consecutive values next to each other in each row/col
func ValidateRuleTwo(row []int) bool {
	for i, v := range row {
		if i < 2 || v < 0 {
			continue
		}

		if v == row[i-1] && v == row[i-2] {
			return false
		}
	}

	return true
}

// ValidateRuleThree validates the third rule: there cannot be any
// identical rows/cols
//
// If rule 3 is violated, returns the index of the row that is
// identical to the provided row index
func ValidateRuleThree(rowIndex int, board [][]int) (bool, int) {
	// If a row has any empty spaces, it can't duplicate another row
	// because we don't know what the user is going to put in that space
	hasEmpty := func(row []int) bool {
		return utils.Any(row, func(v int) bool { return v == Empty })
	}

	target := board[rowIndex]
	if hasEmpty(target) {
		return true, -1
	}

	for i, row := range board {
		if i == rowIndex {
			continue
		}
		if hasEmpty(row) {
			continue
		}

		if slices.Equal(row, target) {
			return false, i
		}
	}

	return true, -1
}

// CloneBoard creates a clone of the board
func CloneBoard(board Board) Board {
	clone := make([][]int, 0, len(board))
	for _, row := range board {
		clone = append(clone, slices.Clone(row))
	}
	return clone
}

// ThinBoard removes values from the given board until
// the most number of values have been removed and the board
// is still uniquely solvable
func ThinBoard(board [][]int) [][]int {
	half := len(board) / 2
	// To minimize going down bad routes and for a better user
	// experience, we will attempt to take an equal number
	// of spaces from each quadrant. To do this, we'll visit the
	// quadrants in a round-robin fashion
	topLeft := make([]Coordinate, 0, half)
	topRight := make([]Coordinate, 0, half)
	bottomLeft := make([]Coordinate, 0, half)
	bottomRight := make([]Coordinate, 0, half)

	for row := range len(board) {
		for col := range len(board) {
			coord := Coordinate{Row: row, Col: col}

			top := row < half
			left := col < half
			if top && left {
				topLeft = append(topLeft, coord)
			} else if top {
				topRight = append(topRight, coord)
			} else if left {
				bottomLeft = append(bottomLeft, coord)
			} else {
				bottomRight = append(bottomRight, coord)
			}
		}
	}
	// Shuffle to make sure we're visiting cells randomly
	utils.Shuffle(topLeft)
	utils.Shuffle(topRight)
	utils.Shuffle(bottomLeft)
	utils.Shuffle(bottomRight)

	// Merge them into a single copy so we can visit the cells
	// easily
	quadrants := [][]Coordinate{topLeft, topRight, bottomLeft, bottomRight}
	coords := utils.NewStack[Coordinate]()
	for i := range len(board) * len(board) {
		quadrant := quadrants[i%4]
		if len(quadrant) == 0 {
			continue
		}

		coords.Push(quadrant[0])
		quadrant = quadrant[1:]
		quadrants[i%4] = quadrant
	}

	emptySpaces := utils.NewStack[Coordinate]()

	// We can remove the first space since there's nothing to
	// solve for
	coord := coords.Pop()
	board[coord.Row][coord.Col] = Empty
	emptySpaces.Push(coord)

	// Remove spaces in batches to speed up computation
	batchSize := 3
	maxItr := 1000
	itr := 0
	targetRemoved := float32(len(board)*len(board)) * 0.3
	for float32(coords.Size()) > targetRemoved && itr < maxItr {
		itr++

		// Step 1: remove spaces batchSize at a time
		removedValues := map[Coordinate]int{}
		toRemove := int(math.Min(float64(coords.Size()), float64(batchSize)))
		recentlyRemoved := utils.NewStack[Coordinate]()
		for range toRemove {
			coord := coords.Pop()
			emptySpaces.Push(coord)
			removedValues[coord] = board[coord.Row][coord.Col]
			board[coord.Row][coord.Col] = Empty
			recentlyRemoved.Push(coord)
		}

		// Step 2: Check if the board is still uniquely solvable with
		// these pieces removed
		isUniquelySolvable := func(board Board, emptySpaces utils.Stack[Coordinate]) bool {
			return CountSolutions(board, emptySpaces, 0) == 1
		}
		if !isUniquelySolvable(board, emptySpaces) {
			foundUnique := false
			for range batchSize {
				coord := emptySpaces.Pop()
				v := removedValues[coord]
				coords.Push(coord)

				board[coord.Row][coord.Col] = v

				if isUniquelySolvable(board, emptySpaces) {
					foundUnique = true
					break
				}
			}

			if !foundUnique || itr > maxItr-3 {
				return board
			}
		}
	}

	return board
}

func CountSolutions(board Board, emptySpaces utils.Stack[Coordinate], count int) int {
	if emptySpaces.Size() == 0 {
		return count + 1
	}
	if count > 1 {
		return count
	}

	coord := emptySpaces.Pop()

	if ValueIsValid(board, coord.Row, coord.Col, 0) {
		board[coord.Row][coord.Col] = 0
		count = CountSolutions(board, emptySpaces, count)
		board[coord.Row][coord.Col] = Empty // backtrack
	}

	if count <= 1 && ValueIsValid(board, coord.Row, coord.Col, 1) {
		board[coord.Row][coord.Col] = 1
		count = CountSolutions(board, emptySpaces, count)
		board[coord.Row][coord.Col] = Empty // backtrack
	}

	emptySpaces.Push(coord)
	return count
}
