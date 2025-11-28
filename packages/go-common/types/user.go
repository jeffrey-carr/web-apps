package types

import (
	"go-common/utils"
	"time"

	"go.mongodb.org/mongo-driver/v2/bson"
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

type UserCharacter string

const (
	Mystery          = UserCharacter("???")
	CTRLZilla        = UserCharacter("ctrlzilla")
	WandaConda       = UserCharacter("wandaconda")
	EyezacScreamalot = UserCharacter("eyezac_screamalot")
	WaddleCombs      = UserCharacter("waddle_combs")
	GlitchardSimmons = UserCharacter("glitchard_simmons")
	AlienDegeneres   = UserCharacter("alien_degeneres")
)

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
	TokenValidTo   *time.Time    `bson:"-"`
	CreatedAt      time.Time     `bson:"-"`
	ModifiedAt     time.Time     `bson:"-"`
	LastSeenAt     time.Time     `bson:"-"`
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

// MarshalBSON implements custom BSON encoding for User.
// It converts TokenValidTo to an int64 (Unix ms) for storage.
func (u User) MarshalBSON() ([]byte, error) {
	// Define an aux struct with the shape we want in Mongo
	type userBSON struct {
		UserAlias    userAlias `bson:",inline"`
		TokenValidTo *int64    `bson:"tokenValidTo"` // stored as Unix ms
		CreatedAt    int64     `bson:"createdAt"`    // stored as Unix ms
		ModifiedAt   int64     `bson:"modifiedAt"`   // stored as Unix ms
		LastSeenAt   int64     `bson:"lastSeenAt"`   // stored as Unix ms
	}

	var tokenValidTo *int64
	if u.TokenValidTo != nil {
		tokenValidTo = utils.Ptr(u.TokenValidTo.UnixMilli())
	}
	aux := userBSON{
		UserAlias:    userAlias(u),
		TokenValidTo: tokenValidTo,
		CreatedAt:    u.CreatedAt.UnixMilli(),
		ModifiedAt:   u.ModifiedAt.UnixMilli(),
		LastSeenAt:   u.LastSeenAt.UnixMilli(),
	}

	return bson.Marshal(aux)
}

// UnmarshalBSON converts the stored token time (int64) to time.Time
func (u *User) UnmarshalBSON(data []byte) error {
	aux := struct {
		UserAlias    userAlias `bson:",inline"`
		TokenValidTo *int64    `bson:"tokenValidTo"`
		CreatedAt    int64     `bson:"createdAt"`
		ModifiedAt   int64     `bson:"modifiedAt"`
		LastSeenAt   int64     `bson:"lastSeenAt"`
	}{}

	if err := bson.Unmarshal(data, &aux); err != nil {
		return err
	}

	*u = User(aux.UserAlias)
	u.CreatedAt = time.Unix(0, aux.CreatedAt*int64(time.Millisecond))
	u.ModifiedAt = time.Unix(0, aux.ModifiedAt*int64(time.Millisecond))
	u.LastSeenAt = time.Unix(0, aux.LastSeenAt*int64(time.Millisecond))
	if aux.TokenValidTo != nil {
		u.TokenValidTo = utils.Ptr(time.Unix(0, *aux.TokenValidTo*int64(time.Millisecond)))
	}

	return nil
}
