package middlewares

import (
	"context"
	"go-common/constants"
	"go-common/jhttp/errors"
	"go-common/utils"
	"net/http"
)

type AddCommonHeaders struct{}

func (m AddCommonHeaders) ID() string {
	return "add-common-headers"
}

func (m AddCommonHeaders) Apply(ctx context.Context, w http.ResponseWriter, r *http.Request) (context.Context, *errors.JHTTPError) {
	w.Header().Add("Content-Type", "application/json")

	// Also, add the IP and UA to the context
	if r.Header != nil {
		if ip := utils.GetIPAddr(r.Header); ip != "" {
			ctx = context.WithValue(ctx, constants.IPContextKey, ip)
		}
		if ua := r.UserAgent(); ua != "" {
			ctx = context.WithValue(ctx, constants.UAContextKey, ua)
		}
	}

	return ctx, nil
}
