import { METHODS, type RouteInformation } from '@jeffrey-carr/frontend-common';

/* Network */
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
