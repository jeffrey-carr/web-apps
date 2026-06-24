package jcontext

import (
	"context"
	"go-common/types"
	"go-common/utils"
)

// GetUser gets a user from the context and returns a boolean if the user was present
func GetUser(ctx context.Context) (types.CommonUser, bool) {
	user, ok := getValueFromContext[types.CommonUser](ctx, UserKey)
	if ok {
		return user, ok
	}

	fullUser, ok := getValueFromContext[*types.User](ctx, FullUserKey)
	if ok && utils.Deref(fullUser).UUID != "" {
		return utils.UserToCommonUser(*fullUser), ok
	}

	return types.CommonUser{}, false
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
