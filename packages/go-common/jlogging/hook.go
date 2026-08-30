package jlogging

import "github.com/sirupsen/logrus"

// LoggingHook is a special hook for a logger to write
// to that publishes to OCI
type LoggingHook interface {
	// Levels reports the levels this logging hook
	// pays attention to
	Levels() []logrus.Level
	// Fire is called on every log entry
	Fire(*logrus.Entry) error
}
