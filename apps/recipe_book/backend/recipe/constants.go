package recipe

/* NETWORK PATH VARS */
const (
	RecipeIDPathVar            = "recipeID"
	RecipeIDQueryParameterName = "recipe"
)

var (
	// IngredientUnits are the allowed units for any ingredient
	IngredientUnits = []string{
		"tsp",
		"tbsp",
		"oz",
		"floz",
		"cup",
		"pint",
		"quart",
		"gallon",
		"lb",
		"item",
	}
)
