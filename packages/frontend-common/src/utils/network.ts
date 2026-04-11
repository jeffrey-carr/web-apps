import type { makeRequestParams, RouteInformation } from "../types/network";
import { METHODS } from '../types/network';
import type { Environment } from "../types";
import { App, Apps, prodEnvironment } from "../types";
import { ServerError } from "../types/errors";

export const makeRequest = async <T, E = undefined>(
  info: RouteInformation, 
  params: makeRequestParams = {}, 
  fetcher: typeof fetch = fetch,
): Promise<T> => { let headers: Record<string, string> = {};
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
  let credentials: RequestCredentials = 'include';
  if (info.credentials === 'none') {
    credentials = 'omit';
  }

  let response = await fetcher(pathWithQuery, {
    method: info.method,
    credentials, 
    headers,
    body,
  });
  
  // Just commenting because someday I'm predicting I'll return a non-200 that isn't an error
  // and this will be my told-you-so
  if (response.status !== 200) {
    const errorResponse: ServerError<E> = await response.json();
    throw new ServerError(response.status, errorResponse.message, errorResponse.data);
  }

  return await response.json();
}


export const getAppURL = (environment: Environment, app: App): string => {
  const info = Apps[app];
  if (!info) {
    return "";
  }
  
  if (environment === prodEnvironment) {
    return `https://${info.subdomain}.jeffreycarr.dev`;
  }
  
  return `http://${info.subdomain}.jeffreycarr.local:${info.devPort}`;
};

export const getErrorFromServer = <T = undefined>(e: unknown): ServerError<T> => {
  if (e instanceof ServerError) {
      return e;
    } else {
      return {
        status: 500,
        message: "Unknown error",
      } as ServerError<T>;
    }
}
