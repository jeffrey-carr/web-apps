package types

// Config represents the options available in the configuration file
type Config struct {
	Environment         string `json:"environment"`
	MongoConnectionURL  string `json:"mongoConnectionURL"`
	Port                string `json:"port"`
	OracleCompartmentID string `json:"oracle_compartment_id"`
	OracleUser          string `json:"oracle_user"`
	OracleFingerprint   string `json:"oracle_fingerprint"`
	OracleKey           string `json:"oracle_key"`
	OracleTenancy       string `json:"oracle_tenancy"`
	OracleRegion        string `json:"oracle_region"`
}
