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

