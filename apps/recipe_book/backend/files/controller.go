package files

import (
	"context"
	"go-common/jlogging"
	"go-common/services/jcloudinary"
	"go-common/types"
	"go-common/utils"
	"recipe-book/domains/files"

	"github.com/cloudinary/cloudinary-go/v2/api/uploader"
)

// Controller represents a files controller
type Controller struct {
	Repository

	logger     jlogging.Logger
	cloudinary jcloudinary.Cloudinary
}

// NewController creates a new files controller
func NewController(logger jlogging.Logger, cloudinary jcloudinary.Cloudinary, repo Repository) Controller {
	return Controller{
		logger:     logger,
		cloudinary: cloudinary,
		Repository: repo,
	}
}

// UploadImage is for uploading a new file for a user
func (c Controller) UploadImage(ctx context.Context, createRequest files.CreateRequest, user types.CommonUser) (files.File, error) {
	logger := c.logger.WithField("action", "uploadImage")
	f, err := CreateRequestToFile(createRequest, user)
	if err != nil {
		logger.WithError(err).Error("failed to create file for image")
		return files.File{}, err
	}

	uploadedFile, err := c.cloudinary.UploadLocalFile(ctx, createRequest.Data, uploader.UploadParams{
		Folder: c.getCloudinaryFolder(),
	})
	if err != nil {
		logger.WithError(err).Error("failed to upload image")
		return files.File{}, err
	}
	f.CloudinaryFile = &uploadedFile
	f.URL = uploadedFile.URL

	logger.WithField("url", uploadedFile.URL).Info("uploaded image")
	return f, c.Put(ctx, f)
}

// DeleteFile deletes a file and its associated Cloudinary image
func (c Controller) DeleteFile(ctx context.Context, file files.File) error {
	logger := c.logger.WithField("fileID", file.UUID)
	if file.CloudinaryFile != nil {
		err := c.cloudinary.DeleteFiles(ctx, []string{file.CloudinaryFile.PublicID})
		if err != nil {
			logger.WithError(err).Error("failed to delete file from cloudinary")
			return err
		}
	}

	err := c.filesClient.DeleteItem(ctx, file.UUID)
	if err != nil {
		logger.WithError(err).Error("failed to delete file")
		return err
	}

	logger.Info("deleted file")
	return nil
}

func (c Controller) getCloudinaryFolder() string {
	if utils.IsProd() {
		return "recipe-book/prod"
	}

	return "recipe-book/dev"
}
