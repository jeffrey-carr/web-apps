import type { ValidateAnswerRequest, ValidateAnswerResponse, WordChainGameData } from "$lib/types/word-chain";
import { makeRequest, METHODS, type RouteInformation, type ServerResponse } from "@jeffrey-carr/frontend-common";
import { handleResponse } from ".";

const newGameInfo: RouteInformation = {
  path: '/api/word-chain/new-game',
  method: METHODS.GET,
  credentials: 'optional',
};
export const newGame = async (): Promise<WordChainGameData> => {
  const response = await makeRequest(newGameInfo);
  return handleResponse(response);
};

const validateAnswerRouteInfo: RouteInformation = {
  path: '/api/word-chain/validate-answer',
  method: METHODS.POST,
  credentials: 'optional',
};
export const validateAnswer = async (request: ValidateAnswerRequest): Promise<ValidateAnswerResponse> => {
  const response = await makeRequest(validateAnswerRouteInfo, { body: request });
  return handleResponse(response);
}
