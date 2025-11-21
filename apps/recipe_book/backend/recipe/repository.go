package recipe

import (
	"context"
	"fmt"
	"go-common/services/mongo"
	"time"
)

const (
	authorUUIDKey = "authorUUID"
	slugKey       = "slug"
)

// Repository represents the recipe repository
type Repository struct {
	MongoClient mongo.Mongo[Recipe]
}

// GetAllUserRecipes gets all a user's created recipes (duh)
func (r *Repository) GetAllUserRecipes(ctx context.Context, userUUID string) ([]Recipe, error) {
	return r.MongoClient.GetByKey(ctx, authorUUIDKey, userUUID)
}

func (r *Repository) Create(ctx context.Context, recipe Recipe) error {
	recipe.CreatedAt = time.Now().Unix()
	recipe.ModifiedAt = time.Now().Unix()
	return r.MongoClient.InsertItem(ctx, recipe)
}

func (r *Repository) GetRecipes(ctx context.Context, page, limit int64) ([]Recipe, error) {
	return r.MongoClient.ListItems(ctx, page, min(limit, 10))
}

// GetMatchingSlugPrefix gets a list of recipes that have a matching slug prefix
func (r *Repository) GetMatchingSlugPrefix(ctx context.Context, slug string) ([]Recipe, error) {
	return r.MongoClient.PrefixSearch(ctx, slugKey, fmt.Sprintf("%s(-([0-9]+)?)?$", slug))
}
