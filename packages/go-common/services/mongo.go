package services

import (
	"context"
	"errors"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
)

type Mongo[T any] struct {
	collection *mongo.Collection
}

func NewMongo[T any](
	client *mongo.Client,
	db, coll string,
) (Mongo[T], error) {
	c := client.Database(db).Collection(coll)
	if c == nil {
		return Mongo[T]{}, errors.New("error connecting to database")
	}

	return Mongo[T]{
		collection: c,
	}, nil
}

func (m *Mongo[T]) GetByKey(ctx context.Context, key, value string) ([]T, error) {
	results, err := m.collection.Find(ctx, bson.M{key: value})
	if err != nil {
		return nil, err
	}

	return readAllCursorResults[T](ctx, results)
}

func (m *Mongo[T]) GetByUUID(ctx context.Context, uuid string) (T, error) {
	var result T
	results, err := m.GetByKey(ctx, "_id", uuid)
	if err != nil {
		return result, err
	}

	if len(results) < 1 {
		return result, errors.New("No results")
	}

	return results[0], nil
}

func (m *Mongo[T]) InsertItem(ctx context.Context, item T) error {
	_, err := m.collection.InsertOne(ctx, item)
	return err
}

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
