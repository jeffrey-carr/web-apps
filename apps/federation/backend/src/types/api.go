package types

import (
	"go-common/utils"
	"time"

	"go.mongodb.org/mongo-driver/v2/bson"
)

// APIKey represents an API key
type APIKey struct {
	Key        string     `json:"key" bson:"_id"`
	App        string     `json:"app" bson:"app"`
	IsActive   bool       `json:"isActive" bson:"isActive"`
	GrantedAt  time.Time  `json:"grantedAt" bson:"-"`
	RevokedAt  *time.Time `json:"revokedAt" bson:"-"`
	LastSeenAt time.Time  `json:"lastSeenAt" bson:"-"`
}

// apiKeyAlias is an alias with no methods to prevent infinite loop when marshalling/unmarshalling bson
type apiKeyAlias APIKey

// MarshalBSON implements custom BSON encoding for User.
// It converts TokenValidTo to an int64 (Unix ms) for storage.
func (k APIKey) MarshalBSON() ([]byte, error) {
	// Define an aux struct with the shape we want in Mongo
	type apiKeyBSON struct {
		APIKeyAlias apiKeyAlias `bson:",inline"`
		RevokedAt   *int64      `bson:"revokedAt,omitempty"` // stored as Unix ms
		GrantedAt   int64       `bson:"grantedAt"`           // stored as Unix ms
		LastSeenAt  int64       `bson:"lastSeenAt"`          // stored as Unix ms
	}

	var revokedAt *int64
	if k.RevokedAt != nil {
		revokedAt = utils.Ptr(k.RevokedAt.UnixMilli())
	}
	aux := apiKeyBSON{
		APIKeyAlias: apiKeyAlias(k),
		GrantedAt:   k.GrantedAt.UnixMilli(),
		LastSeenAt:  k.LastSeenAt.UnixMilli(),
		RevokedAt:   revokedAt,
	}

	return bson.Marshal(aux)
}

// UnmarshalBSON converts the stored token time (int64) to time.Time
func (k *APIKey) UnmarshalBSON(data []byte) error {
	aux := struct {
		APIKeyAlias apiKeyAlias `bson:",inline"`
		RevokedAt   *int64      `bson:"revokedAt,omitempty"`
		GrantedAt   int64       `bson:"grantedAt"`
		LastSeenAt  int64       `bson:"lastSeenAt"`
	}{}

	if err := bson.Unmarshal(data, &aux); err != nil {
		return err
	}

	*k = APIKey(aux.APIKeyAlias)
	k.GrantedAt = time.Unix(0, aux.GrantedAt*int64(time.Millisecond))
	k.LastSeenAt = time.Unix(0, aux.LastSeenAt*int64(time.Millisecond))
	if aux.RevokedAt != nil {
		k.RevokedAt = utils.Ptr(time.Unix(0, *aux.RevokedAt*int64(time.Millisecond)))
	}

	return nil
}
