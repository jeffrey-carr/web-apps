package handlers

import (
	"context"
	"federation/auth"
	"federation/constants"
	"go-common/jcontext"
	"go-common/jhttp"
	JHTTPErrors "go-common/jhttp/errors"
	"go-common/jlogging"
	globalTypes "go-common/types"
	"go-common/utils"
	"net/http"
	"strings"
	"time"

	"github.com/sirupsen/logrus"
)

var badLoginErr = JHTTPErrors.NewBadRequestError("Invalid email or password")

// Auth handles auth requests
type Auth struct {
	controller auth.Controller
	logger     jlogging.Logger
}

// NewAuthHandler creates a new Auth handler
func NewAuthHandler(controller auth.Controller, logger jlogging.Logger) Auth {
	return Auth{
		controller: controller,
		logger:     logger,
	}
}

// CreateUser creates a new user
func (h *Auth) CreateUser(ctx context.Context, r jhttp.RequestData[auth.CreateUserRequest]) (*string, *JHTTPErrors.JHTTPError) {
	if r.Body == nil {
		return nil, JHTTPErrors.NewBadRequestError("Bad request")
	}

	request := *r.Body

	validationErr := auth.ValidateCreateUserRequest(request)
	if len(validationErr) != 0 {
		return nil, JHTTPErrors.NewBadRequestError(validationErr)
	}

	unverifiedUser, err := h.controller.CreateUser(ctx, request)
	if err == auth.ErrEmailTaken {
		return nil, JHTTPErrors.NewBadRequestError("An account with that email already exists")
	}
	if err != nil {
		return nil, JHTTPErrors.NewInternalServerError(err)
	}

	h.logger.WithFields(logrus.Fields{
		"email":     unverifiedUser.Email,
		"firstName": unverifiedUser.FirstName,
		"lastName":  unverifiedUser.LastName,
		"character": unverifiedUser.Character,
	}).Info("new user created")

	return utils.Ptr(unverifiedUser.VerificationToken), nil
}

// VerifyEmail verifies a user's email with their verification token
func (h *Auth) VerifyEmail(ctx context.Context, r jhttp.RequestData[struct{}]) (*globalTypes.CommonUser, *JHTTPErrors.JHTTPError) {
	if r.Query == nil {
		return nil, JHTTPErrors.NewBadRequestError("Verification token is required")
	}

	verificationToken := r.Query.Get("token")
	if verificationToken == "" {
		return nil, JHTTPErrors.NewBadRequestError("Verification token is required")
	}

	user, err := h.controller.VerifyEmail(ctx, verificationToken)
	if err == globalTypes.ErrNotFound || err == auth.ErrInvalidVerificationToken {
		return nil, JHTTPErrors.NewBadRequestError("Invalid verification token")
	}
	if err != nil {
		return nil, JHTTPErrors.NewInternalServerError(err)
	}

	cookie := auth.CreateAuthCookie(*user.Token, auth.CookieOpts{ExpiresAt: user.TokenValidTo})
	http.SetCookie(*r.Writer, &cookie)

	return utils.Ptr(utils.UserToCommonUser(user)), nil
}

// Login logs in a user and adds a Cookie to the response
func (h *Auth) Login(ctx context.Context, r jhttp.RequestData[auth.LoginRequest]) (*globalTypes.CommonUser, *JHTTPErrors.JHTTPError) {
	// If the user is in the context, they're already logged in
	if user, ok := jcontext.GetUser(ctx); ok {
		return &user, nil
	}

	if r.Body == nil {
		return nil, JHTTPErrors.NewBadRequestError(auth.ErrBadLogin.Error())
	}

	validationErr := auth.ValidateLoginRequest(*r.Body)
	if len(validationErr) != 0 {
		return nil, badLoginErr
	}

	email := strings.TrimSpace(r.Body.Email)
	password := strings.TrimSpace(r.Body.Password)
	user, err := h.controller.Login(ctx, email, password)
	if err == auth.ErrBadLogin {
		h.logger.WithField("email", email).Warn("failed login attempt")
		return nil, badLoginErr
	}
	if err != nil {
		return nil, JHTTPErrors.NewInternalServerError(err)
	}

	h.logger.WithField(jlogging.UserUUIDLogLabel, user.UUID).Info("successful login")

	cookie := auth.CreateAuthCookie(*user.Token, auth.CookieOpts{ExpiresAt: user.TokenValidTo})
	http.SetCookie(*r.Writer, &cookie)
	return utils.Ptr(utils.UserToCommonUser(user)), nil
}

// Logout logs the user out
func (h *Auth) Logout(ctx context.Context, r jhttp.RequestData[auth.LogoutRequest]) (*struct{}, *JHTTPErrors.JHTTPError) {
	var user globalTypes.User
	userPtr, ok := jcontext.GetFullUser(ctx)
	if !ok && userPtr != nil {
		return nil, nil
	}
	if userPtr != nil {
		user = *userPtr
	}
	logger := h.logger.WithField(jlogging.UserUUIDLogLabel, user.UUID)

	logoutEverywhere := false
	if r.Body != nil {
		logoutEverywhere = r.Body.LogoutEverywhere
	}
	logger = logger.WithField("logoutEverywhere", logoutEverywhere)

	if logoutEverywhere && ok {
		err := h.controller.LogoutEverywhere(ctx, user)
		if err != nil {
			logger.WithError(err).Error("failed to logout")
			return nil, JHTTPErrors.NewInternalServerError(err)
		}
	}

	cookie := auth.CreateAuthCookie("", auth.CookieOpts{MaxAge: utils.Ptr(time.Duration(0))})
	http.SetCookie(*r.Writer, &cookie)

	logger.Info("successfully logged out")
	return nil, nil
}

// ValidateCookie returns the user logged in via the cookie
func (h *Auth) ValidateCookie(ctx context.Context, r jhttp.RequestData[struct{}]) (*globalTypes.CommonUser, *JHTTPErrors.JHTTPError) {
	// Since the user is only added to the context if they are logged in, we can just check if the user was found
	user, ok := jcontext.GetUser(ctx)
	if !ok {
		return nil, JHTTPErrors.NewBadRequestError("No cookie")
	}

	return &user, nil
}

// UpdatePassword updates a user's password
func (h *Auth) UpdatePassword(ctx context.Context, r jhttp.RequestData[auth.UpdatePasswordRequest]) (*struct{}, *JHTTPErrors.JHTTPError) {
	userUUID, ok := r.PathValues[constants.UserUUIDPathVariable]
	if !ok || userUUID == "" {
		return nil, JHTTPErrors.NewBadRequestError("Invalid user")
	}

	logger := h.logger.WithField(jlogging.UserUUIDLogLabel, userUUID)

	authedUser, exists := jcontext.GetUser(ctx)
	if !exists || (authedUser.UUID != userUUID && !authedUser.IsAdmin) {
		return nil, JHTTPErrors.NewUnauthorizedError()
	}

	if r.Body == nil {
		return nil, JHTTPErrors.NewBadRequestError("Invalid password")
	}

	passwordValidationErr := auth.ValidatePassword(r.Body.NewPassword)
	if passwordValidationErr != "" {
		logger.
			WithField("validationErr", passwordValidationErr).
			Error("failed to update password: new password invalid")
		return nil, JHTTPErrors.NewValidationError(passwordValidationErr)
	}

	err := h.controller.UpdatePassword(ctx, userUUID, *r.Body)
	if err == globalTypes.ErrNotFound {
		logger.Error("failed to update password: unknown user")
		return nil, JHTTPErrors.NewBadRequestError("Unknown user")
	}
	if err == auth.ErrBadLogin {
		logger.Error("failed to update password: invalid current password")
		return nil, JHTTPErrors.NewUnauthorizedError()
	}
	if err != nil {
		logger.WithError(err).Error("failed to update password")
		return nil, JHTTPErrors.NewInternalServerError(err)
	}

	logger.Info("successfully updated password")

	return nil, nil
}
