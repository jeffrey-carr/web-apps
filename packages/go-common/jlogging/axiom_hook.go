package jlogging

import (
	adapter "github.com/axiomhq/axiom-go/adapters/logrus"
	"github.com/axiomhq/axiom-go/axiom"
)

// NewAxiomLoggingHook creates a new Axiom logging hook for logrus
func NewAxiomLoggingHook(apiKey, dataset string) (LoggingHook, func(), error) {
	hook, err := adapter.New(
		adapter.SetClientOptions(
			axiom.SetAPITokenConfig(apiKey),
			axiom.SetEdge("us-east-1.aws.edge.axiom.co"),
		),
		adapter.SetDataset(dataset),
	)
	if err != nil {
		return nil, nil, err
	}

	return hook, func() { hook.Close() }, nil
}
