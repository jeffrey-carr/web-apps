import type { RouteQuery } from '@jeffrey-carr/frontend-common';
import { APP_QUERY_PARAM, GOTO_QUERY_PARAM, PATH_QUERY_PARAM } from '@jeffrey-carr/frontend-common';
import { redirect } from '@sveltejs/kit';

export const load = ({ url }: { url: URL }): RouteQuery => {
  let app = url.searchParams.get(APP_QUERY_PARAM)?.trim();
  let goto = url.searchParams.get(GOTO_QUERY_PARAM)?.trim();

  if (!app && !goto) {
    throw redirect(302, '/?goto=/account');
  }

  return { app, path: url.searchParams.get(PATH_QUERY_PARAM), goto } as RouteQuery;
};
