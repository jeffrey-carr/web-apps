package stats

type UserStats struct {
	UserUUID  string    `json:"userUUID" bson:"_id"`
	Binoku    GameStats `json:"binoku" bson:"binoku"`
	WordChain GameStats `json:"wordChain" bson:"wordChain"`
}

type GameStats struct {
	GameName       GameName `json:"gameName" bson:"gameName"`
	GamesPlayed    int      `json:"gamesPlayed" bson:"gamesPlayed"`
	GamesCompleted int      `json:"gamesCompleted" bson:"gamesCompleted"`
}

type GameName string

const (
	GameNameBinoku    GameName = "binoku"
	GameNameWordChain GameName = "word-chain"
)

type Type string

const (
	TypePlayed    Type = "played"
	TypeCompleted Type = "completed"
)
