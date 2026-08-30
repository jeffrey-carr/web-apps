package types

import "go-common/constants"

// Config represents the configuration for the app
type Config struct {
	Environment        constants.Environment
	Port               string
	MongoURL           string
	FederationAPIKey   string
	CloudinaryAPIKey   string
	AxiomAPIKey        string
	AxiomDataset       string
	RedisConnectionURL string
}
