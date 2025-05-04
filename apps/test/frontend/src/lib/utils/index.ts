const isBrowser = typeof window !== 'undefined';

export const putLocalStorage = <T>(key: string, value: T) => {
  if (!isBrowser) {
    console.error("browser not available, skipping `put`");
    return;
  }

  const stringified = JSON.stringify(value);
  localStorage.setItem(key, stringified);
};

export const getLocalStorage = <T>(key: string): T | null => {
  if (!isBrowser) {
    console.error("browser not available, skipping `get`");
    return null;
  }

  const stringified = localStorage.getItem(key);
  if (stringified == null) {
    return null;
  }
  
  return JSON.parse(stringified);
};

export const deleteLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};
