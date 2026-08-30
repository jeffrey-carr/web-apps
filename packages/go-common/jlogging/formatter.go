package jlogging

import (
	"github.com/sirupsen/logrus"
)

type JFormatter interface {
	Format(*logrus.Entry) ([]byte, error)
}

type jFormatter struct {
	appName   string
	formatter logrus.JSONFormatter
}

// NewJFormatter creates a new custom log formatter
func NewJFormatter(appName string) JFormatter {
	return &jFormatter{
		appName:   appName,
		formatter: logrus.JSONFormatter{},
	}
}

func (f *jFormatter) Format(entry *logrus.Entry) ([]byte, error) {
	appSpecificData := make(logrus.Fields)
	globalData := make(logrus.Fields)

	// Fields you want at the root for cross-app Axiom queries
	globalKeys := map[string]bool{
		"trace_id":       true,
		"http_status":    true,
		"latency_ms":     true,
		UserUUIDLogLabel: true,
	}

	// Sort fields into global vs. namespaced
	for k, v := range entry.Data {
		if globalKeys[k] {
			globalData[k] = v
		} else {
			appSpecificData[k] = v
		}
	}

	// Always inject the app name for filtering
	globalData["app"] = f.appName

	// Nest the rest to prevent type clobbering
	if len(appSpecificData) > 0 {
		globalData[f.appName] = appSpecificData
	}

	newEntry := &logrus.Entry{
		Logger:  entry.Logger,
		Time:    entry.Time,
		Level:   entry.Level,
		Message: entry.Message,
		Data:    globalData,
	}

	return f.formatter.Format(newEntry)
}
