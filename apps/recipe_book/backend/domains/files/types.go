package files

import (
	"go-common/services/jcloudinary"
	"io"
)

// File represents a file
type File struct {
	UUID           string                    `json:"uuid" bson:"_id"`
	Name           string                    `json:"name" bson:"name"`
	MIME           string                    `json:"mime" bson:"mime"`
	OwnerUUID      string                    `json:"ownerUUID" bson:"ownerUUID"`
	URL            string                    `json:"url" bson:"url"`
	Size           int64                     `json:"size" bson:"size"`
	SHA256         string                    `json:"sha256" bson:"sha256"`
	Visibility     Visibility                `json:"visibility" bson:"visibility"`
	CloudinaryFile *jcloudinary.UploadedFile `json:"-" bson:"cloudinaryFile"`
	CreatedAt      int64                     `json:"createdAt" bson:"createdAt"`
}

// CreateRequest is the information required to create
// a new file
type CreateRequest struct {
	Name       string
	MIME       string
	Size       int64
	Visibility Visibility
	Data       io.ReadSeeker
}

// Visibility represents file visibility
type Visibility string

const (
	// PublicVisibility represents public files
	PublicVisibility Visibility = "public"
	// PrivateVisibility represents private files
	PrivateVisibility Visibility = "private"
)
