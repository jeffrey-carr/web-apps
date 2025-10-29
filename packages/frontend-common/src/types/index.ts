export { Stack } from './stack';
export * from './network';
export * from './notification';
export * from './user';
export { App, Apps, APP_QUERY_PARAM, isValidApp, PATH_QUERY_PARAM } from './apps';
export type { AppInfo } from './apps';

export type ServerResponse<T> = {
  status: number;
  data: T;
};

export type GoServerResponse = {
  status: number;
  message: string;
  data: any;
};

export type Environment = string;
export const devEnvironment: Environment = 'dev';
export const prodEnvironment: Environment = 'prod';
