import type { Direction, Ingredient, Section } from "$lib/types/recipe";

export const validateRecipeName = (name: string): string => {
  if (name.length === 0) {
    return "Name is required.";
  }

  return "";
};

export const validateCookTime = (hours: number, minutes: number): string => {
  if (isNaN(hours) || isNaN(minutes)) {
    return "Hours and minutes can only be numbers.";
  }

  if (hours < 0 || minutes < 0) {
    return "Hours and minutes must be positive or 0.";
  }

  return "";
};

export const validateIngredient = (ingredient: Ingredient): string => {
  if (ingredient.name.trim().length === 0) {
    return "Ingredient name is required";
  }

  return "";
};

export const validateDirection = (direction: Direction): string => {
  if (direction.step.trim().length === 0) {
    return "Direction step is required.";
  }

  return "";
};

export const validateSection = (section: Section): string => {
  for (const ingredient of section.ingredients) {
    const ingredentValidationErr = validateIngredient(ingredient);
    if (ingredentValidationErr !== "") {
      return ingredentValidationErr;
    }
  }

for (const direction of section.directions) {
    const directionValidationErr = validateDirection(direction);
    if (directionValidationErr !== "") {
      return directionValidationErr;
    }
  }

  if (section.ingredients.length === 0 && section.directions.length === 0) {
    return "At least one ingredient or direction is required.";
  }

  return "";
};

