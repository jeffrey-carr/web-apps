package files

import (
	"context"
	"go-common/services/jmongo"
	"recipe-book/domains/files"
)

// Repository represents a files repository
type Repository struct {
	filesClient jmongo.Mongo[files.File]
}

// NewRepository creates a new Files repository
func NewRepository(
	filesClient jmongo.Mongo[files.File],
) Repository {
	return Repository{
		filesClient: filesClient,
	}
}

// Put puts a file in the database
func (r Repository) Put(ctx context.Context, f files.File) error {
	return r.filesClient.InsertItem(ctx, f)
}

// GetByUUID gets a file by its UUID
func (r Repository) GetByUUID(ctx context.Context, uuid string) (files.File, error) {
	return r.filesClient.GetByUUID(ctx, uuid)
}
