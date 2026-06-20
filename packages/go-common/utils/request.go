package utils

import (
	"go-common/constants"
	"net/http"
	"strings"
)

// GetIPAddr gets the request IP address from the headers
func GetIPAddr(header http.Header) string {
	ip := header.Get(constants.RealIPHeaderKey)
	if ip == "" {
		ffIP := header.Get(constants.IPHeaderKey)
		if ffIP != "" {
			ip = strings.TrimSpace(strings.Split(ffIP, ",")[0])
		}
	}

	return ip
}
