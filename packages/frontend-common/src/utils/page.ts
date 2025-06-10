import { onDestroy } from "svelte";

export const resizeObserver = (
  node: HTMLElement,
  callback: (height: number, width: number) => void,
) => {
  const resizeObserver = new ResizeObserver(entries => {
    for (let entry of entries) {
      const { height, width } = entry.contentRect;
      callback(height, width);
    }
  });

  resizeObserver.observe(node);

  onDestroy(() => {
    resizeObserver.disconnect();
  });
};
