package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintln(w, "Hello, Web Games API!")
	})
	http.HandleFunc("/ping", func(w http.ResponseWriter, r *http.Request) {
		msg := struct {
			Status  int    `json:"status"`
			Message string `json:"message"`
		}{
			Status:  http.StatusOK,
			Message: "pong",
		}

		b, err := json.Marshal(msg)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		w.Write(b)
	})
	fmt.Println("Listening on :8080")
	http.ListenAndServe(":8080", nil)
}
