package jcloudinary

type UploadedFile struct {
	PublicID  string `json:"publicID" bson:"publicID"`
	Height    int    `json:"height" bson:"height"`
	Width     int    `json:"width" bson:"width"`
	URL       string `json:"url" bson:"url"`
	Format    string `json:"format" bson:"format"`
	CreatedAt int64  `json:"time" bson:"time"`
}
