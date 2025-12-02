package auth

import (
	"context"
	"errors"
	"fmt"
	"go-common/jcontext"
	"go-common/services/jmongo"
	globalTypes "go-common/types"
	"go-common/utils"
	"net/http"
	"time"

	"go.mongodb.org/mongo-driver/v2/mongo"
)

const (
	mongoAuthTokenKey = "token"
	mongoEmailKey     = "email"

	loginTokenValidDuration = time.Hour * 24 * 30 // 30 days
)

var (
	ErrEmailTaken    = errors.New("email is taken")
	ErrBadLogin      = errors.New("invalid email or password")
	ErrInvalidCookie = errors.New("cookie is invalid")
)

// Controller controls the auth business logic
type Controller interface {
	GetUserFromCookie(ctx context.Context, cookie *http.Cookie) (globalTypes.CommonUser, error)
	GetUserByUUID(ctx context.Context, uuid string) (globalTypes.User, error)
	GetUsersByUUIDs(ctx context.Context, uuids []string) ([]globalTypes.User, error)
	GetUserByEmail(ctx context.Context, email string) (globalTypes.User, error)

	CreateUser(ctx context.Context, request CreateUserRequest) (globalTypes.User, error)
	Login(ctx context.Context, email, password string) (globalTypes.User, error)
	ValidateToken(ctx context.Context, token string) (globalTypes.User, error)
	LogoutEverywhere(ctx context.Context, user globalTypes.User) error
}

// NewController creates a new auth controller
func NewController(mongo jmongo.Mongo[globalTypes.User]) Controller {
	return &controller{
		mongo: mongo,
	}
}

type controller struct {
	mongo jmongo.Mongo[globalTypes.User]
}

func (c *controller) GetUserFromCookie(ctx context.Context, cookie *http.Cookie) (globalTypes.CommonUser, error) {
	fmt.Println("Getting user from cookie")
	if cookie == nil {
		fmt.Println("No cookie")
		return globalTypes.CommonUser{}, nil
	}

	if cookie.Value == "" {
		fmt.Println("No value")
		return globalTypes.CommonUser{}, nil
	}

	user, err := c.GetUserByAuthToken(context.TODO(), cookie.Value)
	if err == globalTypes.ErrNotFound {
		fmt.Println("Failed to find user")
		return globalTypes.CommonUser{}, nil
	}
	if err != nil {
		fmt.Printf("Error getting user: %s\n", err.Error())
		return globalTypes.CommonUser{}, err
	}

	if !user.IsTokenValid() {
		fmt.Println("User token is not valid")
		return globalTypes.CommonUser{}, nil
	}

	ctxFullUser, ok := ctx.Value(jcontext.FullUserKey).(*globalTypes.User)
	if ok && ctxFullUser != nil {
		*ctxFullUser = user
	}

	return UserToCommonUser(user), nil
}

func (c *controller) GetUserByUUID(ctx context.Context, uuid string) (globalTypes.User, error) {
	user, err := c.mongo.GetByUUID(ctx, uuid)
	if err != nil {
		return globalTypes.User{}, err
	}

	return user, nil
}

func (c *controller) GetUsersByUUIDs(ctx context.Context, uuids []string) ([]globalTypes.User, error) {
	return c.mongo.GetByUUIDs(ctx, uuids)
}

func (c *controller) GetUserByEmail(ctx context.Context, email string) (globalTypes.User, error) {
	users, err := c.mongo.GetByKey(ctx, mongoEmailKey, email)
	if err != nil {
		return globalTypes.User{}, err
	}

	if len(users) == 0 {
		return globalTypes.User{}, errors.New("Not found")
	}

	return users[0], nil
}

func (c *controller) GetUserByAuthToken(ctx context.Context, token string) (globalTypes.User, error) {
	users, err := c.mongo.GetByKey(ctx, mongoAuthTokenKey, token)
	if err != nil {
		return globalTypes.User{}, err
	}

	return users[0], nil
}

// CreateUser creates a new user
func (c *controller) CreateUser(ctx context.Context, request CreateUserRequest) (globalTypes.User, error) {
	salt, err := GenerateSalt()
	if err != nil {
		return globalTypes.User{}, err
	}
	hashedPassword, err := HashPassword(salt, request.Password)
	if err != nil {
		return globalTypes.User{}, err
	}

	user := CreateUserRequestToUser(request, hashedPassword, salt)
	err = c.mongo.InsertItem(ctx, user)
	if mongo.IsDuplicateKeyError(err) {
		return globalTypes.User{}, ErrEmailTaken
	}
	if err != nil {
		return globalTypes.User{}, err
	}

	return user, nil
}

func (c *controller) Login(ctx context.Context, email, password string) (globalTypes.User, error) {
	user, err := c.GetUserByEmail(ctx, email)
	if err == globalTypes.ErrNotFound {
		return globalTypes.User{}, ErrBadLogin
	}
	if err != nil {
		return globalTypes.User{}, err
	}

	hashedPasswordGuess, err := HashPassword(user.Salt, password)
	if err != nil {
		return globalTypes.User{}, err
	}

	if hashedPasswordGuess != user.HashedPassword {
		return globalTypes.User{}, ErrBadLogin
	}

	// If their token is still valid, then we're good to go
	if user.IsTokenValid() {
		return user, nil
	}

	// Otherwise, we need to refresh it
	uuid := utils.NewUUID()
	user.Token = &uuid
	validTo := time.Now().Add(loginTokenValidDuration)
	user.TokenValidTo = &validTo

	err = c.mongo.UpdateItem(ctx, user.UUID, user)
	if err != nil {
		return globalTypes.User{}, err
	}

	return user, nil
}

func (c *controller) ValidateToken(ctx context.Context, token string) (globalTypes.User, error) {
	users, err := c.mongo.GetByKey(ctx, mongoAuthTokenKey, token)
	if err != nil {
		return globalTypes.User{}, nil
	}

	user := users[0]
	if !user.IsTokenValid() {
		return globalTypes.User{}, ErrInvalidCookie
	}

	return user, nil
}

func (c *controller) LogoutEverywhere(ctx context.Context, user globalTypes.User) error {
	user.Token = nil
	user.TokenValidTo = nil

	return c.mongo.UpdateItem(ctx, user.UUID, user)
}
