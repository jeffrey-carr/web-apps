import { makeRequest, METHODS, ServerError, type Character, type RouteInformation, type User } from "@jeffrey-carr/frontend-common";

export const updatePassword = async (userUUID: string, password: string, newPassword: string): Promise<void | ServerError> => {
  let routeInfo: RouteInformation = {
    path: `/api/user/${userUUID}/update-password`,
    method: METHODS.PUT,
    credentials: 'required',
  };
  try {
    await makeRequest(routeInfo, { body: { password, newPassword }});
  } catch (e) {
    return e as ServerError;
  }
};

export type UpdateUserRequest = {
  fName?: string;
  lName?: string;
  character?: Character;
};
export const updateUser = async (userUUID: string, request: UpdateUserRequest): Promise<User | ServerError> => {
  let routeInfo: RouteInformation = {
    path: `/api/user/${userUUID}/update`,
    method: METHODS.PUT,
    credentials: 'required',
  };
  let updatedUser: User;
  try {
    updatedUser = await makeRequest(routeInfo, { body: request });
  } catch (e) {
    console.error(e);
    return e as ServerError;
  }

  return updatedUser;
};
