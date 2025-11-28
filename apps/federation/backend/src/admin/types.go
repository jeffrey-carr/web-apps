package admin

import "federation/types"

type CreateNewAPIKeyRequest struct {
	App string `json:"app"`
}

type RevokeAPIKeyRequest struct {
	Key types.APIKey `json:"key"`
}
