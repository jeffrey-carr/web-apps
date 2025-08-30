import { Icon as BinokuIcon } from '$lib/components/binoku';
import { Icon as WordChainIcon } from '$lib/components/word-chain';
import type { LegacyComponentType } from 'svelte/legacy';

export const AVAILABLE_GAMES = ['binoku', 'wordChain'] as const;
export type Game = (typeof AVAILABLE_GAMES)[number];

type GameInfo = {
  name: string;
  description: string;
  icon: LegacyComponentType;
  path: string;
};

export const GamesInfo: Record<Game, GameInfo> = {
  binoku: {
    name: 'Binoku',
    description: 'A two-toned sudoku game for the ages',
    icon: BinokuIcon,
    path: '/binoku',
  },
  wordChain: {
    name: 'Word Chain',
    description: 'Can you climb the chain?',
    icon: WordChainIcon,
    path: '/word-chain',
  },
};
