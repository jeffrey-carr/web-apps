package middlewares

import (
	"net/http"
)

// Cors represents cors middleware
type Cors struct {
	FrontendDomain string
}

// Name gets the name of the middleware
func (c Cors) Name() string {
	return "CORS"
}

// Apply applies the cors middleware
func (c Cors) Apply(w http.ResponseWriter, r *http.Request) (http.ResponseWriter, *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", c.FrontendDomain)
	// w.Header().Set("Access-Control-Allow-Methods", "GET, POST")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	return w, r
}
