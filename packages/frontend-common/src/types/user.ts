export type User = {
  uuid: string;
  email: string;
  fName: string;
  lName: string;
  character: Character;
};

export type AuthRequest = {
  email: string;
  password: string;
};

export const CHARACTERS = [
  "???",
  "ctrlzilla",
  "wandaconda",
  "eyezac_screamalot",
  "waddle_combs",
  "glitchard_simmons",
  "alien_degeneres",
] as const;

export type Character = (typeof CHARACTERS)[number];
export const CharacterToName: Record<Character, string> = {
  "???": "Unknown",
  "ctrlzilla": "Ctrl Zilla",
  "wandaconda": "Wanda Conda",
  "eyezac_screamalot": "Eyezac Screamalot",
  "waddle_combs": "Waddle Combs",
  "glitchard_simmons": "Glitchard Simmons",
  "alien_degeneres": "Alien Degeneres"
};

export const AUTH_COOKIE_NAME = 'auth-data';
