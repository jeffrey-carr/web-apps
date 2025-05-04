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
