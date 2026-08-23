package user

import (
	"context"
	"go-common/types"
	"jeffs-web-games/stats"
)

type Controller interface {
	GetMe(context.Context, types.CommonUser) (UserProfile, error)
}

type controller struct {
	stats stats.Controller
}

func NewController(statsController stats.Controller) Controller {
	return &controller{stats: statsController}
}

// GetMe gets the user profile of the logged in user
func (c *controller) GetMe(ctx context.Context, user types.CommonUser) (UserProfile, error) {
	profile := UserProfile{User: user}

	stats, err := c.stats.GetOrCreateUserStats(ctx, user)
	if err != nil {
		return profile, err
	}
	profile.Stats = stats

	return profile, nil
}
