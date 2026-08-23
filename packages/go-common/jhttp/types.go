package jhttp

import (
	"context"
	"go-common/jhttp/errors"
	"net/http"
	"net/url"
)

// RequestData represents request data
type RequestData[T any] struct {
	Request    *http.Request
	Writer     *http.ResponseWriter
	PathValues map[string]string
	Query      *url.Values
	Body       *T
}

// RequestNoData represents a request with no data
type RequestNoData = RequestData[struct{}]

type EndpointFunc[T any, K any] func(context.Context, RequestData[T]) (*K, *errors.JHTTPError)
