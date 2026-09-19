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

func scoreChoices(choices, golden *BracketTree[Bear], depth int) int {
	if choices == nil || golden == nil || depth >= BracketDepth {
		return 0
	}

	var score int
	if golden.Winner.ID != 0 && choices.Winner.ID == golden.Winner.ID {
		score = 8 - (2 * depth)
	}

	leftScore := scoreChoices(choices.Left, golden.Left, depth+1)
	rightScore := scoreChoices(choices.Right, golden.Right, depth+1)

	return score + leftScore + rightScore
}

func main() {
	userJSON := `{
        "winner": { "id": 910, "nickname": "" },
        "left": {
            "winner": { "id": 910, "nickname": "" },
            "left": {
                "winner": { "id": 901, "nickname": "" },
                "left": { "winner": { "id": 284, "nickname": "" }, "left": null, "right": null },
                "right": { "winner": { "id": 901, "nickname": "" }, "left": null, "right": null }
            },
            "right": {
                "winner": { "id": 910, "nickname": "" },
                "left": { "winner": { "id": 909, "nickname": "" }, "left": null, "right": null },
                "right": { "winner": { "id": 910, "nickname": "" }, "left": null, "right": null }
            }
        },
        "right": {
            "winner": { "id": 694, "nickname": "" },
            "left": {
                "winner": { "id": 694, "nickname": "" },
                "left": { "winner": { "id": 694, "nickname": "" }, "left": null, "right": null },
                "right": { "winner": { "id": 610, "nickname": "" }, "left": null, "right": null }
            },
            "right": {
                "winner": { "id": 903, "nickname": "Gully" },
                "left": { "winner": { "id": 32, "nickname": "Chunk" }, "left": null, "right": null },
                "right": { "winner": { "id": 903, "nickname": "Gully" }, "left": null, "right": null }
            }
        }
    }`

	goldenJSON := `{
      "winner": { "id": 0, "nickname": "" },
      "left": {
        "winner": { "id": 0, "nickname": "" },
        "left": {
          "winner": { "id": 0, "nickname": "" },
          "left": {
            "winner": { "id": 132, "nickname": "" },
            "left": { "winner": { "id": 132, "nickname": "" }, "left": null, "right": null },
            "right": { "winner": { "id": 284, "nickname": "" }, "left": null, "right": null }
          },
          "right": {
            "winner": { "id": 901, "nickname": "" },
            "left": { "winner": { "id": 806, "nickname": "" }, "left": null, "right": null },
            "right": { "winner": { "id": 901, "nickname": "" }, "left": null, "right": null }
          }
        },
        "right": {
          "winner": { "id": 0, "nickname": "" },
          "left": {
            "winner": { "id": 909, "nickname": "" },
            "left": { "winner": { "id": 909, "nickname": "" }, "left": null, "right": null },
            "right": { "winner": { "id": 428, "nickname": "" }, "left": null, "right": null }
          },
          "right": {
            "winner": { "id": 910, "nickname": "" },
            "left": { "winner": { "id": 131, "nickname": "" }, "left": null, "right": null },
            "right": { "winner": { "id": 910, "nickname": "" }, "left": null, "right": null }
          }
        }
      },
      "right": {
        "winner": { "id": 0, "nickname": "" },
        "left": {
          "winner": { "id": 0, "nickname": "" },
          "left": {
            "winner": { "id": 620, "nickname": "" },
            "left": { "winner": { "id": 694, "nickname": "" }, "left": null, "right": null },
            "right": { "winner": { "id": 620, "nickname": "" }, "left": null, "right": null }
          },
          "right": {
            "winner": { "id": 89, "nickname": "Backpack" },
            "left": { "winner": { "id": 610, "nickname": "" }, "left": null, "right": null },
            "right": { "winner": { "id": 89, "nickname": "" }, "left": null, "right": null }
          }
        },
        "right": {
          "winner": { "id": 0, "nickname": "" },
          "left": {
            "winner": { "id": 164, "nickname": "Bucky" },
            "left": { "winner": { "id": 32, "nickname": "" }, "left": null, "right": null },
            "right": { "winner": { "id": 164, "nickname": "" }, "left": null, "right": null }
          },
          "right": {
            "winner": { "id": 151, "nickname": "Walker" },
            "left": { "winner": { "id": 151, "nickname": "" }, "left": null, "right": null },
            "right": { "winner": { "id": 903, "nickname": "" }, "left": null, "right": null }
          }
        }
      }
    }`

	var userTree, goldenTree BracketTree[Bear]
	json.Unmarshal([]byte(userJSON), &userTree)
	json.Unmarshal([]byte(goldenJSON), &goldenTree)

	score := scoreChoices(&userTree, &goldenTree, 0)
	fmt.Println("Score:", score)
}
