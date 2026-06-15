package middlewares

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	JHTTPErrors "go-common/jhttp/errors"
	"go-common/services/jredis"
	"go-common/types"
	"go-common/utils"
	"io"
	"net/http"
	"time"
)

type RateLimiter interface {
	ID() MiddlewareIdentifier
	// Apply applies the RateLimiter to the request
	Apply(context.Context, http.ResponseWriter, *http.Request) (context.Context, *JHTTPErrors.JHTTPError)
	// WithLimit returns a RateLimiter with the provided limit and duration
	WithLimit(limit int, duration time.Duration) RateLimiter
}

// rateLimiter applies rate limits to endpoints. It implements a fixed-window
// rate limiter
type rateLimiter struct {
	baseRateLimiter
}

// NewRateLimiterMiddleware creates a new basic RateLimiter middleware
func NewRateLimiterMiddleware(redis jredis.JRedis[string]) RateLimiter {
	return rateLimiter{baseRateLimiter{
		redis: redis,
	}}
}

func (rl rateLimiter) ID() MiddlewareIdentifier {
	return MiddlewareIdentifierRateLimiter
}

func (rl rateLimiter) Apply(ctx context.Context, w http.ResponseWriter, r *http.Request) (context.Context, *JHTTPErrors.JHTTPError) {
	if r == nil {
		return ctx, JHTTPErrors.NewBadRequestError("unknown request")
	}

	// Build the user fingerprint
	ua := r.UserAgent()
	ip := utils.GetIPAddr(r.Header)
	if ua == "" || ip == "" {
		return ctx, JHTTPErrors.NewBadRequestError("IP and UA required")
	}
	// Hash IP for privacy (and better IPv6 compatibility)
	ip = utils.HashString(ip)
	fingerprint := fmt.Sprintf("%s:%s:%s", rl.id, ip, ua)

	count, err := rl.incrCount(ctx, fingerprint)
	if err != nil {
		return ctx, JHTTPErrors.NewInternalServerError(nil)
	}

	if count > int64(rl.limit) {
		return ctx, JHTTPErrors.NewTooManyRequestsError("Too many requests")
	}

	return ctx, nil
}

func (rl rateLimiter) WithLimit(limit int, duration time.Duration) RateLimiter {
	rl.id = utils.NewUUID()
	rl.limit = limit
	rl.duration = duration
	return rl
}

type loginRateLimiter[T types.LoginRequest] struct {
	baseRateLimiter
}

func NewLoginRateLimiterMiddleware[T types.LoginRequest](redis jredis.JRedis[string]) RateLimiter {
	return loginRateLimiter[T]{baseRateLimiter{
		redis: redis,
	}}
}

func (lrl loginRateLimiter[T]) ID() MiddlewareIdentifier {
	return MiddlewareIdentifierLoginRateLimiter
}

func (lrl loginRateLimiter[T]) Apply(ctx context.Context, w http.ResponseWriter, r *http.Request) (context.Context, *JHTTPErrors.JHTTPError) {
	if r == nil {
		return ctx, JHTTPErrors.NewBadRequestError("unknown request")
	}

	ua := r.UserAgent()
	ip := utils.GetIPAddr(r.Header)
	userID, err := lrl.getUserLogin(r)
	if err != nil {
		return ctx, JHTTPErrors.NewBadRequestError("bad request")
	}
	if ua == "" || ip == "" || userID == "" {
		return ctx, JHTTPErrors.NewBadRequestError("UA, IP, and user ID required")
	}
	ip = utils.HashString(ip)
	fingerprint := fmt.Sprintf("%s:%s:%s:%s", lrl.id, ip, ua, userID)

	count, err := lrl.incrCount(ctx, fingerprint)
	if err != nil {
		return ctx, JHTTPErrors.NewInternalServerError(nil)
	}

	if count > int64(lrl.limit) {
		return ctx, JHTTPErrors.NewTooManyRequestsError("Too many attempts. Try again in a bit")
	}

	return ctx, nil
}

func (lrl loginRateLimiter[T]) getUserLogin(r *http.Request) (string, error) {
	// First, get the login data
	data, err := io.ReadAll(r.Body)
	if err != nil {
		return "", err
	}
	var loginData T
	err = json.Unmarshal(data, &loginData)
	if err != nil {
		return "", err
	}

	// Reading the body consumes it, so we'll need to re-create the body for later consumption
	r.Body = io.NopCloser(bytes.NewBuffer(data))
	return loginData.GetUserID(), nil
}

func (lrl loginRateLimiter[T]) WithLimit(limit int, duration time.Duration) RateLimiter {
	lrl.id = utils.NewUUID()
	lrl.limit = limit
	lrl.duration = duration
	return lrl
}

type baseRateLimiter struct {
	redis jredis.JRedis[string]

	id       string
	limit    int
	duration time.Duration
}

func (brl baseRateLimiter) incrCount(ctx context.Context, fingerprint string) (int64, error) {
	count, err := brl.redis.Incr(ctx, fingerprint)
	if err != nil {
		return 0, err
	}

	if count == 1 {
		err = brl.redis.Expire(ctx, fingerprint, brl.duration)
		if err != nil {
			nDeleted, err := brl.redis.Delete(ctx, fingerprint)
			if err != nil || nDeleted < 1 {
				// FIXME: ERROR ERROR user locked out forever
			}

			return 0, JHTTPErrors.NewInternalServerError(nil)
		}
	}

	return count, nil
}
