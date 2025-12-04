import type { ValidateAnswerRequest, ValidateAnswerResponse, WordChainGameData } from "$lib/types/word-chain";
import { makeRequest, METHODS, type RouteInformation } from "@jeffrey-carr/frontend-common";

const newGameInfo: RouteInformation = {
  path: '/api/word-chain/new-game',
  method: METHODS.GET,
  credentials: 'optional',
};
export const newGame = async (): Promise<WordChainGameData> => {
  return await makeRequest(newGameInfo);
};

const validateAnswerRouteInfo: RouteInformation = {
  path: '/api/word-chain/validate-answer',
  method: METHODS.POST,
  credentials: 'optional',
};
export const validateAnswer = async (request: ValidateAnswerRequest): Promise<ValidateAnswerResponse> => {
  return await makeRequest(validateAnswerRouteInfo, { body: request });
}
