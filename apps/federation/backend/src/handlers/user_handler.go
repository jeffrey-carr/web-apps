package handlers

import (
	"context"
	"federation/constants"
	"federation/user"
	"go-common/jcontext"
	"go-common/jhttp"
	JHTTPErrors "go-common/jhttp/errors"
	globalTypes "go-common/types"
	"go-common/utils"
)

// User represents a user handler
type User struct {
	controller user.Controller
}

// NewUserHandler creates a new User handler
func NewUserHandler(controller user.Controller) User {
	return User{
		controller: controller,
	}
}

// GetUserByUUID gets a user by their UUID
func (h *User) GetUserByUUID(ctx context.Context, r jhttp.RequestData[struct{}]) (*globalTypes.CommonUser, *JHTTPErrors.JHTTPError) {
	userUUID, ok := r.PathValues[constants.UserUUIDPathVariable]
	if !ok {
		return nil, JHTTPErrors.NewBadRequestError("user UUID is required")
	}

	user, err := h.controller.GetUserByUUID(ctx, userUUID)
	if err == globalTypes.ErrNotFound {
		return nil, JHTTPErrors.NewNotFoundError(userUUID)
	}

	return utils.Ptr(utils.UserToCommonUser(user)), nil
}

// BulkGetUsersByUUIDs gets a buncha users. Should require an API key
func (h *User) BulkGetUsersByUUIDs(ctx context.Context, r jhttp.RequestData[user.BulkGetUsersRequest]) (*[]globalTypes.CommonUser, *JHTTPErrors.JHTTPError) {
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

	commonUsers := utils.Map(users, func(user globalTypes.User) globalTypes.CommonUser { return utils.UserToCommonUser(user) })
	return &commonUsers, nil
}

// UpdateUser updates a user
func (h *User) UpdateUser(ctx context.Context, r jhttp.RequestData[user.UpdateUserRequest]) (*globalTypes.CommonUser, *JHTTPErrors.JHTTPError) {
	userUUID, exists := r.PathValues[constants.UserUUIDPathVariable]
	if !exists || userUUID == "" {
		return nil, JHTTPErrors.NewUnauthorizedError()
	}
	authedUser, exists := jcontext.GetUser(ctx)
	if !exists || (userUUID != authedUser.UUID && !authedUser.IsAdmin) {
		return nil, JHTTPErrors.NewUnauthorizedError()
	}
	if r.Body == nil {
		return nil, JHTTPErrors.NewBadRequestError("Invalid request")
	}

	request := *r.Body
	if validationErr := user.ValidateUpdateRequest(request); validationErr != "" {
		return nil, JHTTPErrors.NewValidationError(validationErr)
	}

	updatedUser, err := h.controller.UpdateUser(ctx, userUUID, request)
	if err == globalTypes.ErrNotFound {
		return nil, JHTTPErrors.NewNotFoundError(userUUID)
	}
	if err != nil {
		return nil, JHTTPErrors.NewInternalServerError(err)
	}

	return utils.Ptr(utils.UserToCommonUser(updatedUser)), nil
}
