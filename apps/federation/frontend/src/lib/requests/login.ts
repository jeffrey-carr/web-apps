import { isValidEmail, isValidPassword } from "$lib/utils";
import { makeRequest, METHODS, type AuthRequest, type RouteInformation, type ServerMessage } from "@jeffrey-carr/frontend-common";

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
  dirtyRequest: AuthRequest
): Promise<string> => {
  const email = dirtyRequest.email.trim();
  const emailErr = isValidEmail(email);
  if (emailErr.length > 0) {
    return "Email or password is incorrect";
  }

  const password = dirtyRequest.password.trim();
  const passwordErr = isValidPassword(password);
  if (passwordErr.length > 0) {
    return "Email or password is incorrect";
  }

  const cleanRequest: AuthRequest = { email, password };
  const response = await makeRequest(authRoute, {
    body: cleanRequest,
  });
  if (response.status >= 500) {
    return "Error contacting server."
  }
  if (response.status !== 200) {
    return  await response.text();
  }

  return "";
};

const fullInfo: RouteInformation = {
  path: '/api/auth/logout',
  method: METHODS.POST,
  credentials: 'required',
};
export const logout = async () => {
  const response = await makeRequest(fullInfo, {
    body: { logoutEverywhere: true },
  });
  if (response.status !== 200) {
    const serverMessage: ServerMessage = await response.json();
    throw serverMessage;
  }

  return;
};
