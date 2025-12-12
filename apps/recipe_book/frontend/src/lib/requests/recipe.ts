import type { Recipe, RecipeCreateRequest, UserFavoriteRecipe } from "$lib/types/recipe";
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

const deleteRecipeEndpoint: RouteInformation = {
  path: '/api/recipe',
  method: METHODS.DELETE,
  credentials: 'required',
};
export const deleteRecipe = async (recipeUUID: string): Promise<null | ServerError> => {
  try {
    await makeRequest(
      deleteRecipeEndpoint,
      { query: { recipe: recipeUUID } },
    );
  } catch (e) {
    return getErrorFromServer(e);
  }

  return null;
};

const getUserFavoritesEndpoint: RouteInformation = {
  path: '/api/user/favorites',
  method: METHODS.GET,
  credentials: 'required',
};
export const getUserFavorites = async (f?: typeof fetch): Promise<UserFavoriteRecipe[] | ServerError> => {
  let response: UserFavoriteRecipe[];
  try {
    response = await makeRequest(getUserFavoritesEndpoint, undefined, f);
  } catch (e) {
    const serverError = getErrorFromServer(e);
    if (serverError.status >= 400 && serverError.status < 500) {
      // Not being logged in isn't really an error
      return [];
    }

    return serverError;
  }

  return response;
};

const favoriteRecipeEndpoint: RouteInformation = {
  path: '/api/user/favorite-recipe',
  method: METHODS.POST,
  credentials: 'required',
};
export const favoriteRecipe = async (recipeUUID: string): Promise<UserFavoriteRecipe | ServerError> => {
  let result: UserFavoriteRecipe;
  try {
    result = await makeRequest(
      favoriteRecipeEndpoint,
      { query: { recipe: recipeUUID } },
    );
  } catch (e) {
    return getErrorFromServer(e);
  }

  return result;
};

const unFavoriteRecipeEndpoint: RouteInformation = {
  path: '/api/user/unfavorite-recipe',
  method: METHODS.DELETE,
  credentials: 'required',
};
export const unFavoriteRecipe = async (recipeUUID: string): Promise<null | ServerError> => {
  try {
    await makeRequest(
      unFavoriteRecipeEndpoint,
      { query: { recipe: recipeUUID } },
    );
  } catch (e) {
    return getErrorFromServer(e);
  }

  return null;
};
