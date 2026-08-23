package stats

import (
	"fmt"
	"go-common/types"
)

// NewUserStats creates a new, empty user stats object
func NewUserStats(user types.CommonUser) UserStats {
	return UserStats{
		UserUUID:  user.UUID,
		Binoku:    GameStats{GameName: GameNameBinoku},
		WordChain: GameStats{GameName: GameNameWordChain},
	}
}

func UpdateGameStats(userStats UserStats, game GameName, statType Type) (UserStats, error) {
	updateGameStat := func(gameStat GameStats) (GameStats, error) {
		switch statType {
		case TypePlayed:
			gameStat.GamesPlayed++
		case TypeCompleted:
			// There can't be more completed games than played games. Something must have gone wrong,
			// or the user is re-submitting the same game over and over. We could probably check for that,
			// but maybe another time
			gameStat.GamesCompleted = min(gameStat.GamesPlayed, gameStat.GamesCompleted+1)
		default:
			return gameStat, fmt.Errorf("unknown stat type: %v", statType)
		}

		return gameStat, nil
	}

	if game == GameNameBinoku {
		updatedStats, err := updateGameStat(userStats.Binoku)
		if err != nil {
			return UserStats{}, err
		}

		userStats.Binoku = updatedStats
		return userStats, nil
	}

	if game == GameNameWordChain {
		updatedStats, err := updateGameStat(userStats.WordChain)
		if err != nil {
			return UserStats{}, err
		}

		userStats.WordChain = updatedStats
		return userStats, nil
	}

	return userStats, fmt.Errorf("unknown game: %v", game)
}
