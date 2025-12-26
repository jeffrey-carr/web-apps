package user

import "go-common/types"

// BulkGetUsersRequest is used to get users in bulk
type BulkGetUsersRequest struct {
	UUIDs []string `json:"uuids"`
}

// UpdateUserRequest is used to update a user. Nil fields will be
// omitted from updates
type UpdateUserRequest struct {
	FirstName *string              `json:"fName"`
	LastName  *string              `json:"lName"`
	Character *types.UserCharacter `json:"character"`
}
