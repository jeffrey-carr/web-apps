package user

import (
	"federation/types"
	globalTypes "go-common/types"
	"go-common/utils"
	"time"
)

// UnverifiedUserToUser takes an unverified user and fills out the missing user info
// to complete the user's profile
func UnverifiedUserToUser(unverifiedUser types.UnverifiedUser, userToken string, userTokenValidTo time.Time) globalTypes.User {
	now := time.Now()
	return globalTypes.User{
		UUID:           utils.NewUUID(),
		Email:          unverifiedUser.Email,
		HashedPassword: unverifiedUser.HashedPassword,
		Salt:           unverifiedUser.Salt,
		FirstName:      unverifiedUser.FirstName,
		LastName:       unverifiedUser.LastName,
		Character:      unverifiedUser.Character,
		CreatedAt:      unverifiedUser.CreatedAt,
		ModifiedAt:     now,
		LastSeenAt:     now,

		// Generate a token when verifying email so the user is logged in immediately
		Token:        &userToken,
		TokenValidTo: &userTokenValidTo,
	}
}

// ApplyUserUpdateRequest applies filled in fields of a user update request to a user
func ApplyUserUpdateRequest(user globalTypes.User, request UpdateUserRequest) globalTypes.User {
	if request.FirstName != nil {
		user.FirstName = *request.FirstName
	}

	if request.LastName != nil {
		user.LastName = *request.LastName
	}

	if request.Character != nil {
		user.Character = *request.Character
	}

	return user
}
