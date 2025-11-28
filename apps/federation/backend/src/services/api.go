package services

import (
	"context"
	"federation/types"
	"go-common/services/jmongo"
	globalTypes "go-common/types"
	"go-common/utils"
	"time"
)

const (
	mongoAppKey = "app"
)

type API interface {
	GetAll(ctx context.Context) ([]types.APIKey, error)
	GetByApp(ctx context.Context, app string) ([]types.APIKey, error)
	CreateKey(ctx context.Context, app string) (types.APIKey, error)
	ValidateKey(ctx context.Context, key string) (bool, error)
	RevokeKey(ctx context.Context, key string) (types.APIKey, error)
}

type api struct {
	mongo jmongo.Mongo[types.APIKey]
}

func NewAPI(mongo jmongo.Mongo[types.APIKey]) API {
	return &api{
		mongo: mongo,
	}
}

// GetAll gets all API keys
func (a *api) GetAll(ctx context.Context) ([]types.APIKey, error) {
	return a.mongo.GetAll(ctx)
}

// GetApp gets all API keys associated with an app name. It returns a Not Found error
// if no keys are around
func (a *api) GetByApp(ctx context.Context, app string) ([]types.APIKey, error) {
	return a.mongo.GetByKey(ctx, mongoAppKey, app)
}

// CreateKey creates a new API key
func (a *api) CreateKey(ctx context.Context, app string) (types.APIKey, error) {
	key := types.APIKey{
		Key:        utils.NewUUID(),
		App:        app,
		IsActive:   true,
		GrantedAt:  time.Now(),
		LastSeenAt: time.Now(),
	}

	err := a.mongo.InsertItem(ctx, key)
	if err != nil {
		return types.APIKey{}, err
	}

	return key, nil
}

// ValidateKey validates an API key
func (a *api) ValidateKey(ctx context.Context, guess string) (bool, error) {
	key, err := a.mongo.GetByUUID(ctx, guess)
	if err == globalTypes.ErrNotFound {
		return false, nil
	}
	if err != nil {
		return false, err
	}

	key.LastSeenAt = time.Now()

	err = a.mongo.UpdateItem(ctx, key.Key, key)
	if err != nil {
		return false, err
	}

	return key.IsActive, nil
}

// RevokeKey revokes an API key by its key value
func (a *api) RevokeKey(ctx context.Context, keyValue string) (types.APIKey, error) {
	key, err := a.mongo.GetByUUID(ctx, keyValue)
	if err != nil {
		return types.APIKey{}, err
	}

	key.IsActive = false
	key.RevokedAt = utils.Ptr(time.Now())

	err = a.mongo.UpdateItem(ctx, key.Key, key)
	if err != nil {
		return types.APIKey{}, err
	}

	return key, nil
}
