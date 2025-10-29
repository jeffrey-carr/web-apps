package types

type StoredObject struct {
	UUID       string `json:"uuid" bson:"_id"`
	UserUUID   string `json:"userUUID" bson:"userUUID"`
	Namespace  string `json:"namespace" bson:"namespace"`
	Bucket     string `json:"bucket" bson:"bucket"`
	ObjectName string `json:"objectName" bson:"objectName"`
	Size       int64  `json:"size" bson:"size"`
	ETag       string `json:"etag" bson:"etag"`
	SHA256     string `json:"sha256" bson:"sha256"`
}
