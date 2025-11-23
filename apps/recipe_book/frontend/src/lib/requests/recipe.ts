import type { Recipe, RecipeCreateRequest } from "$lib/types/recipe";
import { getErrorFromServer, makeRequest, METHODS, ServerError, type RouteInformation } from "@jeffrey-carr/frontend-common";

export const createRecipe = async (createRequest: RecipeCreateRequest): Promise<string | ServerError> => {
  const endpoint: RouteInformation = {
    path: '/api/recipe',
    method: METHODS.POST,
    credentials: 'required',
  };

  let response: string;
  try {
    response = await makeRequest(endpoint, { body: createRequest });
  } catch (e) {
    return getErrorFromServer(e);
  }
  
  // Response here is the new slug for the recipe
  return response;
};

export const getHomeRecipes = async (): Promise<Recipe[] | ServerError> => {
  const endpoint: RouteInformation = {
    path: '/api/recipe',
    method: METHODS.GET,
  };

  let response: Recipe[];
  try {
    response = await makeRequest(endpoint);
  } catch (e) {
    return getErrorFromServer(e);
  }

  return response;
};

export const getRecipe = async (recipeID: string, f?: typeof fetch): Promise<Recipe | ServerError> => {
  const endpoint: RouteInformation = {
    path: `/api/recipe/${recipeID}`,
    method: METHODS.GET,
  }
  let response: Recipe;
  try {
    response = await makeRequest(endpoint, undefined, f);
  } catch (e) {
    return getErrorFromServer(e);
  }

  return response;
};