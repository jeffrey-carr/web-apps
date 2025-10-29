export const getUserLocale = (window: Window & typeof globalThis): string | undefined => {
  if (!window) {
    return;
  }

  return window.navigator.language;
};
