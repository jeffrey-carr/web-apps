package utils

import (
	"context"
	"go-common/constants"
)

// AddIPToContext adds the specified IP address to the the provided context
func AddIPToContext(ctx context.Context, ip string) context.Context {
	return context.WithValue(ctx, constants.IPContextKey, ip)
}

// AddUAToContext adds the specified UA address to the the provided context
func AddUAToContext(ctx context.Context, ua string) context.Context {
	return context.WithValue(ctx, constants.UAContextKey, ua)
}

// GetIPFromContext gets the user IP from the provided context
func GetIPFromContext(ctx context.Context) string {
	if ip, ok := ctx.Value(constants.IPContextKey).(string); ok {
		return ip
	}

	return ""
}

// GetUAFromContext gets the user UA from the provided context
func GetUAFromContext(ctx context.Context) string {
	if ua, ok := ctx.Value(constants.UAContextKey).(string); ok {
		return ua
	}

	return ""
}
