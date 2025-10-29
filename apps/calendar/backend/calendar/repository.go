package calendar

import (
	calendarTypes "calendar-backend/calendar/types"
	"context"
	"fmt"
	"go-common/services"
	"go-common/types"
	"go-common/utils"
	"io"
	"os"
	"time"
)

const (
	userUUIDKey     = "userUUID"
	baseImageBucket = "calendars"
)

type Repository struct {
	MongoClient   services.Mongo[calendarTypes.Calendar]
	OracleStorage services.OracleFileStorage
}

func (r *Repository) GetAllUserCalendars(ctx context.Context, userUUID string) ([]calendarTypes.Calendar, error) {
	return r.MongoClient.GetByKey(ctx, userUUIDKey, userUUID)
}

func (r *Repository) CreateCalendar(ctx context.Context, cal calendarTypes.Calendar) error {
	cal.ModifiedAt = time.Now().Unix()
	return r.MongoClient.InsertItem(ctx, cal)
}

func (r *Repository) UpdateCalendar(ctx context.Context, updatedCal calendarTypes.Calendar) error {
	updatedCal.ModifiedAt = time.Now().Unix()
	return r.MongoClient.UpdateItem(ctx, updatedCal.UUID, updatedCal)
}

func (r *Repository) UploadImage(
	ctx context.Context,
	user types.CommonUser,
	calendarUUID string,
	meta calendarTypes.ImageMetadata,
	data io.ReadCloser,
) (types.StoredObject, error) {
	name := meta.Name
	if name == "" {
		name = utils.NewUUID()
	}

	img, imgCloser, err := utils.ReadCloserIntoTemp(data)
	if err != nil {
		return types.StoredObject{}, err
	}
	if imgCloser != nil {
		defer imgCloser()
	}

	sha256, err := utils.GetFileSHA256(img)
	if err != nil {
		return types.StoredObject{}, err
	}

	stats, err := img.Stat()
	if err != nil {
		return types.StoredObject{}, err
	}

	obj := types.StoredObject{
		UUID:       utils.NewUUID(),
		UserUUID:   user.UUID,
		Namespace:  r.OracleStorage.GetNamespace(),
		Bucket:     baseImageBucket,
		ObjectName: r.generateURL(user, calendarUUID, name),
		Size:       stats.Size(),
		SHA256:     sha256,
	}

	eTag, err := r.OracleStorage.Upload(
		ctx,
		obj.Bucket,
		obj.ObjectName,
		img,
		obj.Size,
		meta.MIME,
		nil,
	)
	if err != nil {
		return types.StoredObject{}, err
	}
	obj.ETag = eTag

	return obj, nil
}

func (r *Repository) generateURL(
	user types.CommonUser,
	calendarUUID, imageName string,
) string {
	return fmt.Sprintf("%s/%s/%s/%s", baseImageBucket, user.UUID, calendarUUID, imageName)
}
