package auth

import (
	"context"
	"errors"
	"federation/auth/emails"
	"federation/types"
	"federation/user"
	federationUtils "federation/utils"
	"fmt"
	"go-common/jcontext"
	"go-common/services/jemail"
	"go-common/services/jmongo"
	globalTypes "go-common/types"
	"go-common/utils"
	"net/http"
	"strings"
	"time"

	"go.mongodb.org/mongo-driver/v2/mongo"
)

const (
	mongoAuthTokenKey         = "token"
	mongoEmailKey             = "email"
	mongoVerificationTokenKey = "verificationToken"
)

var (
	// ErrEmailTaken is thrown when someone tries to sign up with an existing email
	ErrEmailTaken = errors.New("email is taken")
	// ErrBadLogin is thrown when incorrect credentials are provided
	ErrBadLogin = errors.New("invalid email or password")
	// ErrInvalidCookie is thrown when a user's cookie isn't valid
	ErrInvalidCookie = errors.New("cookie is invalid")
	// ErrInvalidVerificationToken is thrown when a user's verification token is invalid
	ErrInvalidVerificationToken = errors.New("invalid verification token")
)

// Controller controls the auth business logic
type Controller interface {
	GetUserFromCookie(ctx context.Context, cookie *http.Cookie) (globalTypes.CommonUser, error)

	CreateUser(ctx context.Context, request CreateUserRequest) (string, error)
	VerifyEmail(ctx context.Context, verificationToken string) (globalTypes.User, error)
	Login(ctx context.Context, email, password string) (globalTypes.User, error)
	ValidateToken(ctx context.Context, token string) (globalTypes.User, error)
	LogoutEverywhere(ctx context.Context, user globalTypes.User) error
	UpdatePassword(ctx context.Context, userUUID string, request UpdatePasswordRequest) error
}

// NewController creates a new auth controller
func NewController(unverifiedUserMongo jmongo.Mongo[types.UnverifiedUser], userController user.Controller, email jemail.Email) Controller {
	return &controller{
		unverifiedUserMongo: unverifiedUserMongo,
		userController:      userController,
		email:               email,
	}
}

type controller struct {
	userController      user.Controller
	unverifiedUserMongo jmongo.Mongo[types.UnverifiedUser]
	email               jemail.Email
}

func (c *controller) GetUserFromCookie(ctx context.Context, cookie *http.Cookie) (globalTypes.CommonUser, error) {
	if cookie == nil {
		return globalTypes.CommonUser{}, nil
	}

	if cookie.Value == "" {
		return globalTypes.CommonUser{}, nil
	}

	user, err := c.userController.GetUserByAuthToken(context.TODO(), cookie.Value)
	if err == globalTypes.ErrNotFound {
		return globalTypes.CommonUser{}, nil
	}
	if err != nil {
		return globalTypes.CommonUser{}, err
	}

	if !user.IsTokenValid() {
		return globalTypes.CommonUser{}, nil
	}

	ctxFullUser, ok := ctx.Value(jcontext.FullUserKey).(*globalTypes.User)
	if ok && ctxFullUser != nil {
		*ctxFullUser = user
	}

	return utils.UserToCommonUser(user), nil
}

// CreateUser creates a new unverified user and returns their verification token
func (c *controller) CreateUser(ctx context.Context, request CreateUserRequest) (string, error) {
	taken, err := c.userController.IsEmailTaken(ctx, request.Email)
	if err != nil {
		return "", err
	}
	if taken {
		return "", ErrEmailTaken
	}

	salt, hashedPassword, err := c.saltAndHashPassword(request.Password)
	if err != nil {
		return "", err
	}

	// To protect the user base and give me a reason to send emails (cool!) I require users to verify their
	// email to access their account. So, to keep our tables clean without having to figure out offline jobs yet,
	// we add unverified users to their own table with a TTL (1 hr at time of writing). The unverified record
	// is automatically deleted after an hour, and if someone tries to sign up with a fake email our database
	// remains clean and small without having to run some kind of cron job
	user := CreateRequestToUnverifiedUser(request, hashedPassword, salt)
	err = c.unverifiedUserMongo.InsertItem(ctx, user)
	if mongo.IsDuplicateKeyError(err) {
		return "", ErrEmailTaken
	}
	if err != nil {
		return "", err
	}

	tz := "EST"
	expiresAtEST, err := utils.ToEST(user.ExpiresAt)
	if err != nil {
		tz = "UTC"
		expiresAtEST = user.ExpiresAt
	}
	expiresAtStr := fmt.Sprintf("%s %s", expiresAtEST.Format("Jan 2 3:04pm"), tz)
	verificationURL := fmt.Sprintf("%s/verify?token=%s", federationUtils.GetAppURL(), user.VerificationToken)
	emailStr, err := jemail.HTMLTemplateToString(emails.VerifyTemplate, emails.VerificationEmailData{
		FirstName:       user.FirstName,
		VerificationURL: verificationURL,
		ExpiresStr:      expiresAtStr,
	})

	fullName := strings.TrimSpace(fmt.Sprintf("%s %s", user.FirstName, user.LastName))
	err = c.email.SendHTMLEmail(jemail.SendDetails{
		To: []jemail.EmailRecipient{{Email: user.Email, Name: fullName}},
	}, "Verify your email", emailStr)
	if err != nil {
		return "", err
	}

	return user.VerificationToken, nil
}

// VerifyEmail verifies that a user's email is real and stores their information in the permanent DB
func (c *controller) VerifyEmail(ctx context.Context, verificationToken string) (globalTypes.User, error) {
	// Let the TTL handle deleting the "unverified" record
	unverifiedUsers, err := c.unverifiedUserMongo.GetByKey(ctx, mongoVerificationTokenKey, verificationToken)
	if err != nil {
		return globalTypes.User{}, err
	}

	unverifiedUser := unverifiedUsers[0]
	if unverifiedUser.Void || time.Now().After(unverifiedUser.ExpiresAt) {
		return globalTypes.User{}, ErrInvalidVerificationToken
	}

	// Void this verification key so it can't be used again
	unverifiedUser.Void = true
	err = c.unverifiedUserMongo.UpdateItemByKey(
		ctx,
		"verificationToken",
		unverifiedUser.VerificationToken,
		unverifiedUser,
	)
	if err != nil {
		return globalTypes.User{}, err
	}

	userToken, userTokenValidTo := GenerateNewUserToken()
	return c.userController.CreateUser(ctx, unverifiedUser, userToken, userTokenValidTo)
}

func (c *controller) Login(ctx context.Context, email, password string) (globalTypes.User, error) {
	user, err := c.userController.GetUserByEmail(ctx, email)
	if err == globalTypes.ErrNotFound {
		return globalTypes.User{}, ErrBadLogin
	}
	if err != nil {
		return globalTypes.User{}, err
	}

	passwordIsValid, err := c.validatePassword(password, user)
	if err != nil {
		return globalTypes.User{}, err
	}
	if !passwordIsValid {
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

	err = c.userController.UpdateUserEntity(ctx, user)
	if err != nil {
		return globalTypes.User{}, err
	}

	return user, nil
}

func (c *controller) ValidateToken(ctx context.Context, token string) (globalTypes.User, error) {
	user, err := c.userController.GetUserByAuthToken(ctx, token)
	if err != nil {
		return globalTypes.User{}, nil
	}

	if !user.IsTokenValid() {
		return globalTypes.User{}, ErrInvalidCookie
	}

	return user, nil
}

func (c *controller) LogoutEverywhere(ctx context.Context, user globalTypes.User) error {
	user.Token = nil
	user.TokenValidTo = nil

	return c.userController.UpdateUserEntity(ctx, user)
}

func (c *controller) UpdatePassword(ctx context.Context, userUUID string, request UpdatePasswordRequest) error {
	user, err := c.userController.GetUserByUUID(ctx, userUUID)
	if err != nil {
		return err
	}

	passwordIsValid, err := c.validatePassword(request.Password, user)
	if err != nil {
		return err
	}
	if !passwordIsValid {
		return ErrBadLogin
	}

	salt, hashedPassword, err := c.saltAndHashPassword(request.NewPassword)
	if err != nil {
		return err
	}

	user.Salt = salt
	user.HashedPassword = hashedPassword
	return c.userController.UpdateUserEntity(ctx, user)
}

func (c *controller) saltAndHashPassword(password string) ([]byte, string, error) {
	salt, err := GenerateSalt()
	if err != nil {
		return nil, "", err
	}
	hashedPassword, err := HashPassword(salt, password)
	if err != nil {
		return nil, "", err
	}

	return salt, hashedPassword, nil
}

func (c *controller) validatePassword(password string, user globalTypes.User) (bool, error) {
	hashedPasswordGuess, err := HashPassword(user.Salt, password)
	if err != nil {
		return false, err
	}

	if hashedPasswordGuess != user.HashedPassword {
		return false, nil
	}

	return true, nil
}
