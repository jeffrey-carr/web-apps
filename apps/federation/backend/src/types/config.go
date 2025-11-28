package types

// Config represents the options available in the configuration file
type Config struct {
	Environment        string `json:"environment"`
	MongoConnectionURL string `json:"mongoConnectionURL"`
	Port               string `json:"port"`
}
