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
func (h *Auth) CreateUser(ctx context.Context, r jhttp.RequestData[auth.CreateUserRequest]) (*globalTypes.CommonUser, *JHTTPErrors.JHTTPError) {
	if r.Body == nil {
		return nil, JHTTPErrors.NewBadRequestError("Bad request")
	}

	request := *r.Body

	validationErr := auth.ValidateCreateUserRequest(request)
	if len(validationErr) != 0 {
		return nil, JHTTPErrors.NewBadRequestError(validationErr)
	}

	user, err := h.controller.CreateUser(ctx, request)
	if err == auth.ErrEmailTaken {
		return nil, JHTTPErrors.NewBadRequestError("An account with that email already exists")
	}
	if err != nil {
		return nil, JHTTPErrors.NewInternalServerError(err)
	}

	return utils.Ptr(auth.UserToCommonUser(user)), nil
}

// GetUserByUUID gets a user from the database. Should require an API key
func (h *Auth) GetUserByUUID(ctx context.Context, r jhttp.RequestData[struct{}]) (*globalTypes.CommonUser, *JHTTPErrors.JHTTPError) {
	userUUID, ok := r.PathValues[constants.UserUUIDPathVariable]
	if !ok {
		return nil, JHTTPErrors.NewBadRequestError("user UUID is required")
	}

	user, err := h.controller.GetUserByUUID(ctx, userUUID)
	if err == globalTypes.ErrNotFound {
		return nil, JHTTPErrors.NewNotFoundError()
	}

	return utils.Ptr(auth.UserToCommonUser(user)), nil
}

// BulkGetUsersByUUIDs gets a buncha users. Should require an API key
func (h *Auth) BulkGetUsersByUUIDs(ctx context.Context, r jhttp.RequestData[auth.BulkGetUsersRequest]) (*[]globalTypes.CommonUser, *JHTTPErrors.JHTTPError) {
	if r.Body == nil {
		return nil, JHTTPErrors.NewBadRequestError("Bad request")
	}

	uuids := r.Body.UUIDs
	if len(uuids) == 0 {
		return nil, nil
	}
	if len(uuids) > 10000 {
		return nil, JHTTPErrors.NewBadRequestError("Cannot get more than 10000 users at a time")
	}

	users, err := h.controller.GetUsersByUUIDs(ctx, uuids)
	if err != nil {
		return nil, JHTTPErrors.NewInternalServerError(err)
	}

	commonUsers := utils.Map(users, func(user globalTypes.User) globalTypes.CommonUser { return auth.UserToCommonUser(user) })
	return &commonUsers, nil
}

// Login logs in a user and adds a Cookie to the response
func (h *Auth) Login(ctx context.Context, r jhttp.RequestData[auth.LoginRequest]) (*struct{}, *JHTTPErrors.JHTTPError) {
	// If the user is in the context, they're already logged in
	if _, ok := jcontext.GetUser(ctx); ok {
		return nil, nil
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
	return nil, nil
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
