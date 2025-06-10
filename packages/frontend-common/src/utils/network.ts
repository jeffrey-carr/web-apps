import type { makeRequestParams, RouteInformation } from "types/network";
import { METHODS } from "../types/network";

export const makeRequest = async (info: RouteInformation, params?: makeRequestParams): Promise<Response> => {
  let headers: Record<string, string> = {};
  if (info.method === METHODS.POST) {
    headers['Content-Type'] = 'application/json';
  }
  headers = { ...headers, ...params?.additionalHeaders };
  
  let query = "";
  if (params?.query) {
    const queryKeys = Object.keys(params?.query ?? {});
    for (let i = 0; i < queryKeys.length; i++) {
      const key = queryKeys[i];
      query += `${i > 0 ? '&' : ''}${key}=${params.query[key]}`;
    }
  }

  let pathWithQuery = info.path;
  if (query.length > 0) {
    pathWithQuery += `?${query}`;
  }
  
  let body;
  if (params?.body) {
    body = JSON.stringify(params.body);
  }

  return fetch(pathWithQuery, {
    method: info.method,
    headers,
    body,
  });
}