package utils

import (
	"encoding/json"
	"io"
	"os"
)

func OpenAndReadJSON[T any](path string) (T, error) {
	var result T
	f, err := os.Open(path)
	if err != nil {
		return result, err
	}

	data, err := io.ReadAll(f)
	if err != nil {
		return result, err
	}

	err = json.Unmarshal(data, &result)
	return result, err
}
