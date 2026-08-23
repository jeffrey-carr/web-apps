package jencryption

import "crypto/rand"

func generateSecretKey() ([]byte, error) {
	key := make([]byte, 32)

	if _, err := rand.Read(key); err != nil {
		return nil, err
	}

	return key, nil
}
