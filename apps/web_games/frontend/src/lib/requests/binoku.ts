import { makeRequest, METHODS, type RouteInformation } from "@jeffrey-carr/frontend-common";
import { handleResponse } from ".";
import type { ValidateGameResponse } from "$lib/types/binoku";

const newGameRouteInfo: RouteInformation = {
  path: '/api/binoku/new-game',
  method: METHODS.GET,
  credentials: 'optional',
};
export const newGame = async (size: number): Promise<number[][]> => {
  const response = await makeRequest(newGameRouteInfo, { query: { size } });
  return handleResponse(response);
};

const validateAnswerRouteInfo: RouteInformation = {
  path: '/api/binoku/validate-board',
  method: METHODS.POST,
  credentials: 'optional',
};
export const validateAnswer = async(board: number[][]): Promise<ValidateGameResponse> => {
  const response = await makeRequest(validateAnswerRouteInfo, { body: { board } });
  return handleResponse(response);
};
