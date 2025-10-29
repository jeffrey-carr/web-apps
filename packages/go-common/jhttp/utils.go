package jhttp

// ultimateJSONFailure returns an already-stringified JSON response
// when we fail to marshall a response
func ultimateJSONFailure() string {
	return "{\"statusCode\":500,\"message\":\"Server error\"}"
}
