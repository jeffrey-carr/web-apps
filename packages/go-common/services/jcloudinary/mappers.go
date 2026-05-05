package jcloudinary

import "github.com/cloudinary/cloudinary-go/v2/api/uploader"

func uploadResultToFile(result *uploader.UploadResult) UploadedFile {
	if result == nil {
		return UploadedFile{}
	}

	return UploadedFile{
		PublicID:  result.PublicID,
		Height:    result.Height,
		Width:     result.Width,
		URL:       result.SecureURL,
		Format:    result.Format,
		CreatedAt: result.CreatedAt.UnixMilli(),
	}
}
