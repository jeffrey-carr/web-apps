package types

// Config is the config for the app
type Config struct {
	Environment             string
	Port                    string
	MongoConnectionURL      string
	WordChainEncryptionFile string
	FederationAPIKey        string
}
