package main

import "go-common/utils"

func validateChoices(node BracketTree[Bear], depth int) bool {
	if !nodeIsValid(node) {
		return false
	}

	if depth > BracketDepth {
		return false
	}

	leftValid := true
	if left := node.Left; left != nil {
		leftValid = validateChoices(*left, depth+1)
	}
	rightValid := true
	if right := node.Right; right != nil {
		rightValid = validateChoices(*right, depth+1)
	}

	return leftValid && rightValid
}

func nodeIsValid(node BracketTree[Bear]) bool {
	// The rules we need to validate
	var matchesChild, childrenDiffer bool

	// if leaf node, we don't need to validate
	leftIsNil := node.Left == nil
	rightIsNil := node.Right == nil
	if leftIsNil && rightIsNil {
		return true
	}

	leftValue := utils.Deref(node.Left).Winner
	rightValue := utils.Deref(node.Right).Winner

	if node.Winner.ID == 0 {
		return true
	}

	if node.Winner.ID == leftValue.ID ||
		node.Winner.ID == rightValue.ID {
		matchesChild = true
	}

	// Do the children differ?
	if leftValue.ID != rightValue.ID ||
		leftValue.ID == 0 || rightValue.ID == 0 {
		childrenDiffer = true
	}

	return matchesChild && childrenDiffer
}

func scoreChoices(choices, golden *BracketTree[Bear], depth int) int {
	if choices == nil || golden == nil || depth >= BracketDepth {
		return 0
	}

	var score int
	if golden.Winner.ID != 0 && choices.Winner.ID == golden.Winner.ID {
		score = 1 << (3 - depth)
	}

	leftScore := scoreChoices(choices.Left, golden.Left, depth+1)
	rightScore := scoreChoices(choices.Right, golden.Right, depth+1)

	return score + leftScore + rightScore
}
