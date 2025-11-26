export type User = {
  uuid: string;
  email: string;
  fName: string;
  lName: string;
  isAdmin: boolean;
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

export const CharacterToSrc: Record<Character, URL> = {
  "???": new URL('https://objectstorage.us-ashburn-1.oraclecloud.com/n/idfb9sbi5d4p/b/shared/o/unknown.png'),
  "ctrlzilla": new URL('https://objectstorage.us-ashburn-1.oraclecloud.com/n/idfb9sbi5d4p/b/shared/o/ctrlzilla.png'),
  "wandaconda": new URL('https://objectstorage.us-ashburn-1.oraclecloud.com/n/idfb9sbi5d4p/b/shared/o/wandaconda.png'),
  "eyezac_screamalot": new URL('https://objectstorage.us-ashburn-1.oraclecloud.com/n/idfb9sbi5d4p/b/shared/o/eyezac_screamalot.png'),
  "waddle_combs": new URL('https://objectstorage.us-ashburn-1.oraclecloud.com/n/idfb9sbi5d4p/b/shared/o/waddle_combs.png'),
  "glitchard_simmons": new URL('https://objectstorage.us-ashburn-1.oraclecloud.com/n/idfb9sbi5d4p/b/shared/o/glitchard_simmons.png'),
  "alien_degeneres": new URL('https://objectstorage.us-ashburn-1.oraclecloud.com/n/idfb9sbi5d4p/b/shared/o/alien_degeneres.png')
}
