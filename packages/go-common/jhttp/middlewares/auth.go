package middlewares

import (
	"context"
	"errors"
	"federation/sdk"
	"go-common/constants"
	"go-common/jcontext"
	JHTTPErrors "go-common/jhttp/errors"
	"go-common/types"
	"go-common/utils"
	"net/http"
)

const (
	devEndpoint  = "http://login.jeffreycarr.local:9999/api/auth"
	prodEndpoint = "https://login.jeffreycarr.dev/api/auth"
)

// GetUserOpts are the options for the GetUser middleware
type GetUserOpts struct {
	UserFetcher func(context.Context, *http.Cookie) (types.CommonUser, error)
}

// GetUser gets the user from the auth cookie and attaches it to the context
type GetUser struct {
	customFetcher func(context.Context, *http.Cookie) (types.CommonUser, error)
	federationSDK sdk.SDK
}

// NewGetUser creates a new GetUser middleware
func NewGetUser(opts *GetUserOpts, federationSDK sdk.SDK) GetUser {
	var fetcher func(context.Context, *http.Cookie) (types.CommonUser, error)
	if opts != nil && opts.UserFetcher != nil {
		fetcher = opts.UserFetcher
	}

	return GetUser{customFetcher: fetcher, federationSDK: federationSDK}
}

func (gu GetUser) ID() MiddlewareIdentifier {
	return MiddlewareIdentifierGetUser
}

// Apply applies the middleware to the HTTP call
func (gu GetUser) Apply(ctx context.Context, w http.ResponseWriter, r *http.Request) (context.Context, *JHTTPErrors.JHTTPError) {
	if r == nil {
		return ctx, JHTTPErrors.NewBadRequestError("Invalid request")
	}

	cookie, err := r.Cookie(constants.AuthCookieKey)
	if err == http.ErrNoCookie {
		return ctx, nil
	}
	if err != nil {
		return ctx, JHTTPErrors.NewInternalServerError(err)
	}

	// Add the full user to context in case we need it
	ctx = context.WithValue(ctx, jcontext.FullUserKey, utils.Ptr(types.User{}))
	var user types.CommonUser
	if gu.customFetcher != nil {
		user, err = gu.customFetcher(ctx, cookie)
	} else {
		user, err = gu.defaultUserFetcher(ctx, cookie)
	}
	if err != nil {
		if errors.Is(err, sdk.ErrNotFound) {
			return ctx, nil
		}
		return ctx, JHTTPErrors.NewInternalServerError(err)
	}
	if user.UUID != "" {
		ctx = context.WithValue(ctx, jcontext.UserKey, user)
	}

	return ctx, nil
}

func (gu GetUser) defaultUserFetcher(ctx context.Context, cookie *http.Cookie) (types.CommonUser, error) {
	user, err := gu.federationSDK.GetUserByCookie(ctx, cookie.String())
	return utils.Deref(user), err
}

// RequireAuth enforces a user is authenticated.
//
// NOTE: The user should already be present in the context before calling this!
type RequireAuth struct {
	RequiresAdmin bool
}

// NewRequireAuth creates a new RequireAuth
func NewRequireAuth(requiresAdmin bool) RequireAuth {
	return RequireAuth{
		RequiresAdmin: requiresAdmin,
	}
}

func (ra RequireAuth) ID() MiddlewareIdentifier {
	return MiddlewareIdentifierRequireAuth
}

// Apply applies the middleware to the HTTP call
func (ra RequireAuth) Apply(ctx context.Context, w http.ResponseWriter, r *http.Request) (context.Context, *JHTTPErrors.JHTTPError) {
	// Since the federation server checks expiry, we really just need to check if a user was returned
	user, exists := jcontext.GetUser(ctx)
	if !exists {
		return ctx, JHTTPErrors.NewUnauthorizedError()
	}

	if ra.RequiresAdmin && !user.IsAdmin {
		return ctx, JHTTPErrors.NewForbiddenError()
	}

	return ctx, nil
}
