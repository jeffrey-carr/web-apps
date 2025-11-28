package middlewares

import (
	"context"
	"go-common/jhttp/errors"
	"net/http"
)

// Middleware represents a custom Jeff middleware
type Middleware interface {
	Apply(ctx context.Context, w http.ResponseWriter, r *http.Request) (context.Context, *errors.JHTTPError)
}
