package jcloudinary

import (
	"context"
	"errors"
	"io"

	sdk "github.com/cloudinary/cloudinary-go/v2"
	"github.com/cloudinary/cloudinary-go/v2/api"
	"github.com/cloudinary/cloudinary-go/v2/api/admin"
	"github.com/cloudinary/cloudinary-go/v2/api/uploader"
)

// Cloudinary manages images in the cloud
type Cloudinary interface {
	UploadLocalFile(context.Context, io.Reader, uploader.UploadParams) (UploadedFile, error)
	DeleteFiles(ctx context.Context, fileIDs []string) error
}

type cloudinary struct {
	client *sdk.Cloudinary
}

// NewCloudinary creates a new Cloudinary client
func NewCloudinary(url string) (Cloudinary, error) {
	client, err := sdk.NewFromURL(url)
	if err != nil {
		return nil, err
	}

	return &cloudinary{
		client: client,
	}, nil
}

// UploadLocalFile uploads a local file to Cloudinary and returns the URL
func (c *cloudinary) UploadLocalFile(ctx context.Context, data io.Reader, opts uploader.UploadParams) (UploadedFile, error) {
	result, err := c.client.Upload.Upload(ctx, data, opts)
	if err != nil {
		return UploadedFile{}, err
	}
	if result == nil {
		return UploadedFile{}, errors.New("could not get result from Cloudinary")
	}

	return uploadResultToFile(result), nil
}

func (c *cloudinary) DeleteFiles(ctx context.Context, fileIDs []string) error {
	result, err := c.client.Admin.DeleteAssets(ctx, admin.DeleteAssetsParams{
		PublicIDs: api.CldAPIArray(fileIDs),
	})
	if err != nil {
		return err
	}
	if result != nil && result.Error.Message != "" {
		return errors.New(result.Error.Message)
	}

	return nil
}
