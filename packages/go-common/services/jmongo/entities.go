package jmongo

// PrefixSearchOptions are the options available for a prefix search
type PrefixSearchOptions struct {
	CaseSensitive bool
}

// FuzzySearchOpts are the options available to fuzzy searching
type FuzzySearchOpts struct {
	Limit     int
	PageIndex int
}

// FuzzySearchResult are the results returned by a fuzzy search
type FuzzySearchResult[T any] struct {
	Result T       `bson:",inline"`
	Score  float64 `bson:"score"`
}
