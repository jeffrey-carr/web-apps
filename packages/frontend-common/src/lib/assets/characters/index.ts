import { Character } from '../../../types';

// import unknown from './???.png';
// import ctrlzilla from './ctrlzilla.png';
// import alien from './alien_degeneres.png';
// import eyezac from './eyezac_screamalot.png';
// import glitchard from './glitchard_simmons.png';
// import waddle from './waddle_combs.png';
// import wanda from './wandaconda.png';

// export const CharacterToIcon: Record<Character, string> = {
//   "???": unknown,
//   "alien_degeneres": alien,
//   "ctrlzilla": ctrlzilla,
//   "eyezac_screamalot": eyezac,
//   "glitchard_simmons": glitchard,
//   "waddle_combs": waddle,
//   "wandaconda": wanda,
// };

export const CharacterToIcon: Record<Character, string> = {
  "???": new URL('./unknown.png', import.meta.url).href,
  "alien_degeneres": new URL('./alien_degeneres.png', import.meta.url).href,
  "ctrlzilla": new URL('./ctrlzilla.png', import.meta.url).href,
  "eyezac_screamalot": new URL('./eyezac_screamalot.png', import.meta.url).href,
  "glitchard_simmons": new URL('./glitchard_simmons.png', import.meta.url).href,
  "waddle_combs": new URL('./waddle_combs.png', import.meta.url).href,
  "wandaconda": new URL('./wandaconda.png', import.meta.url).href,
};
