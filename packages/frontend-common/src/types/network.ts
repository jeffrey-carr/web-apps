import { App } from './apps';

export enum METHODS {
  GET = 'GET',
  POST = 'POST',
}

export type RouteInformation = {
  path: string;
  method: METHODS;
};

export type makeRequestParams = {
  query?: Record<string, string | number | boolean>;
  body?: any;
  additionalHeaders?: Record<string, string>;
  credentials?: boolean;
};

export type RouteQuery = {
  app?: App;
  path?: string;
};

export const GlobalRoutes: Record<string, RouteInformation> = {
  AUTH: {
    path: '/api/auth/authed-user',
    method: METHODS.GET,
  },
  LOGOUT: {
    path: '/api/auth/logout',
    method: METHODS.POST,
  },
};
