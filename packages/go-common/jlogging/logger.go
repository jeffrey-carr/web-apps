package jlogging

import (
	"go-common/constants"
	"os"

	"github.com/sirupsen/logrus"
)

// Logger represents a custom JLogger logger
type Logger interface {
	logrus.FieldLogger
}

// i dont need to explain you
type logger struct {
	*logrus.Entry
}

// LoggingService represents the JLogging logging
// service
type LoggingService interface {
	// NewLogger creates a new logger
	NewLogger(loggerID string, layer Layer) Logger
}

type loggingService struct {
	baseLog *logrus.Entry
}

// NewLoggingService creates a new JLogger logger
func NewLoggingService(
	hook OCILoggingHook,
	appName string,
) LoggingService {
	log := logrus.New()
	customFormatter := NewJFormatter(appName)
	log.SetFormatter(customFormatter)
	log.AddHook(hook)

	environment := os.Getenv(constants.EnvEnvironmentVar)
	if environment != string(constants.EnvProd) {
		environment = string(constants.EnvDev)
	}
	baseLog := log.WithField("environment", environment)

	return &loggingService{baseLog: baseLog}
}

func (ls *loggingService) NewLogger(loggerID string, layer Layer) Logger {
	return ls.baseLog.WithFields(logrus.Fields{
		"loggerID": loggerID,
		"layer":    layer,
	})
}
