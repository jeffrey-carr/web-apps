package jhttp

import (
	"fmt"
	"go-common/jhttp/middlewares"
	"go-common/utils"
	"net/http"
)

// EndpointBuilder stores configuration like default middlewares that apply
// to all endpoints created using/with this builder.
type EndpointBuilder struct {
	defaultMiddlewareFactories []middlewares.MiddlewareFactory
}

// NewBuilder creates a new EndpointBuilder with the specified default middlewares.
// Builder middlewares are applied before the endpoint middlewares
func NewEndpointBuilder(factories ...middlewares.MiddlewareFactory) EndpointBuilder {
	return EndpointBuilder{
		defaultMiddlewareFactories: factories,
	}
}

// EndpointProperties holds properties for building a single HTTP endpoint.
type EndpointProperties[T, E any] struct {
	slug                string
	pathKeys            []string
	method              string
	middlewares         []middlewares.Middleware
	excludedMiddlewares utils.Set[middlewares.MiddlewareIdentifier]
	callback            EndpointFunc[T, E]
	builders            []EndpointBuilder
}

// NewEndpointFunction creates a new EndpointProperties instance for a callback.
func NewEndpointFunction[T, E any](slug string, f EndpointFunc[T, E]) EndpointProperties[T, E] {
	return EndpointProperties[T, E]{
		slug:     slug,
		callback: f,
	}
}

// WithBuilder adds the builder's default middlewares to this endpoint, merging them
// with any already specified middlewares.
func (e EndpointProperties[T, E]) WithBuilders(builders ...EndpointBuilder) EndpointProperties[T, E] {
	e.builders = append(e.builders, builders...)
	return e
}

// WithPathKeys sets the expected keys in the request path parameters.
func (e EndpointProperties[T, E]) WithPathKeys(keys ...string) EndpointProperties[T, E] {
	e.pathKeys = keys
	return e
}

// WithMethod sets the HTTP method for the endpoint.
func (e EndpointProperties[T, E]) WithMethod(method string) EndpointProperties[T, E] {
	e.method = method
	return e
}

// WithMiddlewares applies the given middlewares to each request
//
// Overwrites any existing middlewares. Applied after builder defaults
func (e EndpointProperties[T, E]) WithMiddlewares(mws ...middlewares.Middleware) EndpointProperties[T, E] {
	e.middlewares = mws
	return e
}

// ExcludeMiddlewares excludes any middleware in the default list matching the listed ids
//
// Overwrites any existing exclude list
func (e EndpointProperties[T, E]) ExcludeMiddlewares(ids ...middlewares.MiddlewareIdentifier) EndpointProperties[T, E] {
	e.excludedMiddlewares = utils.NewSet(ids...)
	return e
}

// HandleEndpoint compiles the endpoint properties into a standard HTTP handler function.
func (e EndpointProperties[T, E]) HandleEndpoint(mux *http.ServeMux) {
	var mws []middlewares.Middleware
	if len(e.builders) > 0 {
		for _, builder := range e.builders {
			for _, factory := range builder.defaultMiddlewareFactories {
				mw := factory()
				if e.excludedMiddlewares.Has(mw.ID()) {
					continue
				}

				mws = append(mws, mw)
			}
		}
	}
	mws = append(mws, e.middlewares...)

	mux.HandleFunc(
		fmt.Sprintf("%s %s", e.method, e.slug),
		NewEndpoint(
			e.callback,
			e.pathKeys,
			mws...,
		),
	)
}
