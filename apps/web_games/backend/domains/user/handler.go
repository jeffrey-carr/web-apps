package user

import (
	"context"
	"fmt"
	"go-common/jcontext"
	"go-common/jhttp"
	"go-common/jhttp/errors"
	"jeffs-web-games/user"
)

// Handler represents the user handler
type Handler struct {
	controller user.Controller
}

// NewHandler creates a new user handler
func NewHandler(controller user.Controller) Handler {
	return Handler{
		controller: controller,
	}
}

// GetMe gets the profile of the logged in user
func (h Handler) GetMe(ctx context.Context, _ jhttp.RequestNoData) (*user.UserProfile, *errors.JHTTPError) {
	user, userPresent := jcontext.GetUser(ctx)
	if !userPresent {
		return nil, errors.NewInternalServerError(errors.NewInternalServerError(fmt.Errorf("this wasnt supposed to get this far")))
		// return nil, errors.NewUnauthorizedError()
	}

	profile, err := h.controller.GetMe(ctx, user)
	if err != nil {
		return nil, errors.NewInternalServerError(err)
	}

	return &profile, nil
}
