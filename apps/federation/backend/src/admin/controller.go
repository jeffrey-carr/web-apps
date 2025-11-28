package admin

import (
	"context"
	"errors"
	"federation/services"
	"federation/types"
	globalTypes "go-common/types"
	"go-common/utils"
	"strings"
)

var ErrAppHasAPIKey = errors.New("App already has active API key")

type Controller interface {
	GetAllAPIKeys(ctx context.Context) ([]types.APIKey, error)
	CreateAPIKey(ctx context.Context, app string) (types.APIKey, error)
	RevokeAPIKey(ctx context.Context, key types.APIKey) (types.APIKey, error)
}

type controller struct {
	apiService services.API
}

// NewController creates a new admin controller
func NewController(apiService services.API) Controller {
	return &controller{
		apiService: apiService,
	}
}

func (c *controller) GetAllAPIKeys(ctx context.Context) ([]types.APIKey, error) {
	return c.apiService.GetAll(ctx)
}

func (c *controller) CreateAPIKey(ctx context.Context, app string) (types.APIKey, error) {
	app = strings.ToLower(strings.TrimSpace(app))

	existingKeys, err := c.apiService.GetByApp(ctx, app)
	if err != nil && err != globalTypes.ErrNotFound {
		return types.APIKey{}, err
	}

	appKeyExists := utils.Any(existingKeys, func(key types.APIKey) bool { return key.IsActive })
	if appKeyExists {
		return types.APIKey{}, ErrAppHasAPIKey
	}

	return c.apiService.CreateKey(ctx, app)
}

// RevokeAPIKey revokes an API key. It can revoke via the app name or key value
func (c *controller) RevokeAPIKey(ctx context.Context, key types.APIKey) (types.APIKey, error) {
	keyValue := key.Key
	if keyValue == "" {
		keys, err := c.apiService.GetByApp(ctx, key.App)
		if err != nil {
			return types.APIKey{}, err
		}

		key, found := utils.Find(keys, func(key types.APIKey) bool {
			return key.IsActive
		})
		if !found {
			return types.APIKey{}, globalTypes.ErrNotFound
		}

		keyValue = key.Key
	}

	return c.apiService.RevokeKey(ctx, keyValue)
}
