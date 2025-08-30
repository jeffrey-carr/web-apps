import { METHODS, type RouteInformation } from '@jeffrey-carr/frontend-common';

/* Game Types */
export type Chain = string[];
export type WordChainGameData = {
  uuid: string;
  chain: string[];
  userProgress: number;
  encryptedState: string;
};

export type ValidateAnswerRequest = {
  guess: string;
  payload: WordChainGameData;
};
export type ValidateAnswerResponse = {
  correct: boolean;
  victory: boolean;
  game: WordChainGameData;
};
