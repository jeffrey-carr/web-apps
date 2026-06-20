package sdk

import (
	"bytes"
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"go-common/constants"
	jHTTPErrors "go-common/jhttp/errors"
	"go-common/utils"
	"io"
	"net/http"
)

func makeRequestAndParseResponse[T any, K any](ctx context.Context, method string, slug string, body T, apiKey string) (*K, error) {
	b, err := json.Marshal(body)
	if err != nil {
		return nil, err
	}
	bodyReader := bytes.NewReader(b)

	req, err := http.NewRequestWithContext(
		ctx,
		method,
		fmt.Sprintf("%s/%s", GetAppURL(), slug),
		bodyReader,
	)
	if err != nil {
		return nil, err
	}
	req.Header.Add(constants.APIKeyHeaderKey, apiKey)
	req.Header.Set("Content-Type", "application/json")
	ip := utils.GetIPFromContext(ctx)
	if ip == "" {
		return nil, errors.New("IP address is required")
	}
	req.Header.Set(constants.RealIPHeaderKey, ip)
	ua := utils.GetUAFromContext(ctx)
	if ua == "" {
		return nil, errors.New("UA address is required")
	}
	req.Header.Set("User-Agent", ua)

	res, err := http.DefaultClient.Do(req)
	if err != nil {
		fmt.Printf("error making request: %s\n", err.Error())
		return nil, err
	}
	if res != nil && res.Body != nil {
		defer res.Body.Close()
	}

	if res.StatusCode == http.StatusNotFound {
		return nil, ErrNotFound
	}
	if res.StatusCode != http.StatusOK {
		errMsg := "Unknown error"
		if res.Body != nil {
			httpErr, err := readBody[jHTTPErrors.JHTTPError](res.Body)
			if err != nil {
				return nil, err
			}
			errMsg = httpErr.Message
		}

		fmt.Printf("[%d] %s", res.StatusCode, errMsg)
		return nil, fmt.Errorf("[%d] %s", res.StatusCode, errMsg)
	}

	var data K
	if res.Body != nil {
		data, err = readBody[K](res.Body)
		if err != nil {
			return nil, err
		}
	}

	return &data, nil
}

func readBody[T any](body io.ReadCloser) (T, error) {
	var ret T
	err := json.NewDecoder(body).Decode(&ret)
	return ret, err
}
