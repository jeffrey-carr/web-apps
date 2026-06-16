package jredis

import (
	"context"
	"encoding/json"
	"errors"
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

// Set sets a new string value. A TTL of 0 means no expiration
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

func (r JRedis[T]) Incr(ctx context.Context, key string) (int64, error) {
	if r.client == nil {
		return 0, ErrMissingClient
	}

	return r.client.Incr(ctx, key).Result()
}

// Get gets an object from the redis database
func (r JRedis[T]) Get(ctx context.Context, key string) (T, error) {
	var ret T
	if r.client == nil {
		return ret, ErrMissingClient
	}

	result, err := r.client.Get(ctx, key).Result()
	if err != nil {
		return ret, err
	}

	err = json.Unmarshal([]byte(result), &ret)
	return ret, err
}

// Delete deletes the records for the provided keys
func (r JRedis[T]) Delete(ctx context.Context, keys ...string) (int64, error) {
	if r.client == nil {
		return 0, ErrMissingClient
	}

	return r.client.Del(ctx, keys...).Result()
}

// Expire sets a TTL on the specified key
func (r JRedis[T]) Expire(ctx context.Context, key string, expiration time.Duration) error {
	if r.client == nil {
		return ErrMissingClient
	}

	result, err := r.client.Expire(ctx, key, expiration).Result()
	if err != nil {
		return err
	}
	if !result {
		return errors.New("failed to set expiration")
	}
	return nil
}
