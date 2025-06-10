<script lang="ts">
  import { Button } from '../.';

  let {
    open = $bindable(),
    children,
  }: {
    open: boolean;
    children?: () => any;
  } = $props();

  $effect(() => {
    addEventListener('keydown', keyListener);

    return () => {
      removeEventListener('keydown', keyListener);
    };
  });

  const keyListener = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      close();
    }
  };

  const close = () => {
    open = false;
  };
</script>

<div class={`container ${open ? 'open' : ''}`}>
  <button class="background" onclick={close} aria-label="Close modal"></button>
  <div class="content-container">
    <div class="close-button">
      <Button onclick={close} size="fill">X</Button>
    </div>
    {@render children?.()}
  </div>
</div>

<style lang="scss">
  .container {
    position: absolute;
    top: 0;
    left: 0;
    z-index: var(--base-z-index);

    height: 100vh;
    width: 100vw;

    margin: 0;
    padding: 0;

    background-color: rgba(0, 0, 0, 0.3);

    transition: opacity 100ms linear;

    overflow: auto;

    /* Hidden settings */
    opacity: 0;
    pointer-events: none;

    &.open {
      opacity: 1;
      pointer-events: all;
    }
  }

  .background {
    position: absolute;
    top: 0;
    left: 0;

    height: 100vh;
    width: 100vw;

    background: transparent;
    border: none;
    box-shadow: none;
  }

  .content-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1001;

    border: 1px solid var(--dark);
    border-radius: 5px;
    color: var(--theme-overlay);
    background-color: var(--theme-overlay-light);
  }

  .close-button {
    --gap: 1rem;
    --size: 2rem;

    position: absolute;
    top: var(--gap);
    left: calc(100% - var(--size) - var(--gap));
    z-index: 1002;

    height: var(--size);
    width: var(--size);
  }
</style>
