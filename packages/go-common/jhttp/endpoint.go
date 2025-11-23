package jhttp

import (
	"context"
	"encoding/json"
	"fmt"
	"go-common/jhttp/errors"
	"go-common/jhttp/middlewares"
	"io"
	"net/http"
	"net/url"
)

// NewEndpointWithManager creates a new HTTP endpoint using a middleware
// manager
func NewEndpointWithManager[T any, K any](
	f EndpointFunc[T, K],
	pathKeys []string,
	mwManager middlewares.Manager,
) func(http.ResponseWriter, *http.Request) {
	return NewEndpoint(f, pathKeys, mwManager.Middlewares...)
}

// NewEndpoint creates a new HTTP endpoint. It manages parsing path variables,
// query parameters, and a JSON body.
func NewEndpoint[T any, K any](
	f EndpointFunc[T, K],
	pathKeys []string,
	mws ...middlewares.Middleware,
) func(http.ResponseWriter, *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		if r == nil {
			err := errors.NewBadRequestError("Invalid request")
			writeErr(w, *err)
			return
		}

		pathValues := map[string]string{}
		for _, key := range pathKeys {
			value := r.PathValue(key)
			pathValues[key] = value
		}

		ctx := context.Background()
		var middlewareErr *errors.JHTTPError
		// Add on common headers first, that way they can be clobbered by custom headers
		ctx, _ = middlewares.AddCommonHeaders{}.Apply(ctx, w, r)
		for _, mw := range mws {
			ctx, middlewareErr = mw.Apply(ctx, w, r)
			if middlewareErr != nil {
				writeErr(w, *middlewareErr)
				return
			}
		}

		var query *url.Values
		if r.URL != nil {
			q := r.URL.Query()
			query = &q
		} else {
			query = nil
		}

		var body T
		if r.Body != nil && r.ContentLength > 0 {
			defer r.Body.Close()
			data, readErr := io.ReadAll(r.Body)
			if readErr != nil {
				err := errors.NewBadRequestError(fmt.Sprintf("Invalid request: %s", readErr.Error()))
				writeErr(w, *err)
				return
			}
			unmarshalErr := json.Unmarshal(data, &body)
			if unmarshalErr != nil {
				err := errors.NewInternalServerError(unmarshalErr)
				writeErr(w, *err)
				return
			}
		}

		v, err := f(
			ctx,
			RequestData[T]{
				Writer:     &w,
				PathValues: pathValues,
				Query:      query,
				Body:       &body,
			},
		)
		if err != nil {
			writeErr(w, *err)
			return
		}

		vBytes, unmarshalErr := json.Marshal(v)
		if unmarshalErr != nil {
			err := errors.NewInternalServerError(unmarshalErr)
			writeErr(w, *err)
			return
		}

		w.Write(vBytes)
	}
}

func writeErr(w http.ResponseWriter, err errors.JHTTPError) {
	returnB, marshalErr := json.Marshal(err)
	if marshalErr != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(ultimateJSONFailure()))
		return
	}

	w.WriteHeader(err.StatusCode)
	w.Write(returnB)
}
