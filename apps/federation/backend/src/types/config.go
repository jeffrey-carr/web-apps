package types

// Config represents the options available in the configuration file
type Config struct {
	// Setup
	Environment     string `json:"environment"`
	Port            string `json:"port"`
	HourlyRateLimit int    `json:"hourlyRateLimit"`

	// Connections
	MongoConnectionURL  string `json:"mongoConnectionURL"`
	OracleCompartmentID string `json:"oracle_compartment_id"`
	OracleUser          string `json:"oracle_user"`
	OracleFingerprint   string `json:"oracle_fingerprint"`
	OracleKey           string `json:"oracle_key"`
	OracleTenancy       string `json:"oracle_tenancy"`
	OracleRegion        string `json:"oracle_region"`
	RedisConnectionURL  string `json:"redisConnectionURL"`
}
