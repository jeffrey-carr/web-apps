export * from './apps';
export * from './errors';
export * from './network';
export * from './notification';
export { Stack } from './stack';
export * from './time';
export * from './user';
export type { AppInfo } from './apps';

export type ServerResponse<T = undefined> = {
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
