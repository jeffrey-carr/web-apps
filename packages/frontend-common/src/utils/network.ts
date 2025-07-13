import type { makeRequestParams, RouteInformation } from "../types/network";
import { METHODS } from '../types/network';
import type { Environment, User } from "../types";
import { App, Apps, prodEnvironment } from "../types";

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
  let credentials: RequestCredentials = 'omit';
  if (params?.credentials) {
    credentials = 'include';
  }

  return fetch(pathWithQuery, {
    method: info.method,
    credentials, 
    headers,
    body,
  });
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
}

const getAuthURL = (environment: Environment): string => {
  if (environment !== prodEnvironment) {
    return 'http://auth.jeffreycarr.local:8081';
  }
  
  return 'https://auth.jeffreycarr.dev';
};

export const getUser = async (environment: Environment, app: App): Promise<User | null> => {
  const backendURL = getAuthURL(environment);
  const response = await makeRequest(
    {
      path: `${backendURL}/api/auth/authed-user`,
      method: METHODS.GET,
    },
    {
      query: { app },
      credentials: true,
    }
  );

  if (response.status !== 200) {
    return null;
  }
  
  const user = await response.json();
  return user;
}