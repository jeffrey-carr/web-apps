package constants

// Environment represents valid environment types
type Environment string

const (
	// EnvProd represents the prod environment
	EnvProd Environment = "prod"
	// EnvDev represents the dev environment
	EnvDev            Environment = "dev"
	EnvEnvironmentVar string      = "ENVIRONMENT"
)
