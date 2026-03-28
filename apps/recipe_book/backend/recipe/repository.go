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
	recipeNameSearchIndex = "recipe_name_fuzzy"
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

func (r Repository) GetAllTags(ctx context.Context) ([]recipe.Tag, error) {
	return r.tagClient.GetAll(ctx)
}

func (r Repository) GetTagsByUUID(ctx context.Context, uuids []string) ([]recipe.Tag, error) {
	return r.tagClient.GetByUUIDs(ctx, uuids)
}

func (r Repository) PutTag(ctx context.Context, tag recipe.Tag) error {
	return r.tagClient.InsertItem(ctx, tag)
}

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

// Create saves a recipe in Mongo
func (r Repository) Create(ctx context.Context, rec recipe.Recipe) error {
	rec.CreatedAt = time.Now().UnixMilli()
	rec.ModifiedAt = time.Now().UnixMilli()
	return r.recipeClient.InsertItem(ctx, rec)
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

func (r Repository) GetRecipesByUUIDs(ctx context.Context, uuids []string) ([]recipe.Recipe, error) {
	return r.recipeClient.GetByUUIDs(ctx, uuids)
}

func (r Repository) GetRecipebyUserUUID(ctx context.Context, userUUID string) ([]recipe.Recipe, error) {
	return r.recipeClient.GetByKey(ctx, authorUUIDKey, userUUID)
}

func (r Repository) GetRecipesByTagUUIDs(ctx context.Context, tagUUIDs []string, limit int64, page int64) ([]recipe.Recipe, error) {
	tagFilter := bson.M{
		tagUUIDsKey: bson.M{
			"$in": tagUUIDs,
		},
	}

	opts := options.Find()
	if limit > 0 {
		opts.SetLimit(min(limit, 200)).SetSkip(limit * (min(1, page) - 1))
	}

	return r.recipeClient.GetWithGenericFilter(ctx, tagFilter, opts)
}

func (r Repository) GetRecipesByCategoryUUIDs(ctx context.Context, categoryUUIDs []string) ([]recipe.Recipe, error) {
	var recipes []recipe.Recipe
	for _, categoryUUID := range categoryUUIDs {
		results, err := r.recipeClient.GetByKey(ctx, categoryUUIDKey, categoryUUID)
		if err != nil {
			return nil, err
		}
		recipes = append(recipes, results...)
	}

	return recipes, nil
}

// GetRecipeBySlug gets a recipe by its slug
func (r Repository) GetRecipeBySlug(ctx context.Context, slug string) (recipe.Recipe, error) {
	recipes, err := r.recipeClient.GetByKey(ctx, slugKey, slug)
	if err != nil {
		return recipe.Recipe{}, err
	}

	return recipes[0], nil
}

// GetHomeRecipes gets a ranom set of `limit` recipes
func (r Repository) GetHomeRecipes(ctx context.Context, page, limit int64) ([]recipe.Recipe, error) {
	return r.recipeClient.ListItems(ctx, page, limit)
}

// Search executes a search query for recipes in the database with optional text searching, filtering, and pagination
func (r Repository) Search(ctx context.Context, opts recipe.SearchOpts, favoriteUUIDs []string) ([]recipe.Recipe, error) {
	filter := bson.M{}
	if opts.FavoritesOnly {
		filter["_id"] = bson.M{"$in": favoriteUUIDs}
	}
	if opts.AuthorUUID != nil {
		filter["authorUUID"] = *opts.AuthorUUID
	}
	if opts.TagUUIDs != nil && len(*opts.TagUUIDs) > 0 {
		filter["tags"] = bson.M{"$in": *opts.TagUUIDs}
	}

	limit := max(int64(1), opts.Limit)
	page := max(int64(1), opts.Page)
	skip := (page - 1) * limit

	if opts.Name != nil {
		pipeline := mongo.Pipeline{
			bson.D{
				{"$search", bson.D{
					{"index", recipeNameSearchIndex},
					{"text", bson.D{
						{"query", *opts.Name},
						{"path", "name"},
						{"fuzzy", bson.D{
							{"maxEdits", 2},
							{"prefixLength", 1},
						}},
					}},
				}},
			},
		}

		if len(filter) > 0 {
			pipeline = append(pipeline, bson.D{{"$match", filter}})
		}

		pipeline = append(pipeline, bson.D{{"$skip", skip}})
		pipeline = append(pipeline, bson.D{{"$limit", limit}})

		return r.recipeClient.Aggregate(ctx, pipeline)
	}

	findOpts := options.Find().SetSkip(skip).SetLimit(limit)
	return r.recipeClient.GetWithGenericFilter(ctx, filter, findOpts)
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
