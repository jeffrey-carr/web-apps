package middlewares

import (
	"context"
	"federation/services"
	"fmt"

	"go-common/constants"
	"go-common/jhttp/errors"
	"go-common/types"
	"net/http"
)

func NewRequireAPIKey(apiService services.API) RequireAPIKey {
	return RequireAPIKey{
		apiService: apiService,
	}
}

type RequireAPIKey struct {
	apiService services.API
}

func (rak RequireAPIKey) Apply(ctx context.Context, _ http.ResponseWriter, r *http.Request) (context.Context, *errors.JHTTPError) {
	if r == nil {
		return ctx, errors.NewInternalServerError(fmt.Errorf("request not available"))
	}

	keyValue := r.Header.Get(constants.APIKeyHeaderKey)
	if keyValue == "" {
		return ctx, errors.NewUnauthorizedError()
	}

	isValid, err := rak.apiService.ValidateKey(ctx, keyValue)
	if err == types.ErrNotFound {
		return ctx, errors.NewUnauthorizedError()
	}
	if err != nil {
		return ctx, errors.NewInternalServerError(err)
	}

	if !isValid {
		return ctx, errors.NewUnauthorizedError()
	}

	return ctx, nil
}
