package jencryption

import (
	"crypto/aes"
	"crypto/cipher"
	"crypto/rand"
	"encoding/base64"
	"encoding/hex"
	"errors"
	"io"
	"os"
)

// Encryption represents the encryption service
type Encryption interface {
	Encrypt([]byte) (string, error)
	Decrypt(string) ([]byte, error)
}

type encryption struct {
	key []byte
}

// NewEncryptionService creates a new Encryption service
func NewEncryptionService(keyPath string) (Encryption, error) {
	key, err := loadEncryptionKey(keyPath)
	if err != nil {
		return encryption{}, err
	}

	return encryption{key: key}, nil
}

func loadEncryptionKey(path string) ([]byte, error) {
	if path == "" {
		return nil, errors.New("key path not provided")
	}

	var keyExists bool
	info, err := os.Stat(path)
	if err != nil {
		if !errors.Is(err, os.ErrNotExist) {
			return nil, err
		}
	} else {
		if info.IsDir() {
			return nil, errors.New("key path exists, but is directory")
		}

		keyExists = true
	}

	// If the key exists, read it from the file. Otherwise, create a new
	// one and save it to the key file
	var key []byte
	if keyExists {
		data, err := os.ReadFile(path)
		if err != nil {
			return nil, err
		}

		key, err = hex.DecodeString(string(data))
		if err != nil {
			return nil, err
		}
	} else {
		key, err = generateSecretKey()
		if err != nil {
			return nil, err
		}

		keyFile, err := os.Create(path)
		if err != nil {
			return nil, err
		}
		defer keyFile.Close()

		_, err = keyFile.WriteString(hex.EncodeToString(key))
		if err != nil {
			return nil, err
		}
	}

	return key, nil
}

func (e encryption) Encrypt(data []byte) (string, error) {
	block, err := aes.NewCipher(e.key)
	if err != nil {
		return "", err
	}

	gcm, err := cipher.NewGCM(block)
	if err != nil {
		return "", err
	}

	nonce := make([]byte, gcm.NonceSize())
	if _, err := io.ReadFull(rand.Reader, nonce); err != nil {
		return "", err
	}

	ciphertext := gcm.Seal(nonce, nonce, data, nil)
	return base64.URLEncoding.EncodeToString(ciphertext), nil
}

func (e encryption) Decrypt(encodedCiphertext string) ([]byte, error) {
	ciphertextAndNonce, err := base64.URLEncoding.DecodeString(encodedCiphertext)
	if err != nil {
		return nil, err
	}

	block, err := aes.NewCipher(e.key)
	if err != nil {
		return nil, err
	}

	gcm, err := cipher.NewGCM(block)
	if err != nil {
		return nil, err
	}

	nonceSize := gcm.NonceSize()
	if len(ciphertextAndNonce) < nonceSize {
		return nil, errors.New("ciphertext too short")
	}
	nonce, ciphertext := ciphertextAndNonce[:nonceSize], ciphertextAndNonce[nonceSize:]

	plaintext, err := gcm.Open(nil, nonce, ciphertext, nil)
	if err != nil {
		return nil, err
	}

	return plaintext, nil
}
