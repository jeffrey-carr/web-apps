package auth

import (
	"crypto/pbkdf2"
	"crypto/rand"
	"crypto/sha256"
	"encoding/base64"
	"go-common/constants"
	globalTypes "go-common/types"
	"go-common/utils"
	"net/http"
	"os"
	"time"
)

const loginTokenValidDuration = time.Hour * 24 * 30 // 30 days

// UserToCommonUser converts a User into a global CommonUser
func UserToCommonUser(user globalTypes.User) globalTypes.CommonUser {
	return globalTypes.CommonUser{
		UUID:       user.UUID,
		Email:      user.Email,
		FName:      user.FirstName,
		LName:      user.LastName,
		IsAdmin:    user.IsAdmin,
		Character:  user.Character,
		CreatedAt:  user.CreatedAt,
		ModifiedAt: user.ModifiedAt,
		LastSeenAt: user.LastSeenAt,
	}
}

// CreateUserRequestToUser maps a user create request to a user object
func CreateUserRequestToUser(
	request CreateUserRequest,
	hashedPassword string,
	salt []byte,
) globalTypes.User {
	now := time.Now()
	userToken, userTokenValidTo := GenerateNewUserToken()
	return globalTypes.User{
		UUID:           utils.NewUUID(),
		Email:          request.Email,
		HashedPassword: hashedPassword,
		Salt:           salt,
		FirstName:      request.FName,
		LastName:       request.LName,
		Character:      request.Character,
		CreatedAt:      now,
		ModifiedAt:     now,
		LastSeenAt:     now,

		// We generate a token when creating the user so they can be logged in
		// as soon as they create their account
		Token:        &userToken,
		TokenValidTo: &userTokenValidTo,
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
