import {
  App,
  APP_QUERY_PARAM,
  getAppURL,
  PATH_QUERY_PARAM,
  type Environment,
} from '@jeffrey-carr/frontend-common';
import type { Page } from '@sveltejs/kit';

export const constructLoginURL = (
  environment: Environment,
  page?: Page<Record<string, string>, string | null>
): string => {
  let route = getAppURL(environment, App.Federation);
  route += `?${APP_QUERY_PARAM}=${App.RecipeBook}`;
  if (page) {
    const path = page.url.pathname.slice(1);
    if (path !== '/') {
      route += `&${PATH_QUERY_PARAM}=${path}`;
    }
  }

  return route;
};
