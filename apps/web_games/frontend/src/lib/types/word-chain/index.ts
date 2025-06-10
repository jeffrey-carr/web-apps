import { PUBLIC_BACKEND_URL } from "$env/static/public";
import { METHODS, type RouteInformation } from "@jeffrey-carr/frontend-common";

/* Network */
export const ROUTES: Record<string, RouteInformation> = {
  NEW_GAME: { 
    path: `${PUBLIC_BACKEND_URL}/api/word-chain/new-game`,
    method: METHODS.GET,
  },
  VALIDATE_ANSWER: {
    path: `${PUBLIC_BACKEND_URL}/api/word-chain/validate-answer`,
    method: METHODS.POST,
  },
} as const;

export type NewGameResponse = {
  
};

/* Game Types */
export type Chain = string[];
export type WordChainState = {
  uuid: string;
  generatedChain: Chain;
  userProgress: number;
};
export type WordChainGame = {
  data: WordChainState;
  encryptedState: string;
};

export type ValidateAnswerRequest = {
  guess: string;
  gameState: {
    encryptedState: string;
    data: {
      uuid: string;
      generatedChain: string[];
      userProgress: number;
    };
  };
  encryptedState: string;
};
export type ValidateAnswerResponse = {
  correct: boolean;
  victory: boolean;
  updatedGame: WordChainGame;
};

