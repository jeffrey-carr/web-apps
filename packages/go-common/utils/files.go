package utils

import (
	"crypto/sha256"
	"errors"
	"io"
	"os"
)

func ReadCloserIntoTemp(closer io.ReadCloser) (*os.File, func() error, error) {
	tmpFile, err := os.CreateTemp("", "")
	if err != nil {
		return nil, nil, err
	}
	cleanup := func() error {
		closeErr := tmpFile.Close()
		removeErr := os.Remove(tmpFile.Name())
		return errors.Join(closeErr, removeErr)
	}

	_, err = io.Copy(tmpFile, closer)
	if err != nil {
		cleanup()
		return nil, nil, err
	}

	err = closer.Close()
	if err != nil {
		cleanup()
		return nil, nil, err
	}

	_, err = tmpFile.Seek(0, io.SeekStart)
	if err != nil {
		cleanup()
		return nil, nil, err
	}

	return tmpFile, cleanup, nil
}

// ReadFileIntoString reads a file into a string
func ReadFileIntoString(p string) (string, error) {
	f, err := os.Open(p)
	if err != nil {
		return "", err
	}
	defer f.Close()

	data, err := io.ReadAll(f)
	if err != nil {
		return "", err
	}

	return string(data), nil
}

// GetFileSHA256 gets the SHA256 of a file
func GetFileSHA256(f *os.File) (string, error) {
	hash := sha256.New()

	_, err := io.Copy(hash, f)
	if err != nil {
		return "", err
	}

	return string(hash.Sum(nil)), nil
}
