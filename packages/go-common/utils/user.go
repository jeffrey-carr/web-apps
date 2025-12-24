package utils

import "go-common/types"

// UserToCommonUser converts a User into a global CommonUser
func UserToCommonUser(user types.User) types.CommonUser {
	return types.CommonUser{
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
