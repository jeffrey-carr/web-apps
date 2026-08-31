package user

import (
	"context"
	"go-common/jcontext"
	"go-common/jhttp"
	"go-common/jhttp/errors"
	"go-common/jlogging"
	"jeffs-web-games/user"
)

// Handler represents the user handler
type Handler struct {
	controller user.Controller
	logger     jlogging.Logger
}

// NewHandler creates a new user handler
func NewHandler(controller user.Controller, logger jlogging.Logger) Handler {
	return Handler{
		controller: controller,
		logger:     logger,
	}
}

// GetMe gets the profile of the logged in user
func (h Handler) GetMe(ctx context.Context, _ jhttp.RequestNoData) (*user.UserProfile, *errors.JHTTPError) {
	logger := h.logger.WithField("action", "getMe")

	user, userPresent := jcontext.GetUser(ctx)
	if !userPresent {
		return nil, errors.NewUnauthorizedError()
	}
	logger.WithField(jlogging.UserUUIDLogLabel, user.UUID)

	profile, err := h.controller.GetMe(ctx, user)
	if err != nil {
		logger.WithError(err).Error("failed to get user profile")
		return nil, errors.NewInternalServerError(err)
	}

	return &profile, nil
}
