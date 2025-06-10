export { Stack } from './stack';
export * from './network';

export type ServerResponse<T> = {
  status: number;
  data: T;
};
