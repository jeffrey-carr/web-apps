import { App } from './apps';

export enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export type RouteInformation = {
  path: string;
  method: METHODS;
  credentials?: 'required' | 'optional' | 'none';
};

export type makeRequestParams = {
  query?: Record<string, string | number | boolean>;
  body?: any;
  additionalHeaders?: Record<string, string>;
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
