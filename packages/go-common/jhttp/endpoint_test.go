package jhttp

import (
	"bytes"
	"context"
	"go-common/jhttp/errors"
	"mime/multipart"
	"net/http"
	"net/http/httptest"
	"testing"
)

type TestBody struct {
	Name *string `json:"name" schema:"name"`
}

func TestNewEndpoint_Multipart(t *testing.T) {
	handlerFunc := func(ctx context.Context, r RequestData[TestBody]) (*struct{}, *errors.JHTTPError) {
		if r.Body == nil {
			t.Fatal("Body is nil")
		}
		if r.Body.Name == nil {
			t.Fatal("Body.Name is nil")
		}
		if *r.Body.Name != "Test Recipe" {
			t.Fatalf("Expected 'Test Recipe', got '%s'", *r.Body.Name)
		}
		return nil, nil
	}

	endpoint := NewEndpoint(handlerFunc, []string{})

	body := &bytes.Buffer{}
	writer := multipart.NewWriter(body)
	err := writer.WriteField("name", "Test Recipe")
	if err != nil {
		t.Fatal(err)
	}
	writer.Close()

	req := httptest.NewRequest(http.MethodPost, "/", body)
	req.Header.Set("Content-Type", writer.FormDataContentType())

	rr := httptest.NewRecorder()
	endpoint.ServeHTTP(rr, req)

	if rr.Code != http.StatusOK {
		t.Fatalf("Expected status 200, got %d. Body: %s", rr.Code, rr.Body.String())
	}
}
