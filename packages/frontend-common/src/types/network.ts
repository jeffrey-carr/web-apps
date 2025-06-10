export enum METHODS {
  GET = 'GET',
  POST = 'POST',
};

export type RouteInformation = {
  path: string;
  method: METHODS;
};

export type makeRequestParams = {
  query?: Record<string, string | number | boolean>;
  body?: any;
  additionalHeaders?: Record<string, string>;
}