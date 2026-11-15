import type { Character } from '@jeffrey-carr/frontend-common';

export type PlayerData = {
  uuid: string;
  name: string;
  character: Character;
  isHost: boolean;
};
