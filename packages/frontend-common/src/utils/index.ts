export const ping = (): string => {
  return "pong!";
};

// place files you want to import through the `$lib` alias in this folder.
export const generateRandomNumber = (min: number, max?: number): number => {
  if (max == null) {
    max = min;
    min = 0;
  }

  return Math.random() * max + min;
};

// generateRandomInt generates a random whole number between min (inclusive)
// and max (exclusive)
export const generateRandomInt = (min: number, max?: number): number => {
  return Math.floor(generateRandomNumber(min, max));
};

export const getRandomElement = <T>(arr: T[]): T => {
  const index = generateRandomInt(arr.length);
  return arr[index];
};

export const getRandomHexColor = (): string => {
  return `#${Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0')}`;
};
