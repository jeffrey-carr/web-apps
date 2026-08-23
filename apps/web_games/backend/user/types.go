package user

import (
	"go-common/types"
	"jeffs-web-games/stats"
)

// UserProfile represents a user of the site
type UserProfile struct {
	User  types.CommonUser `json:"user"`
	Stats stats.UserStats  `json:"stats"`
}
