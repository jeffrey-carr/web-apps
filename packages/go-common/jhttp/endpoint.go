package jhttp

import (
	"context"
	"encoding/json"
	"fmt"
	"go-common/jhttp/errors"
	"go-common/jhttp/middlewares"
	"io"
	"mime"
	"net/http"
	"net/url"

	"github.com/gorilla/schema"
)

var decoder = schema.NewDecoder()

func init() {
	decoder.IgnoreUnknownKeys(true)
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
		mediatype, _, _ := mime.ParseMediaType(r.Header.Get("Content-Type"))
		if r.Body != nil {
			if mediatype == "application/json" {
				defer r.Body.Close()
				data, readErr := io.ReadAll(r.Body)
				if readErr != nil {
					err := errors.NewBadRequestError(fmt.Sprintf("Invalid request: %s", readErr.Error()))
					writeErr(w, *err)
					return
				}
				if len(data) > 0 {
					unmarshalErr := json.Unmarshal(data, &body)
					if unmarshalErr != nil {
						err := errors.NewInternalServerError(unmarshalErr)
						writeErr(w, *err)
						return
					}
				}
			} else if mediatype == "multipart/form-data" || mediatype == "application/x-www-form-urlencoded" {
				// ParseMultipartForm is a no-op for application/x-www-form-urlencoded
				// and will parse both if it's multipart/form-data
				err := r.ParseMultipartForm(32 << 20) // 32MB max memory
				if err != nil && err != http.ErrNotMultipart {
					writeErr(w, *errors.NewBadRequestError(fmt.Sprintf("Error parsing form: %s", err.Error())))
					return
				}

				if err := decoder.Decode(&body, r.PostForm); err != nil {
					writeErr(w, *errors.NewInternalServerError(err))
					return
				}
			}
		}

		v, err := f(
			ctx,
			RequestData[T]{
				Request:    r,
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
