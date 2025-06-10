// place files you want to import through the `$lib` alias in this folder.
import BinokuIcon from '$lib/assets/binoku/game-icon.svg';
import WordChainIcon from '$lib/assets/word-chain/game-icon.svg';

export const AVAILABLE_GAMES = [
  "None",
  "Binoku",
  "WordChain",
] as const;
export type AvailableGame = typeof AVAILABLE_GAMES[number];
export const PLAYABLE_GAMES = AVAILABLE_GAMES.filter(game => game !== 'None');

type GameInfo = {
  name: string;
  description: string;
  icon: string;
};

export const GAME_INFO: Record<AvailableGame, GameInfo> = {
  "None": {
    name: "",
    description: "",
    icon: "",
  },
  "Binoku": {
    name: "Binoku",
    description: "A two-toned sudoku game for the ages",
    icon: BinokuIcon,
  },
  "WordChain": {
    name: "Word Chain",
    description: "Can you climb the chain?",
    icon: BinokuIcon,
  },
}
