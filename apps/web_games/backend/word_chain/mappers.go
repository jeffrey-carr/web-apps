package word_chain

import (
	"go-common/utils"
	"maps"
	"slices"
	"strings"
)

func GenerateChain(dictionary map[string][]string) []string {
	lastWord := utils.PickRandom(slices.Collect(maps.Keys(dictionary)))
	usedWords := utils.NewSet(lastWord)
	chain := make([]string, 0, TargetChainLength)

	for len(chain) < TargetChainLength {
		availableWords := dictionary[lastWord]
		potentialNextWord := CleanWord(utils.PickRandom(availableWords))

		if usedWords.Has(potentialNextWord) {
			continue
		}

		usedWords.Add(potentialNextWord)
		chain = append(chain, potentialNextWord)
		lastWord = potentialNextWord
	}

	return chain
}

// ConcealWord conceals len(word)-numRevealed letters and obscures
// the rest with '?'
func ConcealWord(word string, nRevealed int) string {
	if nRevealed >= len(word) {
		return word
	}

	str := word[:nRevealed]
	str += strings.Repeat("?", len(word)-nRevealed)
	return str
}

// CountRevealed counts the number of revealed letters in the word
func CountRevealed(word string) int {
	return strings.IndexRune(word, '?')
}

// CleanWord cleans up a word
func CleanWord(word string) string {
	return strings.ToLower(strings.TrimSpace(word))
}
