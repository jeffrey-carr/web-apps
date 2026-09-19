package main

import (
	"go-common/types"
	"time"
)

const BracketDepth = 4

// Bear represents a fat bear
type Bear struct {
	ID       int    `json:"id" bson:"id"`
	Nickname string `json:"nickname" bson:"nickname"`
}

// Bracket represents a user's bracket choices
type Bracket struct {
	UUID           string              `json:"uuid" bson:"_id"`
	Title          string              `json:"title" bson:"title"`
	TournamentUUID string              `json:"tournamentUUID" bson:"tournamentUUID"`
	UserUUID       string              `json:"userUUID" bson:"userUUID"`
	User           *types.CommonUser   `json:"-" bson:"-"` // Hidden from frontend payload
	UserFName      string              `json:"userFName,omitempty" bson:"-"`
	UserLName      string              `json:"userLName,omitempty" bson:"-"`
	UserCharacter  types.UserCharacter `json:"userCharacter,omitempty" bson:"-"`

	// Choices represent the user's choices for the bracket
	Choices BracketTree[Bear] `json:"choices" bson:"choices"`
	// Score is the current score of the user's bracket
	Score int `json:"score" bson:"score"`
}

// Tournament represents a multi-user tournament
type Tournament struct {
	// JoinCode is the primary key
	JoinCode        string              `json:"joinCode" bson:"_id"`
	Title           string              `json:"title" bson:"title"`
	OwnerUUID       string              `json:"ownerUUID" bson:"ownerUUID"`
	JoinedUserUUIDs []string            `json:"joinedUserUUIDs" bson:"joinedUserUUIDs"`
	BannedUserUUIDs []string            `json:"bannedUserUUIDs" bson:"bannedUserUUIDs"`
	Owner           *types.CommonUser   `json:"-" bson:"-"` // Hidden from frontend payload
	OwnerFName      string              `json:"ownerFName,omitempty" bson:"-"`
	OwnerLName      string              `json:"ownerLName,omitempty" bson:"-"`
	OwnerCharacter  types.UserCharacter `json:"ownerCharacter,omitempty" bson:"-"`

	CreatedAt time.Time
}

// BracketTree represents the tree that holds bracket data
type BracketTree[T any] struct {
	Winner T               `json:"winner" bson:"winner"`
	Left   *BracketTree[T] `json:"left" bson:"left"`
	Right  *BracketTree[T] `json:"right" bson:"right"`
}
