package jcontext

import (
	"context"
	"go-common/types"
)

// GetUser gets a user from the context and returns a boolean if the user was present
func GetUser(ctx context.Context) (types.CommonUser, bool) {
	return getValueFromContext[types.CommonUser](ctx, UserKey)
}

// GetFullUser gets a full user object from the context
func GetFullUser(ctx context.Context) (*types.User, bool) {
	return getValueFromContext[*types.User](ctx, FullUserKey)
}

func getValueFromContext[T any](ctx context.Context, key string) (T, bool) {
	var typed T
	var ok bool

	untyped := ctx.Value(key)
	if untyped == nil {
		return typed, false
	}

	typed, ok = untyped.(T)
	return typed, ok
}
