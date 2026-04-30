package recipe

import (
	"context"
	"fmt"
	"go-common/services/jmongo"
	"go-common/types"
	"go-common/utils"
	"recipe-book/domains/recipe"
	"time"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

const (
	authorUUIDKey         = "authorUUID"
	userUUIDKey           = "userUUID"
	tagUUIDsKey           = "tags"
	slugKey               = "slug"
	categoryUUIDKey       = "category"
	recipeNameSearchIndex = "name_search"
)

// Repository represents the recipe repository
type Repository struct {
	recipeClient    jmongo.Mongo[recipe.Recipe]
	favoritesClient jmongo.Mongo[recipe.UserFavorite]
	tagClient       jmongo.Mongo[recipe.Tag]
}

// NewRepository creates a new Recipe repository
func NewRepository(
	recipeMongoClient jmongo.Mongo[recipe.Recipe],
	favoritesMongoClient jmongo.Mongo[recipe.UserFavorite],
	categoryMongoClient jmongo.Mongo[recipe.Tag],
) Repository {
	return Repository{
		recipeClient:    recipeMongoClient,
		favoritesClient: favoritesMongoClient,
		tagClient:       categoryMongoClient,
	}
}

// GetAllUserRecipes gets all a user's created recipes (duh)
func (r Repository) GetAllUserRecipes(ctx context.Context, userUUID string) ([]recipe.Recipe, error) {
	return r.recipeClient.GetByKey(ctx, authorUUIDKey, userUUID)
}

// GetAllUserFavorites gets all a user's favorited recipes
func (r Repository) GetAllUserFavorites(ctx context.Context, userUUID string) ([]recipe.UserFavorite, error) {
	favorites, err := r.favoritesClient.GetByKey(ctx, userUUIDKey, userUUID)
	if err != nil && err != types.ErrNotFound {
		return nil, err
	}

	return favorites, nil
}

// GetAllTags gets a list of all the tags
func (r Repository) GetAllTags(ctx context.Context) ([]recipe.Tag, error) {
	return r.tagClient.GetAll(ctx)
}

// GetTagsByUUID gets a list of all tags by their uuids
func (r Repository) GetTagsByUUID(ctx context.Context, uuids []string) ([]recipe.Tag, error) {
	return r.tagClient.GetByUUIDs(ctx, uuids)
}

// UpsertTag is used to create or update a tag by its name
func (r Repository) UpsertTag(ctx context.Context, name string) (recipe.Tag, error) {
	filter := bson.M{"name": name}
	update := bson.M{
		"$setOnInsert": bson.M{
			"_id":  utils.NewUUID(),
			"name": name,
		},
	}
	return r.tagClient.Upsert(ctx, filter, update)
}

// Put saves a recipe in Mongo
func (r Repository) Put(ctx context.Context, rec recipe.Recipe) error {
	rec.CreatedAt = time.Now().UnixMilli()
	rec.ModifiedAt = time.Now().UnixMilli()
	return r.recipeClient.InsertItem(ctx, rec)
}

// Update updates a recipe in Mongo
func (r Repository) Update(ctx context.Context, rec recipe.Recipe) error {
	rec.ModifiedAt = time.Now().UnixMilli()
	return r.recipeClient.UpdateItem(ctx, rec.UUID, rec)
}

// DeleteRecipe deletes a recipe
func (r Repository) DeleteRecipe(ctx context.Context, recipeUUID string) error {
	return r.recipeClient.DeleteItem(ctx, recipeUUID)
}

// SaveUserFavorite saves a user favorite in Mongo
func (r Repository) SaveUserFavorite(ctx context.Context, favorite recipe.UserFavorite) (recipe.UserFavorite, error) {
	favorite.FavoritedAt = time.Now().UnixMilli()
	err := r.favoritesClient.InsertItem(ctx, favorite)
	return favorite, err
}

// UnFavoriteRecipe removes a user favorite from the db
func (r Repository) UnFavoriteRecipe(ctx context.Context, favoriteUUID string) error {
	return r.favoritesClient.DeleteItem(ctx, favoriteUUID)
}

// GetRecipeByUUID gets a recipe by its UUID
func (r Repository) GetRecipeByUUID(ctx context.Context, uuid string) (recipe.Recipe, error) {
	return r.recipeClient.GetByUUID(ctx, uuid)
}

// GetRecipeBySlug gets a recipe by its slug
func (r Repository) GetRecipeBySlug(ctx context.Context, slug string) (recipe.Recipe, error) {
	recipes, err := r.recipeClient.GetByKey(ctx, slugKey, slug)
	if err != nil {
		return recipe.Recipe{}, err
	}

	return recipes[0], nil
}

// Search executes a search query for recipes in the database with optional text searching, filtering, and pagination
func (r Repository) Search(ctx context.Context, opts recipe.SearchOpts, favoriteUUIDs []string) ([]recipe.Recipe, int64, error) {
	filter := bson.M{}
	if opts.FavoritesOnly {
		filter["_id"] = bson.M{"$in": favoriteUUIDs}
	}
	if opts.AuthorUUID != nil {
		filter["authorUUID"] = *opts.AuthorUUID
	}

	hasSelectedTags := opts.SelectedTagUUIDs != nil && len(*opts.SelectedTagUUIDs) > 0
	hasInverseTags := opts.InverseTagUUIDs != nil && len(*opts.InverseTagUUIDs) > 0
	if hasSelectedTags || hasInverseTags {
		tagFilter := bson.M{}

		if hasSelectedTags {
			tagFilter["$in"] = *opts.SelectedTagUUIDs
		}
		if hasInverseTags {
			tagFilter["$nin"] = *opts.InverseTagUUIDs
		}

		// This safely applies $in, $nin, or both to the "tags" field
		filter["tags"] = tagFilter
	}

	limit := max(int64(1), opts.Limit)
	page := max(int64(1), opts.Page)
	skip := (page - 1) * limit

	if opts.Name != nil {
		basePipeline := mongo.Pipeline{
			bson.D{
				{Key: "$search", Value: bson.D{
					{Key: "index", Value: recipeNameSearchIndex},
					{Key: "text", Value: bson.D{
						{Key: "query", Value: *opts.Name},
						{Key: "path", Value: "name"},
						{Key: "fuzzy", Value: bson.D{
							{Key: "maxEdits", Value: 2},
							{Key: "prefixLength", Value: 1},
						}},
					}},
				}},
			},
		}

		if len(filter) > 0 {
			basePipeline = append(basePipeline, bson.D{{Key: "$match", Value: filter}})
		}

		// Get total count for the search
		total, err := r.recipeClient.AggregateCount(ctx, basePipeline)
		if err != nil {
			return nil, 0, err
		}

		pipeline := append(basePipeline, bson.D{{Key: "$skip", Value: skip}}, bson.D{{Key: "$limit", Value: limit}})
		recipes, err := r.recipeClient.Aggregate(ctx, pipeline)
		return recipes, total, err
	}

	total, err := r.recipeClient.CountWithFilter(ctx, filter)
	if err != nil {
		return nil, 0, err
	}

	findOpts := options.Find().SetSkip(skip).SetLimit(limit)
	recipes, err := r.recipeClient.GetWithGenericFilter(ctx, filter, findOpts)
	return recipes, total, err
}

// GetMatchingSlugPrefix gets a list of recipes that have a matching slug prefix
func (r Repository) GetMatchingSlugPrefix(ctx context.Context, slug string) ([]recipe.Recipe, error) {
	return r.recipeClient.PrefixSearch(ctx, slugKey, fmt.Sprintf("%s(-([0-9]+)?)?$", slug))
}

// FuzzySearchRecipeName fuzzy searches a recipe by name
func (r Repository) FuzzySearchRecipeName(ctx context.Context, query string) ([]jmongo.FuzzySearchResult[recipe.Recipe], error) {
	return r.FuzzySearchRecipeNameOpts(ctx, query, jmongo.FuzzySearchOpts{})
}

// FuzzySearchRecipeNameOpts allows passing additional options to the fuzzy search
func (r Repository) FuzzySearchRecipeNameOpts(ctx context.Context, query string, opts jmongo.FuzzySearchOpts) ([]jmongo.FuzzySearchResult[recipe.Recipe], error) {
	return r.recipeClient.FuzzySearch(
		ctx,
		recipeNameSearchIndex,
		query,
		"name",
		opts,
	)
}
