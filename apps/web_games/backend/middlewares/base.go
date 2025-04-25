package middlewares

import "net/http"

// Middleware represents a middleware
type Middleware interface {
	Name() string
	Apply(http.ResponseWriter, *http.Request) (http.ResponseWriter, *http.Request)
}
