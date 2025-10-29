package middlewares

import (
	"context"
	"go-common/jhttp/errors"
	"net/http"
)

type AddCommonHeaders struct{}

func (m AddCommonHeaders) Apply(ctx context.Context, w *http.ResponseWriter, r *http.Request) (context.Context, *errors.JHTTPError) {
	(*w).Header().Add("Content-Type", "application/json")
	return ctx, nil
}
