export type Chain = string[];
export type WordChainGameData = {
  uuid: string;
  chain: string[];
  progress: number;
  encryptedState: string;
};

export type ValidateAnswerRequest = {
  guess: string;
  encryptedState: string;
};
export type ValidateAnswerResponse = {
  correct: boolean;
  victory: boolean;
  game: WordChainGameData;
};
