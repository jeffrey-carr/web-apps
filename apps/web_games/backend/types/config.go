package types

import "go-common/constants"

// Config is the config for the app
type Config struct {
	Environment             constants.Environment
	Port                    string
	MongoConnectionURL      string
	WordChainEncryptionFile string
	FederationAPIKey        string
	AxiomAPIKey             string
	AxiomDataset            string
}
