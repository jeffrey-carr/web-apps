package types

// Config represents the configuration for the app
type Config struct {
	Environment        string
	Port               string
	MongoURL           string
	FederationAPIKey   string
	CloudinaryAPIKey   string
	RedisConnectionURL string
}
