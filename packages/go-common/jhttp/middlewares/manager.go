package middlewares

// Manager manages middleware for a server. It allows setting global middlewares
// that should be applied to every route
type Manager struct {
	Middlewares []Middleware
}

// WithMiddlewares allows attaching additional, temporary middlwares to a route
func (m Manager) WithMiddlewares(mws ...Middleware) Manager {
	return Manager{Middlewares: append(m.Middlewares, mws...)}
}
