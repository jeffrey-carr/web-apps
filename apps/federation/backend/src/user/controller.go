package user

import (
	"context"
	"federation/types"
	"go-common/services/jmongo"
	globalTypes "go-common/types"
	"time"
)

var (
	mongoAuthTokenKey = "token"
	mongoEmailKey     = "email"
)

// Controller is the user controller
type Controller interface {
	// CreateUser creates a new user from an unverifiedUser template
	//
	// Because auth is controlled by the auth controller, the user controller cannot generate the user's auth tokens
	CreateUser(ctx context.Context, unverifiedUser types.UnverifiedUser, userToken string, userTokenValidTo time.Time) (globalTypes.User, error)
	// GetUserByUUID gets a user by their UUID
	GetUserByUUID(ctx context.Context, uuid string) (globalTypes.User, error)
	// GetUsersByUUIDs gets users by their UUIDs
	GetUsersByUUIDs(ctx context.Context, uuids []string) ([]globalTypes.User, error)
	// GetUserByEmail gets a user by their email
	GetUserByEmail(ctx context.Context, email string) (globalTypes.User, error)
	// GetUserByAuthToken gets a user by their auth token, if it's valid
	GetUserByAuthToken(ctx context.Context, authToken string) (globalTypes.User, error)
	// IsEmailTaken tells you if an email is taken
	IsEmailTaken(ctx context.Context, email string) (bool, error)
	// UpdateUserEntity allows updating the entire user entity without the need for pesky update requests
	UpdateUserEntity(ctx context.Context, updatedUser globalTypes.User) error
	// UpdateUser allows you to update your user!!!!!!
	UpdateUser(ctx context.Context, userUUID string, request UpdateUserRequest) (globalTypes.User, error)
}

// NewController creates a new User controller
func NewController(userMongo jmongo.Mongo[globalTypes.User]) Controller {
	return &controller{
		userMongo: userMongo,
	}
}

type controller struct {
	userMongo jmongo.Mongo[globalTypes.User]
}

func (c *controller) CreateUser(
	ctx context.Context,
	unverifiedUser types.UnverifiedUser,
	userToken string,
	userTokenValidTo time.Time,
) (globalTypes.User, error) {
	user := UnverifiedUserToUser(unverifiedUser, userToken, userTokenValidTo)
	err := c.userMongo.InsertItem(ctx, user)
	return user, err
}

func (c *controller) GetUserByUUID(ctx context.Context, uuid string) (globalTypes.User, error) {
	user, err := c.userMongo.GetByUUID(ctx, uuid)
	if err != nil {
		return globalTypes.User{}, err
	}

	return user, nil
}

func (c *controller) GetUsersByUUIDs(ctx context.Context, uuids []string) ([]globalTypes.User, error) {
	return c.userMongo.GetByUUIDs(ctx, uuids)
}

func (c *controller) GetUserByEmail(ctx context.Context, email string) (globalTypes.User, error) {
	users, err := c.userMongo.GetByKey(ctx, mongoEmailKey, email)
	if err != nil {
		return globalTypes.User{}, err
	}

	if len(users) == 0 {
		return globalTypes.User{}, globalTypes.ErrNotFound
	}

	return users[0], nil
}

func (c *controller) GetUserByAuthToken(ctx context.Context, token string) (globalTypes.User, error) {
	users, err := c.userMongo.GetByKey(ctx, mongoAuthTokenKey, token)
	if err != nil {
		return globalTypes.User{}, err
	}

	return users[0], nil
}

func (c *controller) IsEmailTaken(ctx context.Context, email string) (bool, error) {
	_, err := c.GetUserByEmail(ctx, email)
	if err != nil && err != globalTypes.ErrNotFound {
		return false, err
	}

	return err == nil, nil
}

func (c *controller) UpdateUser(ctx context.Context, userUUID string, request UpdateUserRequest) (globalTypes.User, error) {
	user, err := c.userMongo.GetByUUID(ctx, userUUID)
	if err != nil {
		return globalTypes.User{}, err
	}

	user = ApplyUserUpdateRequest(user, request)
	err = c.UpdateUserEntity(ctx, user)
	return user, err
}

func (c *controller) UpdateUserEntity(ctx context.Context, updatedUser globalTypes.User) error {
	return c.userMongo.UpdateItem(ctx, updatedUser.UUID, updatedUser)
}
