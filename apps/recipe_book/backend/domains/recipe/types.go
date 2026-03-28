package recipe

// Status is the status of a recipe
type Status string

const (
	// StatusPublic represents a recipe that has been created and is public
	StatusPublic Status = "public"
	// StatusPrivate represents a recipe that has been created and is only viewable by the creator
	StatusPrivate Status = "private"
	// StatusDraft represents a recipe that has been created but is not finished and is only viewable by the creator
	StatusDraft Status = "draft"
)

// Recipe holds all the information we have about a recipe
type Recipe struct {
	UUID        string    `json:"uuid" bson:"_id"`
	Name        string    `json:"name" bson:"name"`
	Description string    `json:"description" bson:"description"`
	CookTimeMs  int64     `json:"cookTimeMs" bson:"cookTimeMs"`
	TagUUIDs    []string  `json:"tags" bson:"tags"`
	OriginalURL string    `json:"originalURL" bson:"originalURL"`
	Slug        string    `json:"slug" bson:"slug"`
	AuthorUUID  string    `json:"authorUUID" bson:"authorUUID"`
	ImageUUID   string    `json:"imageUUID" bson:"imageUUID"`
	Status      Status    `json:"status" bson:"status"`
	Sections    []Section `json:"sections" bson:"sections"`
	CreatedAt   int64     `json:"createdAt" bson:"createdAt"`
	ModifiedAt  int64     `json:"modifiedAt" bson:"modifiedAt"`
}

// PublicRecipe is the recipe that is sent to the frontend and is visible to
// users
type PublicRecipe struct {
	UUID        string    `json:"uuid"`
	Name        string    `json:"name"`
	Description string    `json:"description"`
	CookTimeMs  int64     `json:"cookTimeMs"`
	Tags        []Tag     `json:"tags"`
	OriginalURL string    `json:"originalURL"`
	Sections    []Section `json:"sections"`
	Slug        string    `json:"slug"`
	AuthorUUID  string    `json:"authorUUID"`
	AuthorFName string    `json:"authorFName"`
	AuthorLName string    `json:"authorLName"`
	ImageURL    string    `json:"imageURL"`
	Status      Status    `json:"status"`
	IsFavorited bool      `json:"isFavorited"`

	CreatedAt  int64 `json:"createdAt"`
	ModifiedAt int64 `json:"modifiedAt"`
}

// Tag represents a recipe tag
type Tag struct {
	UUID string `json:"uuid" bson:"_id"`
	Name string `json:"name" bson:"name"`
}

// UnknownTag is returned when the recipe's tag cannot be found
var UnknownTag = Tag{
	UUID: "00000000-0000-0000-0000-000000000000",
	Name: "Unknown",
}

// Section represents one section of a recipe. A recipe may have multiple sections to split
// different parts into multiple steps. Like when someone makes a cake, maybe there's a "cake" section
// and a "frosting" section
type Section struct {
	Title       string       `json:"title" bson:"title"`
	Ingredients []Ingredient `json:"ingredients" bson:"ingredients"`
	Directions  []Direction  `json:"directions" bson:"directions"`
}

// Ingredient represents one ingredient in a recipe
type Ingredient struct {
	UUID string `json:"uuid" bson:"_id"`
	Name string `json:"name" bson:"name"`
	Prep string `json:"prep" bson:"prep"`
	// Amount is the decimal representation of the amount if it is parsable
	Amount float32 `json:"amount" bson:"amount"`
	// AmountStr is the raw string input by the user on recipe creation
	AmountStr string         `json:"amountStr" bson:"amountStr"`
	Unit      IngredientUnit `json:"unit" bson:"unit"`
}

type IngredientUnit string

const (
	Teaspoon   IngredientUnit = "tsp"
	Tablespoon IngredientUnit = "tbsp"
	Ounce      IngredientUnit = "oz"
	FluidOunce IngredientUnit = "floz"
	Cup        IngredientUnit = "cup"
	Pint       IngredientUnit = "pint"
	Quart      IngredientUnit = "quart"
	Gallon     IngredientUnit = "gallon"
	Pound      IngredientUnit = "lb"
	Item       IngredientUnit = "item"
)

var ValidIngredientUnits = []IngredientUnit{
	Teaspoon, Tablespoon, Ounce, FluidOunce,
	Cup, Pint, Quart, Gallon, Pound, Item,
}

// Direction represents one direction in a recipe
type Direction struct {
	UUID string `json:"uuid" bson:"_id"`
	Step string `json:"step" bson:"step"`
}

// CreateRecipeRequest is the body of a CREATE request for recipes
type CreateRecipeRequest struct {
	Name        string    `json:"name"`
	Description string    `json:"description"`
	CookTimeMs  int64     `json:"cookTimeMs"`
	OriginalURL string    `json:"originalURL"`
	TagNames    []string  `json:"tagNames"`
	Sections    []Section `json:"sections"`
	Publish     bool      `json:"publish"`
	Slug        string    `json:"slug"`
}

// UserFavorite represents a UserFavorite object
type UserFavorite struct {
	UUID        string `json:"uuid" bson:"_id"`
	RecipeUUID  string `json:"recipeUUID" bson:"recipeUUID"`
	UserUUID    string `json:"userUUID" bson:"userUUID"`
	FavoritedAt int64  `json:"favoritedAt" bson:"favoritedAt"`
}

// SearchOpts are the options that can apply to a search
// request
type SearchOpts struct {
	Name          *string   `json:"name"`
	FavoritesOnly bool      `json:"favoritesOnly"`
	TagUUIDs      *[]string `json:"tagUUIDs"`
	AuthorUUID    *string   `json:"authorUUID"`
	Limit         int64     `json:"limit"`
	Page          int64     `json:"page"`
}
