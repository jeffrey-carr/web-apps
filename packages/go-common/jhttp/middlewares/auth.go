package middlewares

import (
	"context"
	"encoding/json"
	"errors"
	"go-common/constants"
	"go-common/jcontext"
	JHTTPErrors "go-common/jhttp/errors"
	"go-common/types"
	"go-common/utils"
	"io"
	"net/http"
	"os"
)

const (
	devEndpoint  = "http://login.jeffreycarr.local:9999/api/auth"
	prodEndpoint = "https://login.jeffreycarr.dev/api/auth"
)

func defaultUserFetcher(ctx context.Context, cookie *http.Cookie) (types.CommonUser, error) {
	endpoint := devEndpoint
	if os.Getenv(constants.EnvEnvironmentVar) == constants.EnvProd {
		endpoint = prodEndpoint
	}
	endpoint += "/authed-user"

	req, err := http.NewRequest(http.MethodGet, endpoint, nil)
	if err != nil {
		return types.CommonUser{}, err
	}
	req.Header.Add("Cookie", cookie.String())
	authResponse, err := http.DefaultClient.Do(req)
	if err != nil {
		return types.CommonUser{}, err
	}

	var bodyBytes []byte
	if authResponse.Body != nil {
		defer authResponse.Body.Close()

		var readErr error
		bodyBytes, readErr = io.ReadAll(authResponse.Body)
		if readErr != nil {
			return types.CommonUser{}, err
		}
	}

	// If it's an internal server error, throw that error
	if authResponse.StatusCode >= http.StatusInternalServerError {
		var message serverMessage
		parseErr := json.Unmarshal(bodyBytes, &message)
		if parseErr != nil {
			return types.CommonUser{}, parseErr
		}

		return types.CommonUser{}, errors.New(message.Message)
	}

	// If it's any other error, just don't save the user
	if authResponse.StatusCode != http.StatusOK {
		return types.CommonUser{}, nil
	}

	// If it's a 200, the body is the user
	var user types.CommonUser
	err = json.Unmarshal(bodyBytes, &user)
	if err != nil {
		return types.CommonUser{}, err
	}

	return user, nil
}

// GetUserOpts are the options for the GetUser middleware
type GetUserOpts struct {
	UserFetcher func(context.Context, *http.Cookie) (types.CommonUser, error)
}

// GetUser gets the user from the auth cookie and attaches it to the context
type GetUser struct {
	UserFetcher func(context.Context, *http.Cookie) (types.CommonUser, error)
}

// NewGetUser creates a new GetUser middleware
func NewGetUser(opts *GetUserOpts) GetUser {
	fetcher := defaultUserFetcher
	if opts != nil && opts.UserFetcher != nil {
		fetcher = opts.UserFetcher
	}

	return GetUser{UserFetcher: fetcher}
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
	user, err := gu.UserFetcher(ctx, cookie)
	if err != nil {
		return ctx, JHTTPErrors.NewInternalServerError(err)
	}
	if user.UUID != "" {
		ctx = context.WithValue(ctx, jcontext.UserKey, user)
	}

	return ctx, nil
}

// RequireAuth enforces a user is authenticated. The user should already be present in the context before calling this
type RequireAuth struct {
	RequiresAdmin bool
}

// NewRequireAuth creates a new RequireAuth
func NewRequireAuth(requiresAdmin bool) RequireAuth {
	return RequireAuth{
		RequiresAdmin: requiresAdmin,
	}
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
