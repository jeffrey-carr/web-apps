package gocommon

import (
	"encoding/json"
	"net/http"
	"strings"

	"github.com/jeffrey-carr/web-apps/packages/go-common/middlewares"
)

// HandlerFunction is a function that can handle a request
type HandlerFunction[T any] func(*http.Request) HTTPResponse[T]

// NewHandler creates a new handler
func NewHandler[T any](slug string, f HandlerFunction[T], method string, middlewares ...middlewares.Middleware) (string, func(w http.ResponseWriter, r *http.Request)) {
	return slug, func(w http.ResponseWriter, r *http.Request) {
		for _, mw := range middlewares {
			w, r = mw.Apply(w, r)
		}

		if !methodIsAllowed(r, method) {
			w.WriteHeader(http.StatusMethodNotAllowed)
			return
		}

		response := f(r)

		bResponse, err := json.Marshal(response)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		w.WriteHeader(response.Status)
		w.Write(bResponse)
	}
}

func methodIsAllowed(r *http.Request, method string) bool {
	return r != nil && strings.EqualFold(r.Method, method)
}
