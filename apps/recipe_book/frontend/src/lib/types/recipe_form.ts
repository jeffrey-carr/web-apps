import type { Section } from './recipe';

export type RecipeFormData = {
  recipeName?: string;
  recipeDescription?: string;
  cookTimeHours?: number;
  cookTimeMinutes?: number;
  selectedTags?: string[];
  recipeSections?: Section[];
  importURL?: string;
  publish?: boolean;
  image?: File | null;
};
