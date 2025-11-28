package middlewares

import (
	"context"
	"errors"
	"fmt"
	JHTTPErrors "go-common/jhttp/errors"
	"go-common/utils"
	"net/http"
	"slices"
	"strconv"
	"strings"
)

var alwaysAllowedMethods = utils.NewSet("OPTIONS")

// CORs handles cross origin requests. You pass it a list of allowed origins
// and methods that will apply to all requests
type CORs struct {
	// allowedOrigins is a list of domains or subdomains that are allowed
	// It allows for wildcards at the front or back (*.jeffreycarr.local:*)
	allowedOrigins   utils.Set[string]
	allowedMethods   utils.Set[string]
	allowedHeaders   utils.Set[string]
	allowCredentials bool
}

// NewCORs creates a new CORs middleware with the provided default origins/methods
func NewCORs() CORs {
	return CORs{
		allowedOrigins:   utils.NewSet("*"),
		allowedMethods:   utils.NewSet("*"),
		allowedHeaders:   utils.NewSet("*"),
		allowCredentials: true,
	}
}

// WithOrigins allows overriding the CORs origin
func (c CORs) WithOrigins(origins ...string) CORs {
	newCORs := c.clone()
	newCORs.allowedOrigins.Remove("*")

	if slices.Contains(origins, "*") {
		newCORs.allowedOrigins = utils.NewSet("*")
		return newCORs
	}

	newCORs.allowedOrigins.Add(origins...)
	return newCORs
}

// OverrideOrigins allows overriding the CORs origin
func (c CORs) OverrideOrigins(origins ...string) CORs {
	newCORs := c.clone()
	newCORs.allowedOrigins = utils.NewSet(origins...)
	return newCORs
}

// WithMethods adds additional methods on top of the default methods
func (c CORs) WithMethods(methods ...string) CORs {
	newCORs := c.clone()
	newCORs.allowedMethods.Remove("*")

	if slices.Contains(methods, "*") {
		newCORs.allowedMethods = utils.NewSet("*")
		return newCORs
	}

	newCORs.allowedMethods.Add(methods...)
	return newCORs
}

// OverrideMethods allows overriding default methods
func (c CORs) OverrideMethods(methods ...string) CORs {
	newCORs := c.clone()
	newCORs.allowedMethods = utils.NewSet(methods...)
	return newCORs
}

// WithHeaders allows adding additional headers
func (c CORs) WithHeaders(headers ...string) CORs {
	newCORs := c.clone()
	newCORs.allowedHeaders.Remove("*")

	if slices.Contains(headers, "*") {
		newCORs.allowedHeaders = utils.NewSet("*")
		return newCORs
	}

	newCORs.allowedHeaders.Add(headers...)
	return newCORs
}

// OverrideHeaders allows overriding default headers
func (c CORs) OverrideHeaders(headers ...string) CORs {
	newCORs := c.clone()
	newCORs.allowedHeaders = utils.NewSet(headers...)
	return newCORs
}

// WithCredentials sets whether we allow credentials on this endpoint
func (c CORs) WithCredentials(useCredentials bool) CORs {
	newCORs := c.clone()
	newCORs.allowCredentials = useCredentials
	return newCORs
}

// MatchOrigin matches the request origin with our allowed origins. Returns nil
// if it does not match on the origin
func (c CORs) MatchOrigin(requestOrigin string) (string, bool) {
	fmt.Printf("MatchOrigin for %s\n", requestOrigin)
	if c.allowedOrigins.Has("*") {
		fmt.Println("All origins are allowed, allowing")
		return requestOrigin, true
	}

	requestParts := strings.Split(requestOrigin, ".")
	if len(requestParts) < 1 {
		return "", false
	}

	for origin := range c.allowedOrigins.Iter {
		fmt.Printf("Comparing %s to %s\n", origin, requestOrigin)
		originParts := strings.Split(origin, ".")
		if len(originParts) > len(requestParts) {
			continue
		}

		for i, part := range originParts {
			if part == "*" {
				continue
			}
			requestPart := requestParts[i]

			// If this is the last item in the origin, check if it has a port
			if i == len(originParts)-1 {
				finalParts := strings.Split(part, ":")
				// If it has a port and it is a wildcard port, just match on the non-port portion
				// of the part. In all other cases, we can just straight up compare parts
				if len(finalParts) > 1 && finalParts[1] == "*" {
					if finalParts[0] != strings.Split(requestPart, ":")[0] {
						// If they don't match, break this loop to move on to the next origin in the list
						break
					} else {
						// If they do match, this is the last part in the origin so we can confirm a match
						return requestOrigin, true
					}
				}
			}

			if part == requestParts[i] {
				if i == len(originParts)-1 {
					return requestOrigin, true
				}
			} else {
				break
			}
		}
	}

	return "", false
}

func (c CORs) clone() CORs {
	return CORs{
		allowedOrigins:   c.allowedOrigins.Clone(),
		allowedMethods:   c.allowedMethods.Clone(),
		allowedHeaders:   c.allowedHeaders.Clone(),
		allowCredentials: c.allowCredentials,
	}
}

// Apply applies the CORs headers
func (c CORs) Apply(ctx context.Context, w http.ResponseWriter, r *http.Request) (context.Context, *JHTTPErrors.JHTTPError) {
	if w == nil {
		return ctx, JHTTPErrors.NewInternalServerError(errors.New("error getting writer"))
	}

	origin := r.Header.Get("Origin")
	// No origin means it isn't a cross-origin request, so no CORs headers to apply
	if origin == "" {
		return ctx, nil
	}

	matchedOrigin, matched := c.MatchOrigin(origin)
	if !matched {
		return ctx, JHTTPErrors.NewUnauthorizedError()
	}

	allMethods := append(alwaysAllowedMethods.ToSlice(), c.allowedMethods.ToSlice()...)
	methods := strings.Join(allMethods, ",")
	headers := strings.Join(c.allowedHeaders.ToSlice(), ",")

	w.Header().Set("Access-Control-Allow-Origin", matchedOrigin)
	w.Header().Set("Access-Control-Allow-Methods", methods)
	w.Header().Set("Access-Control-Allow-Headers", headers)
	w.Header().Set("Access-Control-Allow-Credentials", strconv.FormatBool(c.allowCredentials))

	if r.Method == http.MethodOptions {
		return nil, JHTTPErrors.NewEmptyOKError()
	}

	return ctx, nil
}
