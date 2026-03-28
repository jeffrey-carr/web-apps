let debounceTimeoutID: number;

export const debounce = async (f: () => void, debounceMs: number) => {
  clearTimeout(debounceTimeoutID);
  debounceTimeoutID = setTimeout(f, debounceMs);
};
