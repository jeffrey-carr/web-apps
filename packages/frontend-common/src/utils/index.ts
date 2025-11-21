import { getRandomElement } from './random';

export { resizeObserver } from './page';
export * from './browser';
export * from './date';
export * from './network';
export * from './random';
export * from './tuple';

export const ping = (): string => {
  return "pong!";
};

export const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const generateGreeting = (): string => {
  return getRandomElement([
    "Hello",
    "Hi",
    "Hey",
    "Yo",
    "Sup",
    "Howdy",
    "Ahoy",
    "Greetings",
    "Welcome",
    "Hola",
    "Aloha",
    "Salutations",
    "Hiya",
    "G'day",
    "Heya",
    "Heyo",
    "Yello",
  ]);
};


