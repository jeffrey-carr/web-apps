import { error } from '@sveltejs/kit';
import { getRecipe } from "$lib/requests/recipe";
import { ServerError } from "@jeffrey-carr/frontend-common";
import type { PageLoad } from './$types';


export const load: PageLoad = ({ fetch, params }) => {
  return {
    recipePromise: getRecipe(params.id, fetch).then((response) => {
      if (response instanceof ServerError) {
        error(response.status, response.message);
      }
      return response;
    }),
  };
};