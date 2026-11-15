package sse

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	jerrors "go-common/jhttp/errors"
	"net/http"
)

const defaultBufferSize = 128

// HandleNewConnection handles new SSE connections
//
// It returns a serving method that can be called as well as a channel to communicate
// to the user with
func HandleNewConnection(ctx context.Context, writer *http.ResponseWriter) (func(), chan string, *jerrors.JHTTPError) {
	if writer == nil {
		return nil, nil, jerrors.NewInternalServerError(errors.New("no writer"))
	}
	w := *writer

	flusher, ok := w.(http.Flusher)
	if !ok {
		return nil, nil, jerrors.NewBadRequestError("cannot handle SSE connections")
	}

	w.Header().Set("Content-Type", "text/event-stream")
	w.Header().Set("Cache-Control", "no-cache")
	w.Header().Set("Connection", "keep-alive")
	w.WriteHeader(http.StatusOK)
	sendConnectedMessage(w, flusher)

	comms := make(chan string, defaultBufferSize)

	return func() {
		for {
			select {
			case <-ctx.Done():
				return
			case msg := <-comms:
				fmt.Fprint(w, msg)
				flusher.Flush()
			}
		}
	}, comms, nil
}

func sendConnectedMessage(writer http.ResponseWriter, flusher http.Flusher) {
	d, err := json.Marshal(NewConnectionMessage(ConnectionStateConnected))
	if err != nil {
		// TODO: something
	}

	fmt.Fprint(writer, fmt.Sprintf("data: %s\n\n", string(d)))
	flusher.Flush()
}
