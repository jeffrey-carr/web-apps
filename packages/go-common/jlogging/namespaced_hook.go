package jlogging

import "github.com/sirupsen/logrus"

type jNamespacedHook struct {
	namespaceKey string
	namespace    string
}

// NewNamespacedHook returns a hook that namespaces our loggers
// to avoid clobbering key types in my logs
func NewNamespacedHook(namespaceKey, namespace string) LoggingHook {
	return &jNamespacedHook{
		namespaceKey: namespaceKey,
		namespace:    namespace,
	}
}

func (jh *jNamespacedHook) Levels() []logrus.Level {
	return logrus.AllLevels
}

func (jh *jNamespacedHook) Fire(entry *logrus.Entry) error {
	appSpecificData, newData := make(logrus.Fields), make(logrus.Fields)

	globalKeys := map[string]bool{
		"environment":    true,
		UserUUIDLogLabel: true,
	}

	// Sort fields into global vs. namespaced
	for k, v := range entry.Data {
		if globalKeys[k] {
			newData[k] = v
		} else {
			appSpecificData[k] = v
		}
	}

	newData[jh.namespaceKey] = jh.namespace
	if len(appSpecificData) > 0 {
		newData[jh.namespace] = appSpecificData
	}
	entry.Data = newData

	return nil
}
