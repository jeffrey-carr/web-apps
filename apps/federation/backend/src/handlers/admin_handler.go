package handlers

import (
	"context"
	"federation/admin"
	"federation/auth"
	"federation/types"
	"go-common/jhttp"
	JHTTPErrors "go-common/jhttp/errors"
	"go-common/jlogging"
	globalTypes "go-common/types"
	"strings"
)

// Admin handles admin requests
type Admin struct {
	adminController admin.Controller
	authController  auth.Controller
	logger          jlogging.Logger
}

// NewAdminHandler create a new admin handler
func NewAdminHandler(
	controller admin.Controller,
	authController auth.Controller,
	logger jlogging.Logger,
) Admin {
	return Admin{
		adminController: controller,
		authController:  authController,
		logger:          logger,
	}
}

// GetAllKeys gets all API keys
func (h Admin) GetAllKeys(ctx context.Context, r jhttp.RequestData[struct{}]) (*[]types.APIKey, *JHTTPErrors.JHTTPError) {
	keys, err := h.adminController.GetAllAPIKeys(ctx)
	if err != nil {
		return nil, JHTTPErrors.NewInternalServerError(err)
	}

	return &keys, nil
}

// CreateNewAPIKey creates a new API key
func (h Admin) CreateNewAPIKey(ctx context.Context, r jhttp.RequestData[admin.CreateNewAPIKeyRequest]) (*types.APIKey, *JHTTPErrors.JHTTPError) {
	if strings.TrimSpace(r.Body.App) == "" {
		return nil, JHTTPErrors.NewBadRequestError("App name is required")
	}

	logger := h.logger.WithField("app", r.Body.App)

	key, err := h.adminController.CreateAPIKey(ctx, r.Body.App)
	if err == admin.ErrAppHasAPIKey {
		return nil, JHTTPErrors.NewBadRequestError("App already has an active api key")
	}
	if err != nil {
		logger.WithError(err).Error("failed to create api key")
		return nil, JHTTPErrors.NewInternalServerError(err)
	}

	logger.Info("created api key")
	return &key, nil
}

// RevokeAPIKey revokes an API key
func (h Admin) RevokeAPIKey(ctx context.Context, r jhttp.RequestData[admin.RevokeAPIKeyRequest]) (*types.APIKey, *JHTTPErrors.JHTTPError) {
	if r.Body == nil {
		return nil, JHTTPErrors.NewBadRequestError("Invalid request")
	}

	key := r.Body.Key
	if key.App == "" && key.Key == "" {
		return nil, JHTTPErrors.NewBadRequestError("Key or app name is required")
	}

	logger := h.logger.WithField("app", key.App)

	revoked, err := h.adminController.RevokeAPIKey(ctx, key)
	if err == globalTypes.ErrNotFound {
		return nil, JHTTPErrors.NewBadRequestError("Unknown API key")
	}
	if err != nil {
		logger.WithError(err).Error("failed to revoke api key")
		return nil, JHTTPErrors.NewInternalServerError(err)
	}

	return &revoked, nil
}
