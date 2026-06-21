package constants

const (
	// RealIPHeaderKey is the key for the header value of X-Real-IP
	RealIPHeaderKey = "X-Real-IP"
	// IPHeaderKey is the key for the header value of X-Forwarded-For
	IPHeaderKey = "X-Forwarded-For"

	// IPContextKey is the key for the IP stored in the context
	IPContextKey = "userIP"
	// UAContextKey is the key for the UA stored in the context
	UAContextKey = "userUA"
)
