import { PUBLIC_BACKEND_URL } from "$env/static/public";
import { METHODS, type RouteInformation } from "@jeffrey-carr/frontend-common";

/* Network */
export const ROUTES: Record<string, RouteInformation> = {
  NEW_GAME: {
    path: `${PUBLIC_BACKEND_URL}/api/binoku/new-game`,
    method: METHODS.GET,
  },
  VALIDATE_GUESS: {
    path: `${PUBLIC_BACKEND_URL}/api/binoku/validate-board`,
    method: METHODS.POST,
  },
} as const;

export type NewGameResponse = {
  board: number[][];
};

export type ValidateGameResponse = {
  valid: boolean;
  hint: InvalidHint;
};

/* Game Types */
export type BoardStyle = 'numbers' | 'colors' | 'both';

export type Coordinate = {
  col: number;
  row: number;
};

export type InvalidHint = {
  rows?: number[];
  cols?: number[];
};

export type DropdownOption = {
  label: string;
  onclick: () => void;
};

export type ValidateResponse = {
  valid: boolean;
  hint?: InvalidHint;
};
