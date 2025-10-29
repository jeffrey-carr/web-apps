package utils

import (
	"bufio"
	"os"
	"strings"
)

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
