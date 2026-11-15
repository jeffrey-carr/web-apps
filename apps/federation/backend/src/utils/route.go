package utils

import (
	"go-common/constants"
	"go-common/utils"
)

// GetAppURL gets the full URL of the app
func GetAppURL() string {
	if constants.Environment(utils.GetEnv()) == constants.EnvProd {
		return "https://login.jeffreycarr.dev"
	}
	if constants.Environment(utils.GetEnv()) == constants.EnvStaging {
		return "http://login.lab.test"
	}

	return "http://login.jeffreycarr.local:5175"
}
