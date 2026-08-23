import { Environment, prodEnvironment } from '../types/';

export enum App {
  Auth = 'Auth', // Represents backend-auth requests
  Federation = 'Federation',
  WebGames = 'WebGames',
  RecipeBook = 'RecipeBook',
}

export type AppInfo = {
  friendlyName: string;
  subdomain: string;
  devPort: string;
};

export const Apps: Record<App, AppInfo> = {
  Auth: {
    friendlyName: '01100001 01110101 01110100 01101000',
    subdomain: 'login',
    devPort: '5175',
  },
  Federation: {
    friendlyName: 'The Jeffiverse Portal',
    subdomain: 'login',
    devPort: '5175',
  },
  WebGames: {
    friendlyName: "Jeff's Web Games",
    subdomain: 'games',
    devPort: '5173',
  },
  RecipeBook: {
    friendlyName: "Jean's Recipe Book",
    subdomain: 'recipe',
    devPort: '5176',
  },
};

export const APP_QUERY_PARAM = 'app';
export const GOTO_QUERY_PARAM = 'goto';
export const PATH_QUERY_PARAM = 'path';

export const isValidApp = (value: string): boolean => {
  return Object.values(App).includes(value as App);
};

export const buildAppURL = (environment: Environment, app: AppInfo): string => {
  if (environment !== prodEnvironment) {
    return `http://${app.subdomain}.jeffreycarr.local:${app.devPort}`;
  }

  return `https://${app.subdomain}.jeffreycarr.dev`;
};
