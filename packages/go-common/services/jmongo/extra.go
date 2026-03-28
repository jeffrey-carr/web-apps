package jmongo

import (
	"context"
	"errors"
	"fmt"
	"go-common/types"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

// DeleteItem deletes an item by its UUID
func (m *Mongo[T]) DeleteItem(ctx context.Context, uuid string) error {
	result, err := m.collection.DeleteOne(ctx, bson.M{"_id": uuid})
	if err != nil {
		return err
	}
	if result == nil {
		return errors.New("no result returned")
	}
	if result.DeletedCount == 0 {
		return types.ErrNotFound
	}

	return nil
}

// ListItems returns a "page" of items from the collection.
// - page is 1-based (page=1 is the first page)
// - limit is the page size
func (m *Mongo[T]) ListItems(ctx context.Context, page, limit int64) ([]T, error) {
	limit = max(1, limit)
	page = max(1, page)

	skip := (page - 1) * limit

	findOpts := options.Find().
		SetSkip(skip).
		SetLimit(limit)

	cur, err := m.collection.Find(ctx, bson.M{}, findOpts)
	if err != nil {
		return nil, err
	}
	defer cur.Close(ctx)

	return readAllCursorResults[T](ctx, cur)
}

func (m *Mongo[T]) PrefixSearch(
	ctx context.Context,
	key string,
	prefix string,
) ([]T, error) {
	return m.PrefixSearchOpts(
		ctx,
		key,
		prefix,
		PrefixSearchOptions{},
	)
}

func (m *Mongo[T]) PrefixSearchOpts(
	ctx context.Context,
	key string,
	prefix string,
	opts PrefixSearchOptions,
) ([]T, error) {
	filter := bson.M{
		key: bson.M{
			"$regex": fmt.Sprintf("^%s", prefix),
		},
	}

	cursor, err := m.collection.Find(ctx, filter)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	return readAllCursorResults[T](ctx, cursor)
}
