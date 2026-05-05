package types

// Config represents the configuration for the app
type Config struct {
	Environment      string `json:"environment"`
	Port             string `json:"port"`
	MongoURL         string `json:"mongo_connection_url"`
	FederationAPIKey string `json:"federation_api_key"`
	CloudinaryAPIKey string `json:"cloudinary_api_key"`
}
