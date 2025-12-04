import { makeRequest, METHODS, type RouteInformation } from "@jeffrey-carr/frontend-common";
import type { ValidateGameResponse } from "$lib/types/binoku";

const newGameRouteInfo: RouteInformation = {
  path: '/api/binoku/new-game',
  method: METHODS.GET,
  credentials: 'optional',
};
export const newGame = async (size: number): Promise<number[][]> => {
  return await makeRequest(newGameRouteInfo, { query: { size } });
};

const validateAnswerRouteInfo: RouteInformation = {
  path: '/api/binoku/validate-board',
  method: METHODS.POST,
  credentials: 'optional',
};
export const validateAnswer = async(board: number[][]): Promise<ValidateGameResponse> => {
  return await makeRequest(validateAnswerRouteInfo, { body: { board } });
};
