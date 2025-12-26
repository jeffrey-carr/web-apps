package types

import (
	"time"
)

// CommonUser represents a User with all sensitive info
// stripped away
type CommonUser struct {
	UUID       string        `json:"uuid"`
	Email      string        `json:"email"`
	FName      string        `json:"fName"`
	LName      string        `json:"lName"`
	IsAdmin    bool          `json:"isAdmin"`
	Character  UserCharacter `json:"character"`
	CreatedAt  time.Time     `json:"createdAt"`
	ModifiedAt time.Time     `json:"modifiedAt"`
	LastSeenAt time.Time     `json:"lastSeenAt"`
}

// UserCharacter is a character a user can be
type UserCharacter string

const (
	// Mystery weesnaw
	Mystery = UserCharacter("???")
	// CTRLZilla is a character
	CTRLZilla = UserCharacter("ctrlzilla")
	// WandaConda is a character
	WandaConda = UserCharacter("wandaconda")
	// EyezacScreamalot is a character
	EyezacScreamalot = UserCharacter("eyezac_screamalot")
	// WaddleCombs is a character
	WaddleCombs = UserCharacter("waddle_combs")
	// GlitchardSimmons is a character
	GlitchardSimmons = UserCharacter("glitchard_simmons")
	// AlienDegeneres is a character
	AlienDegeneres = UserCharacter("alien_degeneres")
)

// AvailableCharacters is a slice of all the characters available to users
var AvailableCharacters = []UserCharacter{
	Mystery, CTRLZilla, WandaConda, EyezacScreamalot,
	WaddleCombs, GlitchardSimmons, AlienDegeneres,
}

// User represents the full user entity
type User struct {
	UUID           string        `bson:"_id"`
	Email          string        `bson:"email"`
	HashedPassword string        `bson:"hashedPassword"`
	Salt           []byte        `bson:"salt"`
	FirstName      string        `bson:"fName"`
	LastName       string        `bson:"lName"`
	Token          *string       `bson:"token"`
	IsAdmin        bool          `bson:"isAdmin"`
	Character      UserCharacter `bson:"character"`
	TokenValidTo   *time.Time    `bson:"tokenValidTo"`
	CreatedAt      time.Time     `bson:"createdAt"`
	ModifiedAt     time.Time     `bson:"modifiedAt"`
	LastSeenAt     time.Time     `bson:"lastSeenAt"`
}

// userAlias is an alias with no methods to prevent infinite loop when marshalling/unmarshalling bson
type userAlias User

// IsTokenValid returns whether or not a user's token is still valid
func (u *User) IsTokenValid() bool {
	if u.Token == nil || u.TokenValidTo == nil {
		return false
	}

	return time.Now().Before(*u.TokenValidTo)
}
