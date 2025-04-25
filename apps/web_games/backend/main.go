package main

import (
	"fmt"
	"net/http"

	common "github.com/jeffrey-carr/web-apps/packages/go-common"
	"github.com/jeffrey-carr/web-apps/packages/go-common/middlewares"
)

func pong(r *http.Request) common.HTTPResponse[common.GenericMessage] {
	return common.HTTPResponse[common.GenericMessage]{
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
		common.NewHandler(
			"/ping",
			pong,
			http.MethodGet,
			middlewares.Cors{FrontendDomain: "http://localhost:5173"},
		),
	)
	port := ":8080"
	fmt.Printf("Listening on %s\n", port)
	http.ListenAndServe(port, nil)
}
