import type { Direction, Ingredient, RecipeCreateRequest, Section } from "$lib/types/recipe";
import { validateCookTime, validateRecipeName, validateSection } from "$lib/validators/recipe";
import { TIME, Tuple } from '@jeffrey-carr/frontend-common';

// Converts a recipe input to a create request, and validates as it goes
export const recipeInputsToCreateRecipeRequest = (
  name: string,
  description: string,
  cookTimeHours: number,
  cookTimeMinutes: number,
  importURL: string,
  sections: Section[],
  publish: boolean,
): RecipeCreateRequest => {
  name = name.trim();
  const nameValidationErr = validateRecipeName(name);
  if (nameValidationErr !== "") {
    throw Error(nameValidationErr);
  }

  description = description.trim();

  const cookTimeValiationErr = validateCookTime(cookTimeHours, cookTimeMinutes);
  if (cookTimeValiationErr !== "") {
    throw Error(cookTimeValiationErr);
  }
  const cookTimeHoursMs = cookTimeHours * 60 * 60 * 1000;
  const cookTimeMinutesMs = cookTimeMinutes * 60 * 1000;

  sections = filterEmptySections(sections);
  for (const section of sections) {
    const sectionsValidationErr = validateSection(section);
    if (sectionsValidationErr !== "") {
      throw Error(sectionsValidationErr);
    }
  }

  return {
    name,
    description,
    importURL,
    cookTimeMs: cookTimeHoursMs+cookTimeMinutesMs,
    sections,
    publish,
  };
};

export const filterEmptySections = (sections: Section[]): Section[] => {
  for (let i = 0; i < sections.length; i++) {
    sections[i].ingredients = filterEmptyIngredients(sections[i].ingredients);
    sections[i].directions = filterEmptyDirections(sections[i].directions);
  }

  return sections.filter(section => {
    if (section.ingredients.length === 0 && section.directions.length === 0) {
      return false;
    }

    return true;
  });
};

export const filterEmptyIngredients = (ingredients: Ingredient[]): Ingredient[] => {
  return ingredients.filter(ingredient => {
    if (ingredient.name.trim().length === 0) {
      return false;
    }

    return true;
  });
};

export const filterEmptyDirections = (directions: Direction[]): Direction[] => {
  return directions.filter(direction => {
    if (direction.step.trim().length === 0) {
      return false;
    }

    return true;
  });
};

export const msToCookTime = (ms: number): Tuple<number, number> => {
  const hours = Math.floor(ms / TIME.HOUR);
  const minutes = Math.floor((ms % TIME.HOUR) / TIME.MINUTE);
  return new Tuple(hours, minutes);
};

export const cookTimeToStr = (ms?: number): string => {
  if (ms == null) {
    return 'Unknown';
  }

  const hoursAndMinutes = msToCookTime(ms);
  const hours = hoursAndMinutes.getFirst();
  const minutes = hoursAndMinutes.getSecond();

  let str = '';
  if (hours > 0) {
    const plural = hours > 1;
    str += `${hours} hour${plural ? 's' : ''}`;
  }

  if (minutes > 0) {
    if (hours > 0) {
      str += ", "
    }
    
    const plural = minutes > 1;
    str += `${minutes} minute${plural ? 's' : ''}`;
  }

  return str;
};
