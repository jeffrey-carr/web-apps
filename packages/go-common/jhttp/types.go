package jhttp

import (
	"context"
	"go-common/jhttp/errors"
	"net/http"
	"net/url"
)

type RequestData[T any] struct {
	Writer     *http.ResponseWriter
	PathValues map[string]string
	Query      *url.Values
	Body       *T
}

type EndpointFunc[T any, K any] func(context.Context, RequestData[T]) (K, *errors.JHTTPError)
