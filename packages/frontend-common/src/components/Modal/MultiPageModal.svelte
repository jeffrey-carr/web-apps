<script lang="ts">
  import { Button, Modal, ReactiveIcon } from '../index';

  let {
    open = $bindable(),
    currentPage = $bindable(),
    content,
    numPages,
    height = '60vh',
    width = '70vw',
    allowWrapping,
  }: {
    open: boolean;
    currentPage: number;
    content: (i: number) => any;
    numPages: number;
    height?: string;
    width?: string;
    allowWrapping?: boolean;
  } = $props();

  $effect(() => {
    if (currentPage < 0 || currentPage >= numPages) {
      console.error(`Page ${currentPage} is not a valid page number!`);
      currentPage = 0;
    }
  });

  const nextPage = () => {
    if (allowWrapping) {
      currentPage = (currentPage + 1) % numPages;
    } else {
      currentPage = Math.min(numPages - 1, currentPage + 1);
    }
  };

  const previousPage = () => {
    if (allowWrapping) {
      currentPage -= 1;
      if (currentPage < 0) currentPage = numPages - 1;
    } else {
      currentPage = Math.max(0, currentPage - 1);
    }
  };
</script>

<Modal bind:open>
  <div
    class="container"
    style={`--height: ${height}; --width: ${width}; --position: ${currentPage}`}
  >
    <!-- {#each pages as page} -->
    <div class="page-container">
      {#each { length: numPages } as _, page}
        <div class="page">
          <div class="content">
            {@render content(page)}
          </div>
        </div>
      {/each}
      <div class="footer">
        <Button size="small" onclick={previousPage} disabled={currentPage === 0}>
          <ReactiveIcon icon="left-arrow" />
        </Button>
        {#each { length: numPages } as _, i}
          <div class={`dot ${currentPage === i ? 'highlighted' : ''}`}></div>
        {/each}
        <Button size="small" onclick={nextPage} disabled={currentPage === numPages - 1}>
          <ReactiveIcon icon={'right-arrow'} />
        </Button>
      </div>
    </div>
  </div>
</Modal>

<style lang="scss">
  .container {
    --height: 55vh;
    --width: 70vw;
    --position: 0;
    --gap: 5rem;
    --footer-height: 1.5rem;

    position: relative;

    height: var(--height);
    max-width: 95vw;
    width: var(--width);

    text-align: center;

    overflow-x: hidden;
  }

  .page-container {
    display: flex;
    gap: var(--gap);

    height: 100%;

    margin-bottom: 2rem;
  }

  .page {
    position: relative;
    left: calc((-100% - var(--gap)) * var(--position));

    display: flex;
    flex-direction: column;

    height: 100%;
    width: var(--width);
    max-width: 95vw;
    flex-shrink: 0;

    padding: 1rem;

    transition: left 350ms ease;

    .content {
      display: flex;
      flex-direction: column;
      align-items: center;

      height: 100%;
      width: 100%;
    }
  }

  .footer {
    --height: calc(var(--footer-height) / 2);

    position: fixed;
    bottom: 0;
    z-index: 1001;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;

    width: 100%;

    padding: var(--height) 0;

    transition: background-color 350ms ease;

    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }

    .dot {
      --transition-ms: 250ms;
      --button-gap: 10rem;

      height: 1rem;
      width: 1rem;

      border-radius: 100%;
      border: 1px solid var(--theme-primary);

      background-color: transparent;

      transition:
        border var(--transition-ms) ease,
        background-color var(--transition-ms) ease;

      &:first-child {
        margin-right: var(--button-gap);
      }
      &:last-child {
        margin-left: var(--button-gap);
      }

      &.highlighted {
        border: 1px solid var(--theme-secondary);
        background-color: var(--theme-primary);
      }
    }
  }
</style>
