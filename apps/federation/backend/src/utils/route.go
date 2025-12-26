package utils

import (
	"go-common/constants"
	"go-common/utils"
)

// GetAppURL gets the full URL of the app
func GetAppURL() string {
	if utils.GetEnv() == constants.EnvProd {
		return "https://login.jeffreycarr.dev"
	}

	return "http://login.jeffreycarr.local:5175"
}
