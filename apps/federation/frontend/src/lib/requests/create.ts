import type { createAccountRequest } from "$lib/types";
import { isValidEmail, isValidName, isValidPassword } from "$lib/utils";
import { makeRequest, METHODS, type RouteInformation } from "@jeffrey-carr/frontend-common";

const createRoute: RouteInformation = {
  path: '/api/auth/create',
  method: METHODS.POST,
  credentials: 'required',
};

/**
 * createAccount sends the user create request to the server
 * @param request The create account request
 * @returns An error string
 */
export const createAccount = async (
  request: createAccountRequest
): Promise<string> => {
  const email = request.email.trim();
  const emailErr = isValidEmail(email);
  if (emailErr.length > 0) {
    return emailErr;
  }

  const password = request.password.trim();
  const passwordErr = isValidPassword(password);
  if (passwordErr.length > 0) {
    return passwordErr;
  }

  const fName = request.fName.trim();
  const fNameErr = isValidName(fName);
  if (fNameErr.length > 0) {
    return fNameErr;
  }

  const lName = request.lName.trim();
  const lNameErr = isValidName(lName);
  if (lNameErr.length > 0) {
    return lNameErr;
  }

  const response = await makeRequest(createRoute, {
    body: { email, password, fName, lName, character: request.character },
  });

  if (response.status !== 200) {
    return "Error creating user";
  }

  return "";
};