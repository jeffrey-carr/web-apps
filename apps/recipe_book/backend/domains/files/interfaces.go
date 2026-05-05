package files

import (
	"context"
	"go-common/types"
)

// Controller represents a file controller
type Controller interface {
	UploadImage(ctx context.Context, createRequest CreateRequest, user types.CommonUser) (File, error)
	GetByUUID(ctx context.Context, uuid string) (File, error)
	DeleteFile(ctx context.Context, file File) error
}
