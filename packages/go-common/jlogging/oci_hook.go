package jlogging

import (
	"context"
	"errors"
	"fmt"
	"time"

	"go-common/utils"

	"github.com/oracle/oci-go-sdk/v65/common"
	"github.com/oracle/oci-go-sdk/v65/loggingingestion"
	"github.com/sirupsen/logrus"
)

type ociLoggingHook struct {
	client loggingingestion.LoggingClient
	logs   chan loggingingestion.LogEntry

	// Configurable settings
	logID        string
	batchSize    int
	batchTimeout time.Duration
}

func NewOCILoggingHook(config common.ConfigurationProvider, logID string) (LoggingHook, error) {
	client, err := loggingingestion.NewLoggingClientWithConfigurationProvider(config)
	if err != nil {
		return nil, err
	}

	work := make(chan loggingingestion.LogEntry, 1000)
	hook := ociLoggingHook{
		client:       client,
		logID:        logID,
		logs:         work,
		batchTimeout: 3 * time.Second,
		batchSize:    100,
	}
	err = hook.startWorker()
	if err != nil {
		return nil, err
	}

	return &hook, nil
}

func (oci *ociLoggingHook) Levels() []logrus.Level {
	return logrus.AllLevels
}

func (oci *ociLoggingHook) Fire(entry *logrus.Entry) error {
	if oci.logs == nil {
		return errors.New("logging worker not started")
	}

	bytes, err := entry.Logger.Formatter.Format(entry)
	if err != nil {
		return err
	}

	logEntry := loggingingestion.LogEntry{
		Id:   common.String(utils.NewUUID()),
		Data: common.String(string(bytes)),
		Time: &common.SDKTime{Time: entry.Time},
	}

	select {
	case oci.logs <- logEntry:
	default:
	}
	return nil
}

// startWorker starts the worker that sends the logs
// to OCI. Manages batching
func (oci *ociLoggingHook) startWorker() error {
	if oci.logs == nil {
		return errors.New("logs channel not defined")
	}

	freshBatch := func() []loggingingestion.LogEntry {
		return make([]loggingingestion.LogEntry, 0, oci.batchSize)
	}

	go func() {
		batch := freshBatch()
		ticker := time.NewTicker(oci.batchTimeout)
		defer ticker.Stop()

		for {
			select {
			case data := <-oci.logs:
				batch = append(batch, data)
				if len(batch) >= oci.batchSize {
					go oci.flush(batch)
					batch = freshBatch()
				}
			case <-ticker.C:
				if len(batch) == 0 {
					continue
				}

				go oci.flush(batch)
				batch = freshBatch()
			}
		}
	}()

	return nil
}

// flush actually sends the logs to OCI.
func (oci *ociLoggingHook) flush(logs []loggingingestion.LogEntry) {
	req := loggingingestion.PutLogsRequest{
		LogId: common.String(oci.logID),
		PutLogsDetails: loggingingestion.PutLogsDetails{
			Specversion: common.String("1.0"),
			LogEntryBatches: []loggingingestion.LogEntryBatch{
				{
					Source:              common.String("go-backend"),
					Type:                common.String("logrus"),
					Defaultlogentrytime: &common.SDKTime{Time: time.Now()},
					Entries:             logs,
				},
			},
		},
	}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	_, err := oci.client.PutLogs(ctx, req)
	if err != nil {
		// TODO: should write logs to a fallback location
		fmt.Printf("Failed to flush logs: %v\n", err)
	}
}
