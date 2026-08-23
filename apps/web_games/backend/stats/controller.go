package stats

import (
	"context"
	"go-common/services/jmongo"
	"go-common/types"
)

type Controller interface {
	// Create creats a new empty set of stats for a user
	Create(context.Context, types.CommonUser) (UserStats, error)
	// GetOrCreateUserStats gets the user's stats, or creates a new set of empty stats
	// if they don't have any
	GetOrCreateUserStats(ctx context.Context, user types.CommonUser) (UserStats, error)
	// UpdateGameStats updates a particular stat of a particular game
	UpdateGameStats(context.Context, types.CommonUser, GameName, Type) (UserStats, error)
}

type controller struct {
	repo jmongo.Mongo[UserStats]
}

func NewController(repo jmongo.Mongo[UserStats]) Controller {
	return &controller{repo: repo}
}

func (c *controller) Create(ctx context.Context, user types.CommonUser) (UserStats, error) {
	stats := NewUserStats(user)
	return stats, c.repo.InsertItem(ctx, stats)
}

func (c *controller) GetOrCreateUserStats(ctx context.Context, user types.CommonUser) (UserStats, error) {
	stats, err := c.repo.GetByUUID(ctx, user.UUID)
	if err == types.ErrNotFound {
		stats, err = c.Create(ctx, user)
	}
	if err != nil {
		return UserStats{}, err
	}

	return stats, nil
}

func (c *controller) UpdateGameStats(ctx context.Context, user types.CommonUser, gameName GameName, statsType Type) (UserStats, error) {
	stats, err := c.GetOrCreateUserStats(ctx, user)
	if err != nil {
		return UserStats{}, err
	}

	updatedStats, err := UpdateGameStats(stats, gameName, statsType)
	if err != nil {
		return stats, err
	}

	err = c.repo.UpdateItem(ctx, user.UUID, updatedStats)
	return stats, err
}
