import type { Recipe, RecipeCreateRequest } from "$lib/types/recipe";
import { makeRequest, METHODS, ServerError, type RouteInformation } from "@jeffrey-carr/frontend-common";

export const createRecipe = async (createRequest: RecipeCreateRequest): Promise<string | undefined> => {
  const endpoint: RouteInformation = {
    path: '/api/recipe',
    method: METHODS.POST,
    credentials: 'required',
  };
  
  // Response here is the new slug for the recipe
  let response: string;
  try {
    response = await makeRequest(endpoint, { body: createRequest });
  } catch (e) {
    if (e instanceof ServerError) {
      console.error(`Server error: ${e.message}`);
    } else {
      console.error("Unknown error", e);
    }

    return "";
  }
  
  return response;
};

export const getHomeRecipes = async (): Promise<Recipe[]> => {
  const endpoint: RouteInformation = {
    path: '/api/recipe',
    method: METHODS.GET,
  };

  let response: Recipe[];
  try {
    response = await makeRequest(endpoint);
  } catch (e) {
    if (e instanceof ServerError) {
      console.error(`Server error: [${e.status}] ${e.message}`);
    } else {
      console.error("Unknown error", e);
    }

    return [];
  }

  return response;
};