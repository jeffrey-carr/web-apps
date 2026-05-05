package files

import (
	"crypto/sha256"
	"encoding/hex"
	"fmt"
	"go-common/types"
	"go-common/utils"
	"io"
	"recipe-book/domains/files"
	"time"
)

// CreateRequestToFile takes a file create request and fleshes it out into a full file
func CreateRequestToFile(request files.CreateRequest, user types.CommonUser) (files.File, error) {
	data, err := io.ReadAll(request.Data)
	if err != nil {
		return files.File{}, err
	}
	_, err = request.Data.Seek(0, 0)
	if err != nil {
		return files.File{}, fmt.Errorf("failed to seek reader to beginning: %w", err)
	}

	hasher := sha256.New()
	hasher.Write(data)
	hashBytes := hasher.Sum(nil)

	return files.File{
		UUID:       utils.NewUUID(),
		Name:       request.Name,
		MIME:       request.MIME,
		OwnerUUID:  user.UUID,
		Size:       request.Size,
		SHA256:     hex.EncodeToString(hashBytes),
		Visibility: request.Visibility,
		CreatedAt:  time.Now().UnixMilli(),
	}, nil
}
