import { App, Environment, METHODS, prodEnvironment, RouteInformation, User } from "../types"
import { AUTH_COOKIE_NAME } from "../constants/auth";
import { makeRequest } from "../utils";

const getBackendAuthURL = (environment: Environment): string => {
  if (environment !== prodEnvironment) {
    return 'http://login.jeffreycarr.local:9999';
  }
  
  return 'https://login.jeffreycarr.dev';
};

const getAuthRouteInfo = (environment: Environment): RouteInformation => {
  const backendURL = getBackendAuthURL(environment);
  return {
    path: `${backendURL}/api/auth/authed-user`,
    method: METHODS.GET,
  };
}

/** Since the front/back getUser methods recieve the same response from the back, let's 
 * share the logic */
const handleUserResponse = async (response: Response): Promise<User | null> => {
  if (response.status !== 200) {
    return null;
  }
  
  const user = await response.json();
  return user;
}

// This is kind of annoying, and maybe older, wiser Jeff will have a better solution to this, but since 
// the cookie is an httpOnly cookie, it isn't available from the frontend so we need to use 'credentials: include'
// in the request to send it. However, that doesn't work from the back. So we need to manually add the cookie to
// the headers. And that's how we end up with 2 methods that do essentially the same thing

/** backendGetUser manually adds the user cookie to the headers so it can be called from the backend */
export const backendGetUser = async (environment: Environment, app: App, authCookie: string) => {
  const response = await makeRequest(
    getAuthRouteInfo(environment),
    { 
      query: { app },
      additionalHeaders: { cookie: `${AUTH_COOKIE_NAME}=${authCookie}` },
    },
    fetch,
  );

  return handleUserResponse(response);
};

/** getUser uses 'credentials: true' to send the cookie to the backend, which is only available
 to the browser, so this method should only be called from the frontend */
export const getUser = async (environment: Environment, app: App): Promise<User | null> => {
  const backendURL = getBackendAuthURL(environment);
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
  
  return handleUserResponse(response);
};

