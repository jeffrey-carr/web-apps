import { makeRequest, METHODS, ServerError, type RouteInformation, type User } from "@jeffrey-carr/frontend-common";

const verifyEmailRoute: RouteInformation = {
  path: '/api/auth/verify',
  method: METHODS.POST,
  credentials: 'required',
};
export const verifyEmail = async (token: string): Promise<User | ServerError> => {
  let user: User;
  try {
    user = await makeRequest(verifyEmailRoute, {
      query: { token },
    });
  } catch (e) {
    const err = e as ServerError;
    return err;
  }

  return user;
};
