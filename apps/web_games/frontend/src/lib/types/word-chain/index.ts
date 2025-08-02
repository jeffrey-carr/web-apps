import { METHODS, type RouteInformation } from "@jeffrey-carr/frontend-common";

/* Network */
export const ROUTES: Record<string, RouteInformation> = {
  NEW_GAME: { 
    path: '/api/word-chain/new-game',
    method: METHODS.GET,
  },
  VALIDATE_ANSWER: {
    path: `/api/word-chain/validate-answer`,
    method: METHODS.POST,
  },
} as const;

export type NewGameResponse = {
  
};

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

