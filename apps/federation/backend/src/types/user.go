package types

import (
	"go-common/types"
	"time"
)

// UnverifiedUser holds all prelimiary data about a user before
// they verify their email address
type UnverifiedUser struct {
	VerificationToken string              `bson:"verificationToken"`
	Email             string              `bson:"email"`
	HashedPassword    string              `bson:"hashedPassword"`
	Salt              []byte              `bson:"salt"`
	FirstName         string              `bson:"fName"`
	LastName          string              `bson:"lName"`
	Character         types.UserCharacter `bson:"character"`
	CreatedAt         time.Time           `bson:"createdAt"`
	Void              bool                `bson:"void"`
	ExpiresAt         time.Time           `bson:"expiresAt"`
}
