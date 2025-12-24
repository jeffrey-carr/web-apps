import { App, Apps, Environment, METHODS, prodEnvironment, RouteInformation, ServerError, User } from "../types"
import { AUTH_COOKIE_NAME } from "../constants/auth";
import { makeRequest } from "../utils";

const getBackendAuthURL = (environment: Environment): string => {
  const subdomain = Apps.Auth.subdomain;
  const port = Apps.Auth.devPort;

  if (environment !== prodEnvironment) {
    return `http://${subdomain}.jeffreycarr.local:${port}`;
  }
  
  return `https://${subdomain}.jeffreycarr.dev`;
};

const getAuthRouteInfo = (environment: Environment): RouteInformation => {
  const backendURL = getBackendAuthURL(environment);
  return {
    path: `${backendURL}/api/auth/authed-user`,
    method: METHODS.GET,
    credentials: 'required',
  };
}

// This is kind of annoying, and maybe older, wiser Jeff will have a better solution to this, but since 
// the cookie is an httpOnly cookie, it isn't available from the frontend so we need to use 'credentials: include'
// in the request to send it. However, that doesn't work from the back. So we need to manually add the cookie to
// the headers. And that's how we end up with 2 methods that do essentially the same thing

/** backendGetUser manually adds the user cookie to the headers so it can be called from the backend */
export const backendGetUser = async (environment: Environment, app: App, authCookie: string, f?: typeof fetch): Promise<User | null> => {
  return await makeRequest(
    getAuthRouteInfo(environment),
    {
      query: { app },
      additionalHeaders: { cookie: `${AUTH_COOKIE_NAME}=${authCookie}` },
    },
    f,
  );
};

/** getUser uses 'credentials: true' to send the cookie to the backend, which is only available
 to the browser, so this method should only be called from the frontend */
export const getUser = async (environment: Environment, app: App, f?: typeof fetch): Promise<User | null> => {
  let response: User;
  try {
    response = await makeRequest(
    getAuthRouteInfo(environment),
    { query: { app } },
    f,
  );
  } catch (e) {
    const err = e as ServerError;
    // a 400 is thrown if the cookie isn't present
    if (err.status === 400) {
      return null;
    }

    throw err;
  }

  return response;
};
