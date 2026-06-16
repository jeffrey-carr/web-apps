package utils

import (
	"net/http"
	"strings"
)

// GetIPAddr gets the request IP address from the headers
func GetIPAddr(header http.Header) string {
	ip := header.Get("X-Real-IP")
	if ip == "" {
		ffIP := header.Get("X-Forwarded-For")
		if ffIP != "" {
			ip = strings.TrimSpace(strings.Split(ffIP, ", ")[0])
		}
	}

	return ip
}
