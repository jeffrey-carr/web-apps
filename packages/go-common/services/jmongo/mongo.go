package jmongo

import (
	"context"
	"go-common/types"
	"go-common/utils"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
)

// Mongo handles communication with MongoDB
type Mongo[T any] struct {
	collection *mongo.Collection
}

// NewMongo creates a new JMongo service and connections to the
// specified collection
func NewMongo[T any](
	client *mongo.Client,
	db, coll string,
) (Mongo[T], error) {
	c := client.Database(db).Collection(coll)
	if c == nil {
		return Mongo[T]{}, ErrNotConnected
	}

	return Mongo[T]{
		collection: c,
	}, nil
}

// GetAll gets all records in the collection. Be careful!
func (m *Mongo[T]) GetAll(ctx context.Context) ([]T, error) {
	if m.collection == nil {
		return nil, ErrNotConnected
	}

	results, err := m.collection.Find(ctx, bson.D{})
	if err != nil {
		return nil, err
	}

	return readAllCursorResults[T](ctx, results)
}

// GetByKey gets a record by the provided key
func (m *Mongo[T]) GetByKey(ctx context.Context, key, value string) ([]T, error) {
	if m.collection == nil {
		return nil, ErrNotConnected
	}

	results, err := m.collection.Find(ctx, bson.M{key: value})
	if err != nil {
		return nil, err
	}

	parsedResults, err := readAllCursorResults[T](ctx, results)
	if len(parsedResults) == 0 {
		return nil, types.ErrNotFound
	}

	return parsedResults, nil
}

// GetMultipleByKey gets multiple records sharing the same key
func (m *Mongo[T]) GetMultipleByKey(ctx context.Context, key string, values []string) ([]T, error) {
	if m.collection == nil {
		return nil, ErrNotConnected
	}

	// Dedupe values
	valuesSet := utils.NewSet(values...)
	dedupedValues := valuesSet.ToSlice()

	offset := 0
	step := 1000
	var results []T
	for offset < len(dedupedValues)-1 {
		end := min(len(dedupedValues), offset+step)

		pageResults, err := m.collection.Find(ctx, bson.M{key: dedupedValues[offset:end]})
		if err != nil {
			return nil, err
		}
		parsedPageResults, err := readAllCursorResults[T](ctx, pageResults)
		if err != nil {
			continue
		}

		results = append(results, parsedPageResults...)
		offset += end
	}

	return results, nil
}

// GetByUUID gets a record by it's UUID (or Mongo _id)
func (m *Mongo[T]) GetByUUID(ctx context.Context, uuid string) (T, error) {
	var result T
	if m.collection == nil {
		return result, ErrNotConnected
	}

	results, err := m.GetByKey(ctx, "_id", uuid)
	if err != nil {
		return result, err
	}

	if len(results) < 1 {
		return result, types.ErrNotFound
	}

	return results[0], nil
}

// GetByUUIDs gets a records by their UUIDs (or Mongo _id's)
func (m *Mongo[T]) GetByUUIDs(ctx context.Context, uuids []string) ([]T, error) {
	if m.collection == nil {
		return nil, ErrNotConnected
	}

	var results []T
	if len(uuids) == 0 {
		return results, nil
	}

	return m.GetMultipleByKey(ctx, "_id", uuids)
}

// InsertItem inserts a new record into the collection
func (m *Mongo[T]) InsertItem(ctx context.Context, item T) error {
	_, err := m.collection.InsertOne(ctx, item)
	return err
}

// UpdateItem updates an item with the matching UUID (or Mongo _id) in the collection
func (m *Mongo[T]) UpdateItem(ctx context.Context, uuid string, updatedItem T) error {
	_, err := m.collection.ReplaceOne(ctx, bson.M{"_id": uuid}, updatedItem)
	return err
}

func readAllCursorResults[T any](ctx context.Context, c *mongo.Cursor) ([]T, error) {
	var allDocs []T
	for c.Next(ctx) {
		var result T
		if err := c.Decode(&result); err != nil {
			return nil, err
		}

		allDocs = append(allDocs, result)
	}

	if err := c.Err(); err != nil {
		return nil, err
	}

	return allDocs, nil
}
