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
};

export type Tag = {
  uuid: string;
  name: string;
};

export const INGREDIENT_UNITS = [
  '',
  'tsp',
  'tbsp',
  'oz',
  'floz',
  'cup',
  'pint',
  'quart',
  'gallon',
  'lb',
];
export type IngredientUnit = (typeof INGREDIENT_UNITS)[number];

export type RecipeCreateRequest = {
  name: string;
  description: string;
  cookTimeMs: number;
  tagNames: string[];
  originalURL?: string;
  sections: Section[];
  publish?: boolean;
};

export type RecipeCreateResponse = {
  slug: string;
};

export type RecipeUpdateRequest = {
  name?: string;
  description?: string;
  cookTimeMs?: number;
  tagNames?: string[];
  originalURL?: string;
  status?: 'public' | 'draft';
  sections?: Section[];
};

export type Recipe = {
  uuid: string;
  name: string;
  description: string;
  cookTimeMs?: number;
  importURL?: string;
  tags?: Tag[];
  sections: Section[];
  slug?: string;
  authorUUID: string;
  authorFName: string;
  authorLName: string;
  imageUUID?: string;
  imageURL?: string;
  status: 'public' | 'draft';
  isFavorited: boolean;

  createdAt: number;
  modifiedAt: number;
};

export type UserFavoriteRecipe = {
  uuid: string;
  recipeUUID: string;
  userUUID: string;
  favoritedAt: number;
};

export type SearchOptions = {
  recipeName?: string;
  favoritesOnly?: boolean;
  includeDrafts?: boolean;
  authorUUID?: string;
  selectedTagUUIDs?: string[];
  inverseTagUUIDs?: string[];
  limit?: number;
  page?: number;
};
