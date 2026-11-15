export * from './multiplayer';
export * from './sse';

export type Chain = string[];
export type WordChainGameData = {
  uuid: string;
  chain: string[];
  progress: number;
  encryptedState: string;
};

export type ValidateAnswerRequest = {
  guess: string;
  lobbyCode?: string;
  encryptedState?: string;
};
export type ValidateAnswerResponse = {
  state: GameData;
  encryptedState?: string;
  correct: boolean;
  victory: boolean;
  penaltyInSeconds?: number;
};

export type CreateLobbyResponse = {
  code: string;
};

export type GameData = {
  chain: string[];
  progress: number;
};
