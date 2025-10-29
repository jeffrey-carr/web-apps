package middlewares

import (
	"context"
	"encoding/json"
	"errors"
	"go-common/constants"
	"go-common/jcontext"
	JHTTPErrors "go-common/jhttp/errors"
	"go-common/types"
	"io"
	"net/http"
)

const (
	devEndpoint  = "http://login.jeffreycarr.local:9999/api/auth"
	prodEndpoint = "https://login.jeffreycarr.dev/api/auth"
)

// GetUser gets the user from the auth cookie and attaches it to the context
type GetUser struct {
	Environment string
}

func (gu GetUser) Apply(ctx context.Context, w *http.ResponseWriter, r *http.Request) (context.Context, *JHTTPErrors.JHTTPError) {
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

	endpoint := devEndpoint
	if gu.Environment == constants.EnvProd {
		endpoint = prodEndpoint
	}
	endpoint += "/authed-user"

	req, err := http.NewRequest(http.MethodGet, endpoint, nil)
	if err != nil {
		return ctx, JHTTPErrors.NewInternalServerError(err)
	}
	req.Header.Add("Cookie", cookie.String())
	authResponse, err := http.DefaultClient.Do(req)
	if err != nil {
		return ctx, JHTTPErrors.NewInternalServerError(err)
	}

	var bodyBytes []byte
	if authResponse.Body != nil {
		defer authResponse.Body.Close()

		var readErr error
		bodyBytes, readErr = io.ReadAll(authResponse.Body)
		if readErr != nil {
			return ctx, JHTTPErrors.NewInternalServerError(readErr)
		}
	}

	// If it's an internal server error, throw that error
	if authResponse.StatusCode >= http.StatusInternalServerError {
		var message serverMessage
		parseErr := json.Unmarshal(bodyBytes, &message)
		if parseErr != nil {
			return ctx, JHTTPErrors.NewInternalServerError(parseErr)
		}
		e := errors.New(message.Message)
		return ctx, JHTTPErrors.NewInternalServerError(e)
	}

	// If it's any other error, just don't save the user
	if authResponse.StatusCode != http.StatusOK {
		return ctx, nil
	}

	// If it's a 200, the body is the user
	var user types.CommonUser
	err = json.Unmarshal(bodyBytes, &user)
	if err != nil {
		return ctx, JHTTPErrors.NewInternalServerError(err)
	}

	ctx = context.WithValue(ctx, jcontext.UserKey, user)
	return ctx, nil
}

// RequireAuth enforces a user is authenticated. The user should already be present in the context before calling this
type RequireAuth struct {
	Environment string
}

func (ra RequireAuth) Apply(ctx context.Context, w *http.ResponseWriter, r *http.Request) (context.Context, *JHTTPErrors.JHTTPError) {
	// Since the federation server checks expiry, we really just need to check if a user was returned
	_, exists := jcontext.GetUser(ctx)
	if !exists {
		return ctx, JHTTPErrors.NewUnauthorizedError()
	}

	return ctx, nil
}
