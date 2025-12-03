package utils

import (
	"bufio"
	"go-common/constants"
	"os"
	"strings"
)

// ReadEnv reads an environment config file and returns it as a map
func ReadEnv(path string) (map[string]string, error) {
	envFile, err := os.Open(path)
	if err != nil {
		return nil, err
	}
	defer envFile.Close()

	envVars := map[string]string{}
	scanner := bufio.NewScanner(envFile)
	for scanner.Scan() {
		line := scanner.Text()
		parts := strings.Split(line, "=")
		if len(parts) == 2 {
			envVars[parts[0]] = parts[1]
		}
	}

	return envVars, scanner.Err()
}

// GetEnv gets the current environment
func GetEnv() string {
	liveEnv := os.Getenv(constants.EnvEnvironmentVar)
	switch liveEnv {
	case constants.EnvProd:
		return constants.EnvProd
	default:
		return constants.EnvDev
	}
}
