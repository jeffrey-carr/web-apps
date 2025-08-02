import type { RouteQuery } from '@jeffrey-carr/frontend-common';
import { App, APP_QUERY_PARAM, isValidApp, PATH_QUERY_PARAM } from '@jeffrey-carr/frontend-common';

export const load = ({ url }): RouteQuery => {
  let app = url.searchParams.get(APP_QUERY_PARAM);
  if (!app || !isValidApp(app)) {
    return { app: App.Federation, path: 'account' };
  }
  
  app = app as App;
  return { app, path: url.searchParams.get(PATH_QUERY_PARAM) } as RouteQuery;
};
