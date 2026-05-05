import { makeSearchQueryString } from '$lib/mappers/recipe';
import type {
  Tag,
  Recipe,
  RecipeCreateRequest,
  SearchOptions,
  UserFavoriteRecipe,
  RecipeCreateResponse,
  RecipeUpdateRequest,
} from '$lib/types/recipe';
import type { PaginatedResult } from '$lib/types/requests';
import {
  getErrorFromServer,
  makeRequest,
  METHODS,
  ServerError,
  type RouteInformation,
} from '@jeffrey-carr/frontend-common';

export const createRecipe = async (
  createRequest: RecipeCreateRequest | FormData
): Promise<RecipeCreateResponse | ServerError> => {
  const endpoint: RouteInformation = {
    path: '/api/recipe',
    method: METHODS.POST,
    credentials: 'required',
  };

  let response: RecipeCreateResponse;
  try {
    response = await makeRequest(endpoint, { body: createRequest });
  } catch (e) {
    return getErrorFromServer(e);
  }

  // Response here is the new slug for the recipe
  return response;
};

const updateRecipeEndpoint: RouteInformation = {
  path: '/api/recipe',
  method: METHODS.PATCH,
  credentials: 'required',
};

export const updateRecipe = async (
  recipeUUID: string,
  updateRequest: RecipeUpdateRequest | FormData
): Promise<Recipe | ServerError> => {
  let updatedRecipe: Recipe;
  try {
    updatedRecipe = await makeRequest<Recipe>(updateRecipeEndpoint, {
      query: { recipe: recipeUUID },
      body: updateRequest,
    });
  } catch (e) {
    return getErrorFromServer(e);
  }

  return updatedRecipe;
};

export const getRecipe = async (
  recipeID: string,
  f?: typeof fetch
): Promise<Recipe | ServerError> => {
  const endpoint: RouteInformation = {
    path: `/api/recipe/${recipeID}`,
    method: METHODS.GET,
  };
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
    await makeRequest(deleteRecipeEndpoint, { query: { recipe: recipeUUID } });
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
export const getUserFavorites = async (
  f?: typeof fetch
): Promise<UserFavoriteRecipe[] | ServerError> => {
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
export const favoriteRecipe = async (
  recipeUUID: string
): Promise<UserFavoriteRecipe | ServerError> => {
  let result: UserFavoriteRecipe;
  try {
    result = await makeRequest(favoriteRecipeEndpoint, { query: { recipe: recipeUUID } });
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
    await makeRequest(unFavoriteRecipeEndpoint, { query: { recipe: recipeUUID } });
  } catch (e) {
    return getErrorFromServer(e);
  }

  return null;
};

const getAllTagsEndpoint: RouteInformation = {
  path: '/api/recipe/all-tags',
  method: METHODS.GET,
  credentials: 'none',
};
export const getAllTags = async (f?: typeof fetch): Promise<Tag[] | ServerError> => {
  try {
    return await makeRequest<Tag[]>(getAllTagsEndpoint, undefined, f);
  } catch (e) {
    return getErrorFromServer(e);
  }
};

const searchRecipesEndpoint: RouteInformation = {
  path: '/api/recipe/search',
  method: METHODS.GET,
  credentials: 'optional',
};
export const searchRecipes = async (
  opts: SearchOptions,
  f?: typeof fetch
): Promise<PaginatedResult<Recipe> | ServerError> => {
  try {
    return await makeRequest<PaginatedResult<Recipe>>(
      searchRecipesEndpoint,
      { query: makeSearchQueryString(opts) },
      f
    );
  } catch (e) {
    return getErrorFromServer(e);
  }
};
