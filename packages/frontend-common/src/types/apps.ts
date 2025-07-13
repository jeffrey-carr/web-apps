export enum App {
  Federation = 'Federation',
  WebGames = 'WebGames',
}

export type AppInfo = {
  subdomain: string;
  devPort: string;
};

export const Apps: Record<App, AppInfo> = {
  Federation: {
    subdomain: 'login',
    devPort: '5175',
  },
  WebGames: {
    subdomain: 'games',
    devPort: '5173',
  },
};

export const APP_QUERY_PARAM = 'app';
export const PATH_QUERY_PARAM = 'path';

export const isValidApp = (value: string): boolean => {
  return Object.values(App).includes(value as App);
};
