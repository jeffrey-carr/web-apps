package services

import (
	"context"
	"errors"
	"fmt"
	"io"
	"os"
	"time"

	"github.com/oracle/oci-go-sdk/v65/common"
	"github.com/oracle/oci-go-sdk/v65/objectstorage"
)

type OracleFileStorage interface {
	Upload(
		ctx context.Context,
		bucket, objectName string,
		body io.ReadCloser,
		size int64,
		contentType string,
		metadata map[string]string,
	) (string, error)
	GetNamespace() string
	GeneratePAR(
		ctx context.Context,
		bucketName, objectName string,
		expiresIn time.Duration,
	) (string, error)
}

type oracleFileStorage struct {
	client    objectstorage.ObjectStorageClient
	namespace string
	region    string
}

func NewOracle(
	tenancyOCID string,
	userOCID string,
	region string,
	fingerprint string,
	privateKeyPath string,
	passphrase *string,
) (OracleFileStorage, error) {
	if privateKeyPath == "" {
		panic("No private key provided")
	}

	privateKey, err := os.ReadFile(privateKeyPath)
	if err != nil {
		return nil, err
	}

	provider := common.NewRawConfigurationProvider(
		tenancyOCID, userOCID, region, fingerprint, string(privateKey), passphrase,
	)

	client, err := objectstorage.NewObjectStorageClientWithConfigurationProvider(provider)
	if err != nil {
		return nil, err
	}

	nsResp, err := client.GetNamespace(context.Background(), objectstorage.GetNamespaceRequest{})
	if err != nil {
		return nil, err
	}
	if nsResp.Value == nil {
		return nil, errors.New("no namespace returned")
	}

	return &oracleFileStorage{
		client:    client,
		namespace: *nsResp.Value,
		region:    region,
	}, nil
}

func (o *oracleFileStorage) Upload(
	ctx context.Context,
	bucket, objectName string,
	body io.ReadCloser,
	size int64,
	contentType string,
	metadata map[string]string,
) (string, error) {
	req := objectstorage.PutObjectRequest{
		NamespaceName: &o.namespace,
		BucketName:    &bucket,
		ObjectName:    &objectName,
		ContentLength: &size,
		PutObjectBody: body,
	}

	if contentType != "" {
		req.ContentType = &contentType
	}
	if metadata != nil {
		req.OpcMeta = metadata
	}

	resp, err := o.client.PutObject(ctx, req)
	if err != nil {
		return "", err
	}

	etag := ""
	if resp.ETag != nil {
		etag = *resp.ETag
	}

	return etag, nil
}

func (o *oracleFileStorage) GetNamespace() string {
	return o.namespace
}

func (o *oracleFileStorage) GeneratePAR(
	ctx context.Context,
	bucketName, objectName string,
	expiresIn time.Duration,
) (string, error) {
	expiration := common.SDKTime{Time: time.Now().Add(expiresIn)}

	req := objectstorage.CreatePreauthenticatedRequestRequest{
		NamespaceName: &o.namespace,
		BucketName:    &bucketName,
		CreatePreauthenticatedRequestDetails: objectstorage.CreatePreauthenticatedRequestDetails{
			Name:        common.String(fmt.Sprintf("par-%d", time.Now().Unix())),
			AccessType:  objectstorage.CreatePreauthenticatedRequestDetailsAccessTypeObjectread,
			ObjectName:  &objectName,
			TimeExpires: &expiration,
		},
	}

	resp, err := o.client.CreatePreauthenticatedRequest(ctx, req)
	if err != nil {
		return "", err
	}

	url := fmt.Sprintf("https://objectstorage.%s.oraclecloud.com%s", o.region, *resp.AccessUri)
	return url, nil
}
