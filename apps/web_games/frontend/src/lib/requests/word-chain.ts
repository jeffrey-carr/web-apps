import type {
  CreateLobbyResponse,
  ValidateAnswerRequest,
  ValidateAnswerResponse,
  WordChainGameData,
} from '$lib/types/word-chain';
import { makeRequest, METHODS, type RouteInformation } from '@jeffrey-carr/frontend-common';

const newGameInfo: RouteInformation = {
  path: '/api/word-chain/new-game',
  method: METHODS.GET,
  credentials: 'optional',
};
export const newGame = async (): Promise<WordChainGameData> => {
  return await makeRequest(newGameInfo);
};

const validateAnswerRouteInfo: RouteInformation = {
  path: '/api/word-chain/validate-guess',
  method: METHODS.POST,
  credentials: 'optional',
};
export const validateGuess = async (
  request: ValidateAnswerRequest
): Promise<ValidateAnswerResponse> => {
  return await makeRequest(validateAnswerRouteInfo, { body: request });
};

const createLobbyRouteInfo: RouteInformation = {
  path: '/api/word-chain/new-lobby',
  method: METHODS.POST,
  credentials: 'required',
};
export const createLobby = async () => {
  return await makeRequest<CreateLobbyResponse>(createLobbyRouteInfo);
};

export const buildJoinLobbyRouteInfo = (code: string): RouteInformation => {
  return {
    path: `/api/word-chain/lobby/${code}/join`,
    method: METHODS.GET,
    credentials: 'required',
  };
};
export const buildLeaveLobbyRouteInfo = (code: string): RouteInformation => {
  return {
    path: `/api/word-chain/lobby/leave`,
    method: METHODS.GET,
    credentials: 'required',
  };
};

const buildStartLobbyRouteInfo = (code: string): RouteInformation => {
  return {
    path: `/api/word-chain/lobby/${code}/start`,
    method: METHODS.POST,
    credentials: 'required',
  };
};
export const startLobby = async (code: string): Promise<void> => {
  return await makeRequest(buildStartLobbyRouteInfo(code));
};

const buildProposeRematchRouteInfo = (code: string): RouteInformation => {
  return {
    path: `/api/word-chain/lobby/${code}/propose-rematch`,
    method: METHODS.GET,
    credentials: 'required',
  };
};
export const proposeRematch = async (code: string): Promise<void> => {
  return await makeRequest(buildProposeRematchRouteInfo(code));
};

const buildRespondRematchRouteInfo = (code: string): RouteInformation => {
  return {
    path: `/api/word-chain/lobby/${code}/respond-rematch`,
    method: METHODS.POST,
    credentials: 'required',
  };
};
export const respondRematch = async (code: string, accepted: boolean): Promise<void> => {
  return await makeRequest(buildRespondRematchRouteInfo(code), { body: { accepted } });
};
