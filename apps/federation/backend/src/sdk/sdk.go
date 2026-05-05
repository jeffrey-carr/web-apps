package sdk

import (
	"context"
	"federation/user"
	"fmt"
	"go-common/types"
	"go-common/utils"
	"net/http"
)

// SDK is the official SDK for the Jeffiverse Federation API
type SDK interface {
	GetUserByUUID(ctx context.Context, uuid string) (*types.CommonUser, error)
	GetUsersByUUIDs(ctx context.Context, uuids []string) (*[]types.CommonUser, error)
}

type sdk struct {
	apiKey string
}

// NewSDK creates a new instance of the federation SDK
func NewSDK(apiKey string) SDK {
	return &sdk{
		apiKey: apiKey,
	}
}

// GetAppURL gets the URL of the federation backend
func GetAppURL() string {
	if utils.IsProd() {
		return "https://login.jeffreycarr.dev/api"
	}

	return "http://login.jeffreycarr.local:9999/api"
}

// GetUserByUUID gets a user by their UUID
func (s *sdk) GetUserByUUID(ctx context.Context, uuid string) (*types.CommonUser, error) {
	if s.apiKey == "" {
		return nil, ErrNoAPIKey
	}

	user, err := makeRequestAndParseResponse[*struct{}, types.CommonUser](ctx, http.MethodGet, fmt.Sprintf("user/%s", uuid), nil, s.apiKey)
	return user, err
}

// GetUsersByUUIDs gets a bunch of users by their UUIDs
func (s *sdk) GetUsersByUUIDs(ctx context.Context, uuids []string) (*[]types.CommonUser, error) {
	if s.apiKey == "" {
		return nil, ErrNoAPIKey
	}

	req := user.BulkGetUsersRequest{UUIDs: uuids}
	return makeRequestAndParseResponse[user.BulkGetUsersRequest, []types.CommonUser](
		ctx,
		http.MethodPost,
		"auth/users",
		req,
		s.apiKey,
	)
}
