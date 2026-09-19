package main

import (
	"go-common/utils"
	"strings"
)

// The file contains our list of available fat bears //

var (
	Bear132 = Bear{ID: 132}
	Bear284 = Bear{ID: 284}
	Bear806 = Bear{ID: 806}
	Bear901 = Bear{ID: 901}
	Bear909 = Bear{ID: 909}
	Bear428 = Bear{ID: 428, Nickname: "Studious"}
	Bear131 = Bear{ID: 131}
	Bear910 = Bear{ID: 910}
	Bear694 = Bear{ID: 694}
	Bear620 = Bear{ID: 620}
	Bear610 = Bear{ID: 610}
	Bear89  = Bear{ID: 89, Nickname: "Backpack"}
	Bear32  = Bear{ID: 32, Nickname: "Chunk"}
	Bear164 = Bear{ID: 164, Nickname: "Bucky"}
	Bear151 = Bear{ID: 151, Nickname: "Walker"}
	Bear903 = Bear{ID: 903, Nickname: "Gully"}
)

// AvailableBears represents all available bears
var AvailableBears = utils.NewSet(
	Bear32, Bear89, Bear131, Bear132, Bear151,
	Bear164, Bear284, Bear428, Bear610, Bear620,
	Bear694, Bear806, Bear901, Bear903, Bear909,
	Bear910,
)

// CodeDictionary are the available words to create codes from
var CodeDictionary = []string{
	"chunky",
	"round",
	"plump",
	"hefty",
	"massive",
	"burly",
	"stout",
	"thick",
	"gigantic",
	"bulking",
	"husky",
	"solid",
	"blubbery",
	"pudgy",
	"rotund",
	"beefy",
	"tubby",
	"substantial",
	"colossal",
	"gargantuan",
	"immense",
	"hulking",
	"mammoth",
	"portly",
	"squashy",
	"doughy",
	"fleshy",
	"wide",
	"broad",
	"giant",
	"jumbo",
	"lardy",
	"meaty",
	"overgrown",
	"stocky",
	"brawny",
	"dense",
	"imposing",
	"mighty",
	"robust",
	"sturdy",
	"ponderous",
}

// GenerateCode generates a new tournament code
func GenerateCode() string {
	codeWords := utils.NewSet[string]()
	for codeWords.Size() < 3 {
		word := utils.PickRandom(CodeDictionary)
		if codeWords.Has(word) {
			continue
		}

		codeWords.Add(word)
	}

	return strings.Join(codeWords.ToSlice(), "-")
}
