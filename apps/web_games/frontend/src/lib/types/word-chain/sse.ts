import type { Character } from '@jeffrey-carr/frontend-common';
import type { GameData } from '.';

export const SSE_ACTIONS = [
  'player_joined',
  'player_left',
  'game_start',
  'progress_update',
  'winner',
  'propose_rematch',
  'respond_rematch',
] as const;
export type SSEAction = (typeof SSE_ACTIONS)[number];

export type SSEPlayerJoinedData = {
  uuid: string;
  name: string;
  character: Character;
  isHost: boolean;
};

export type SSEPlayerLeftData = {
  uuid: string;
};

export type SSEGameStartData = GameData;

export type SSEProgressUpdateData = {
  playerUUID: string;
  correct: boolean;
  progress: number;
  penaltyInSeconds?: number;
  revealedLetters: number;
};

export type SSEGameWinData = {
  winningUUID: string;
  chain: string[];
  playerData: Record<string, SSEGameWinIndividualUserData>;
};

export type SSEGameWinIndividualUserData = {
  name: string;
  character: Character;
  finalProgress: number;
  disconnectedAt?: number;
};

export type SSERespondRematchData = {
  accepted: boolean;
};
