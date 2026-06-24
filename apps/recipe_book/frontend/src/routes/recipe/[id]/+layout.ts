import { error } from '@sveltejs/kit';
import { getRecipe } from '$lib/requests/recipe';
import { ServerError } from '@jeffrey-carr/frontend-common';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ fetch, params }) => {
  let response = await getRecipe(params.id, fetch);

  if (response instanceof ServerError) {
    console.error('is error', response);
    throw error(response.status, response.message);
  }

  return {
    recipe: response,
  };
};
