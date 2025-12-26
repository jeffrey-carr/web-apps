package handlers

import (
	"context"
	"federation/auth"
	"federation/constants"
	"go-common/jcontext"
	"go-common/jhttp"
	JHTTPErrors "go-common/jhttp/errors"
	globalTypes "go-common/types"
	"go-common/utils"
	"net/http"
	"strings"
	"time"
)

// Auth handles auth requests
type Auth struct {
	controller auth.Controller
}

// NewAuthHandler creates a new Auth handler
func NewAuthHandler(controller auth.Controller) Auth {
	return Auth{
		controller: controller,
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

	verificationToken, err := h.controller.CreateUser(ctx, request)
	if err == auth.ErrEmailTaken {
		return nil, JHTTPErrors.NewBadRequestError("An account with that email already exists")
	}
	if err != nil {
		return nil, JHTTPErrors.NewInternalServerError(err)
	}

	return utils.Ptr(verificationToken), nil
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
		return nil, JHTTPErrors.NewBadRequestError(validationErr)
	}

	email := strings.TrimSpace(r.Body.Email)
	password := strings.TrimSpace(r.Body.Password)
	user, err := h.controller.Login(ctx, email, password)
	if err == auth.ErrBadLogin {
		return nil, JHTTPErrors.NewUnauthorizedError()
	}
	if err != nil {
		return nil, JHTTPErrors.NewInternalServerError(err)
	}

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

	logoutEverywhere := false
	if r.Body != nil {
		logoutEverywhere = r.Body.LogoutEverywhere
	}

	if logoutEverywhere && ok {
		err := h.controller.LogoutEverywhere(ctx, user)
		if err != nil {
			return nil, JHTTPErrors.NewInternalServerError(err)
		}
	}

	cookie := auth.CreateAuthCookie("", auth.CookieOpts{MaxAge: utils.Ptr(time.Duration(0))})
	http.SetCookie(*r.Writer, &cookie)
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

	authedUser, exists := jcontext.GetUser(ctx)
	if !exists || (authedUser.UUID != userUUID && !authedUser.IsAdmin) {
		return nil, JHTTPErrors.NewUnauthorizedError()
	}

	if r.Body == nil {
		return nil, JHTTPErrors.NewBadRequestError("Invalid password")
	}

	passwordValidationErr := auth.ValidatePassword(r.Body.NewPassword)
	if passwordValidationErr != "" {
		return nil, JHTTPErrors.NewValidationError(passwordValidationErr)
	}

	err := h.controller.UpdatePassword(ctx, userUUID, *r.Body)
	if err == globalTypes.ErrNotFound {
		return nil, JHTTPErrors.NewBadRequestError("Unknown user")
	}
	if err == auth.ErrBadLogin {
		return nil, JHTTPErrors.NewUnauthorizedError()
	}
	if err != nil {
		return nil, JHTTPErrors.NewInternalServerError(err)
	}

	return nil, nil
}
