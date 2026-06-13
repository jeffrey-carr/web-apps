package jredis

import (
	"context"
	"encoding/json"
	"errors"
	"go-common/types"
	"time"

	"github.com/redis/go-redis/v9"
)

var ErrMissingClient = errors.New("redis client not available")

// JRedis represents my custom redis logic
type JRedis[T any] struct {
	client *redis.Client
}

// NewJRedis creates a new connection to Redis
func NewJRedis[T any](connectionStr string) (JRedis[T], error) {
	opts, err := redis.ParseURL(connectionStr)
	if err != nil {
		return JRedis[T]{}, err
	}
	client := redis.NewClient(opts)
	return JRedis[T]{client: client}, nil
}

// SetString sets a new string value. A TTL of 0 means no expiration
func (r JRedis[T]) Set(ctx context.Context, key string, value T, ttl time.Duration) error {
	if r.client == nil {
		return ErrMissingClient
	}

	data, err := json.Marshal(value)
	if err != nil {
		return err
	}

	result := r.client.Set(ctx, key, data, ttl)
	if result != nil {
		if err := result.Err(); err != nil {
			return err
		}
	}

	return nil
}

// Get gets an object from the redis database
func (r JRedis[T]) Get(ctx context.Context, key string) (T, error) {
	var ret T
	if r.client == nil {
		return ret, ErrMissingClient
	}

	result := r.client.Get(ctx, key)
	if result == nil {
		return ret, errors.New("no result returned")
	}
	if err := result.Err(); err != nil {
		if err == redis.Nil {
			return ret, types.ErrNotFound
		}
		return ret, err
	}

	data, err := result.Bytes()
	if err != nil {
		return ret, err
	}

	err = json.Unmarshal(data, &ret)
	return ret, err
}
