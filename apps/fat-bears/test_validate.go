package main

import (
	"encoding/json"
	"fmt"
)

type Bear struct {
	ID       int    `json:"id"`
	Nickname string `json:"nickname"`
}

type BracketTree[T any] struct {
	Winner T               `json:"winner" bson:"winner"`
	Left   *BracketTree[T] `json:"left" bson:"left"`
	Right  *BracketTree[T] `json:"right" bson:"right"`
}

var BracketDepth = 4

func utilsDeref[T any](ptr *T) T {
	if ptr == nil {
		var zero T
		return zero
	}
	return *ptr
}

func nodeIsValid(node BracketTree[Bear]) bool {
	var matchesChild, childrenDiffer bool
	leftIsNil := node.Left == nil
	rightIsNil := node.Right == nil
	if leftIsNil && rightIsNil {
		return true
	}

	leftValue := utilsDeref(node.Left).Winner
	rightValue := utilsDeref(node.Right).Winner

	if node.Winner.ID == 0 {
		return true
	}

	if node.Winner.ID == leftValue.ID ||
		node.Winner.ID == rightValue.ID {
		matchesChild = true
	}

	if leftValue.ID != rightValue.ID ||
		leftIsNil || rightIsNil || (leftValue.ID == 0 && rightValue.ID == 0) {
		childrenDiffer = true
	}

	return matchesChild && childrenDiffer
}

func validateChoices(node BracketTree[Bear], depth int) bool {
	if !nodeIsValid(node) {
		fmt.Printf("nodeIsValid false at depth %d: %+v\n", depth, node.Winner)
		return false
	}

	depth++
	if depth > BracketDepth {
		fmt.Printf("depth > BracketDepth at depth %d (BracketDepth %d): %+v\n", depth, BracketDepth, node.Winner)
		return false
	}

	leftValid := true
	if left := node.Left; left != nil {
		leftValid = validateChoices(*left, depth)
	}
	rightValid := true
	if right := node.Right; right != nil {
		rightValid = validateChoices(*right, depth)
	}

	return leftValid && rightValid
}

func main() {
	userJSON := `{
		"winner":{"id":903,"nickname":"Gully"},
		"left":{
			"winner":{"id":428,"nickname":""},
			"left":{
				"winner":{"id":806,"nickname":""},
				"left":{
					"winner":{"id":132,"nickname":""},
					"left":{"winner":{"id":132,"nickname":""},"left":null,"right":null},
					"right":{"winner":{"id":284,"nickname":""},"left":null,"right":null}
				},
				"right":{
					"winner":{"id":806,"nickname":""},
					"left":{"winner":{"id":806,"nickname":""},"left":null,"right":null},
					"right":{"winner":{"id":901,"nickname":""},"left":null,"right":null}
				}
			},
			"right":{
				"winner":{"id":428,"nickname":""},
				"left":{
					"winner":{"id":428,"nickname":""},
					"left":{"winner":{"id":909,"nickname":""},"left":null,"right":null},
					"right":{"winner":{"id":428,"nickname":""},"left":null,"right":null}
				},
				"right":{
					"winner":{"id":910,"nickname":""},
					"left":{"winner":{"id":131,"nickname":""},"left":null,"right":null},
					"right":{"winner":{"id":910,"nickname":""},"left":null,"right":null}
				}
			}
		},
		"right":{
			"winner":{"id":903,"nickname":"Gully"},
			"left":{
				"winner":{"id":89,"nickname":"Backpack"},
				"left":{
					"winner":{"id":620,"nickname":""},
					"left":{"winner":{"id":694,"nickname":""},"left":null,"right":null},
					"right":{"winner":{"id":620,"nickname":""},"left":null,"right":null}
				},
				"right":{
					"winner":{"id":89,"nickname":"Backpack"},
					"left":{"winner":{"id":610,"nickname":""},"left":null,"right":null},
					"right":{"winner":{"id":89,"nickname":""},"left":null,"right":null}
				}
			},
			"right":{
				"winner":{"id":903,"nickname":"Gully"},
				"left":{
					"winner":{"id":164,"nickname":"Bucky"},
					"left":{"winner":{"id":32,"nickname":""},"left":null,"right":null},
					"right":{"winner":{"id":164,"nickname":""},"left":null,"right":null}
				},
				"right":{
					"winner":{"id":903,"nickname":"Gully"},
					"left":{"winner":{"id":151,"nickname":""},"left":null,"right":null},
					"right":{"winner":{"id":903,"nickname":""},"left":null,"right":null}
				}
			}
		}
	}`

	var userTree BracketTree[Bear]
	json.Unmarshal([]byte(userJSON), &userTree)

	valid := validateChoices(userTree, 0)
	fmt.Println("Valid:", valid)
}
