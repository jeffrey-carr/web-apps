package handlers

import (
	"context"
	"federation/admin"
	"federation/auth"
	"federation/types"
	"go-common/jhttp"
	JHTTPErrors "go-common/jhttp/errors"
	globalTypes "go-common/types"
	"strings"
)

// Admin handles admin requests
type Admin struct {
	adminController admin.Controller
	authController  auth.Controller
}

// NewAdminHandler create a new admin handler
func NewAdminHandler(
	controller admin.Controller,
	authController auth.Controller,
) Admin {
	return Admin{
		adminController: controller,
		authController:  authController,
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

	key, err := h.adminController.CreateAPIKey(ctx, r.Body.App)
	if err == admin.ErrAppHasAPIKey {
		return nil, JHTTPErrors.NewBadRequestError("App already has an active API key")
	}
	if err != nil {
		return nil, JHTTPErrors.NewInternalServerError(err)
	}

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

	revoked, err := h.adminController.RevokeAPIKey(ctx, key)
	if err == globalTypes.ErrNotFound {
		return nil, JHTTPErrors.NewBadRequestError("Unknown API key")
	}

	return &revoked, nil
}
