package jlogging

type Layer string

const (
	// HandlerLayer represents the handler layer
	HandlerLayer Layer = "handlers"
	// ControllerLayer represents the controller layer
	ControllerLayer Layer = "controllers"
	// RepoLayer represents the repository layer
	RepoLayer Layer = "repos"
	// ServiceLayer represents the service layer
	ServiceLayer Layer = "services"
)

// These are some helpful constants for fields that could
// be common across apps. Keeping them consistent allows for
// easier aggregation later
const (
	UserUUIDLogLabel = "userUUID"
)
