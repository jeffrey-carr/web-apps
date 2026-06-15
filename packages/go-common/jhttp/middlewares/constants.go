package middlewares

type MiddlewareIdentifier string

const (
	MiddlewareIdentifierCORs             MiddlewareIdentifier = "cors"
	MiddlewareIdentifierGetUser          MiddlewareIdentifier = "get-user"
	MiddlewareIdentifierRequireAuth      MiddlewareIdentifier = "require-auth"
	MiddlewareIdentifierRateLimiter      MiddlewareIdentifier = "rate-limiter"
	MiddlewareIdentifierLoginRateLimiter MiddlewareIdentifier = "login-rate-limiter"
)
