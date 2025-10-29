package jcontext

import (
	"context"
	"go-common/types"
)

// GetUser gets a user from the context and returns a boolean if the user was present
func GetUser(ctx context.Context) (types.CommonUser, bool) {
	untypedUser := ctx.Value(UserKey)
	if untypedUser == nil {
		return types.CommonUser{}, false
	}

	user, ok := untypedUser.(types.CommonUser)
	return user, ok
}
