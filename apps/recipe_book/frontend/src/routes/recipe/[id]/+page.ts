import { error } from '@sveltejs/kit';
import { getRecipe } from "$lib/requests/recipe";
import { ServerError } from "@jeffrey-carr/frontend-common";
import type { PageLoad } from './$types';


export const load: PageLoad = async ({ fetch, params }) => {
  let recipeResponse = await getRecipe(params.id, fetch);
  if (recipeResponse instanceof ServerError) {
    error(recipeResponse.status, recipeResponse.message);
  }

  return { recipe: recipeResponse };
};