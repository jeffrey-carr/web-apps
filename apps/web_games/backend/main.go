package main

import (
	"fmt"
	"net/http"

	common "github.com/jeffrey-carr/web-apps/packages/go-common"
	"github.com/jeffrey-carr/web-apps/packages/go-common/middlewares"
	commonMiddlewares "github.com/jeffrey-carr/web-apps/packages/go-common/middlewares"
)

// GlobalMiddlewares are the middlewares that are applied to every handler
var GlobalMiddlewares = []middlewares.Middleware{
	commonMiddlewares.Cors{FrontendDomain: "http://localhost:5173"},
}

// makeNewHandler creates a new HandleFunc and applies global middlewares
func makeNewHandler(
	slug string,
	f common.HandlerFunction,
	method string,
	middlewares ...commonMiddlewares.Middleware,
) (string, func(w http.ResponseWriter, r *http.Request)) {
	allMiddlewares := common.NewSet(GlobalMiddlewares...)
	allMiddlewares.AddAll(middlewares...)

	return common.NewHandler(
		slug,
		f,
		method,
		allMiddlewares.Slice()...,
	)
}

func pong(r *http.Request) common.HTTPResponse {
	return common.HTTPResponse{
		Status: http.StatusOK,
		Data: common.GenericMessage{
			Message: "pong!",
		},
	}
}

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintln(w, "Hello, Web Games API!")
	})
	http.HandleFunc(
		makeNewHandler(
			"/ping",
			pong,
			http.MethodGet,
		),
	)
	port := ":8080"
	fmt.Printf("Listening on %s\n", port)
	http.ListenAndServe(port, nil)
}
