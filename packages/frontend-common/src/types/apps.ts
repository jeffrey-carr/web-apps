export enum App {
  Auth = 'Auth', // Represents backend-auth requests
  Federation = 'Federation',
  WebGames = 'WebGames',
  Calendar = 'Calendar',
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
    devPort: '9999',
  },
  Federation: {
    friendlyName: 'The Jeffiverse Portal',
    subdomain: 'login',
    devPort: '5175',
  },
  WebGames: {
    friendlyName: 'Jeff\'s Web Games',
    subdomain: 'games',
    devPort: '5173',
  },
  Calendar: {
    friendlyName: 'Jeff\'s Calendar Creator',
    subdomain: 'calendar',
    devPort: '5173',
  },
};

export const APP_QUERY_PARAM = 'app';
export const PATH_QUERY_PARAM = 'path';

export const isValidApp = (value: string): boolean => {
  return Object.values(App).includes(value as App);
};
