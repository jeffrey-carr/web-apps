export type Section = {
	uuid: string;
	title: string;
	ingredients: Ingredient[];
	directions: Direction[];
};

export type Ingredient = {
	uuid: string;
	name: string;
	prep: string;
	amount?: number;
	amountStr: string;
	unit: string;
};

export type Direction = {
	uuid: string;
	step: string;
}

export const INGREDIENT_UNITS = [
	"",
	"tsp",
	"tbsp",
	"oz",
	"floz",
	"cup",
	"pint",
	"quart",
	"gallon",
	"lb",
];
export type IngredientUnit = typeof INGREDIENT_UNITS[number];

export type RecipeCreateRequest = {
	name: string;
  description: string;
  cookTimeMs?: number; 
	importURL?: string;
  sections: Section[];
	publish?: boolean;
};

export type Recipe = {
	uuid: string;
	name: string;
	description: string;
	cookTimeMs?: number;
	importURL?: string;
	slug?: string;
	authorUUID: string;
	imageUUID?: string;
	status: 'public' | 'private' | 'draft';
	sections: Section[];
	createdAt: number;
	modifiedAt: number;
};

export type UserFavoriteRecipe = {
	uuid: string;
	recipeUUID: string;
	userUUID: string;
	favoritedAt: number;
}