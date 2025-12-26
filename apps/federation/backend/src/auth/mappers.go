package auth

import (
	"crypto/pbkdf2"
	"crypto/rand"
	"crypto/sha256"
	"encoding/base64"
	"federation/types"
	"go-common/constants"
	"go-common/utils"
	"net/http"
	"os"
	"time"
)

const loginTokenValidDuration = time.Hour * 24 * 30 // 30 days

// CreateRequestToUnverifiedUser takes a create request and
// returns an unverified user entity
func CreateRequestToUnverifiedUser(
	request CreateUserRequest,
	hashedPassword string,
	salt []byte,
) types.UnverifiedUser {
	return types.UnverifiedUser{
		VerificationToken: utils.NewUUID(),
		Email:             request.Email,
		HashedPassword:    hashedPassword,
		Salt:              salt,
		FirstName:         request.FName,
		LastName:          request.LName,
		Character:         request.Character,
		CreatedAt:         time.Now(),
		ExpiresAt:         time.Now().Add(time.Hour),
	}
}

// GenerateSalt generates a random salt
func GenerateSalt() ([]byte, error) {
	salt := make([]byte, 16)
	_, err := rand.Read(salt)
	if err != nil {
		return nil, err
	}
	return salt, nil
}

// HashPassword hashes the password with the provided salt
func HashPassword(salt []byte, plaintext string) (string, error) {
	iterations := 65536
	keyLen := 16 // 128 bits
	derivedKey, err := pbkdf2.Key(sha256.New, plaintext, salt, iterations, keyLen)
	if err != nil {
		return "", err
	}

	return base64.StdEncoding.EncodeToString(derivedKey), nil
}

// GenerateNewUserToken generates a new user token with
func GenerateNewUserToken() (string, time.Time) {
	return utils.NewUUID(), time.Now().Add(loginTokenValidDuration)
}

// CreateAuthCookie creates a new auth cookie
func CreateAuthCookie(token string, opts CookieOpts) http.Cookie {
	var expiresAt time.Time
	if opts.ExpiresAt != nil {
		expiresAt = *opts.ExpiresAt
	} else if opts.MaxAge != nil {
		expiresAt = time.Now().Add(*opts.MaxAge)
	} else {
		// Default to 30 days
		expiresAt = time.Now().Add(loginTokenValidDuration)
	}

	cookie := http.Cookie{
		Name:     constants.AuthCookieKey,
		Value:    token,
		Expires:  expiresAt,
		HttpOnly: true,
		Domain:   ".jeffreycarr.local",
		Path:     "/",
	}

	if os.Getenv(constants.EnvEnvironmentVar) == constants.EnvProd {
		cookie.Secure = true
		cookie.Domain = ".jeffreycarr.dev"
	}

	return cookie
}
