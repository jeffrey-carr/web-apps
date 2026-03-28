package recipe

import "errors"

// ErrAlreadyFavorited is thrown when the recipe is already favorited
var ErrAlreadyFavorited = errors.New("recipe is already favorited")

// ErrNotFavorited is thrown when the recipe is not favorited
var ErrNotFavorited = errors.New("recipe is not favorited")
