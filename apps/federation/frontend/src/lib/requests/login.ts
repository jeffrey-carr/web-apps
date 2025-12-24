import { isValidEmail, isValidPassword } from "$lib/utils";
import { AUTH_COOKIE_NAME, makeRequest, METHODS, ServerError, type AuthRequest, type RouteInformation, type User } from "@jeffrey-carr/frontend-common";

const authRoute: RouteInformation = {
  path: '/api/auth/login',
  method: METHODS.POST,
  credentials: 'required',
};

/**
 * 
 * @param dirtyRequest is the auth request
 * @returns An error message
 */
export const loginRequest = async (
  request: AuthRequest
): Promise<User | ServerError> => {
  let user: User;
  try {
    user = await makeRequest(authRoute, {
      body: request,
    });
  } catch (e) {
    return e as ServerError;
  }

  return user;
};

const fullInfo: RouteInformation = {
  path: '/api/auth/logout',
  method: METHODS.POST,
  credentials: 'required',
};
export const logout = async () => {
  try {
    await makeRequest(fullInfo, {
      body: { logoutEverywhere: true },
    });
  } catch (e) {
    const err = e as ServerError;
    throw err.message;
  }
};

const authRouteBackendInfo: RouteInformation = {
  path: '/api/auth/authed-user',
  method: METHODS.GET,
  credentials: 'required',
};
// authRouteBackend is used when we want to validate a user's cookie server-side
export const authRouteBackend = async (cookie: string, f: typeof fetch): Promise<User | null> => {
  let user: User | null;
  try {
    user = await makeRequest(authRouteBackendInfo, {
      additionalHeaders: { cookie: `${AUTH_COOKIE_NAME}=${cookie}`},
    }, f);
  } catch (e) {
    const err = e as ServerError;
    console.error(`Error getting user: ${err.message}`);
    return null;
  }

  return user;
};
