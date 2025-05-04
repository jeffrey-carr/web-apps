<script lang="ts">
  import type { MultiPageModalContent } from '../../types/index';
  import { Button, Modal, ReactiveIcon } from '../index';

  let {
    open = $bindable(),
    currentPage = $bindable(),
    height = '60vh',
    width = '70vw',
    allowWrapping,
    pages,
  }: {
    open: boolean;
    currentPage: number;
    height?: string;
    width?: string;
    allowWrapping?: boolean;
    pages: MultiPageModalContent[];
  } = $props();

  // $inspect(currentPage);

  $effect(() => {
    if (currentPage < 0 || currentPage >= pages.length) {
      console.error(`Page ${currentPage} is not a valid page number!`);
      currentPage = 0;
    }
  });

  const nextPage = () => {
    if (allowWrapping) {
      currentPage = (currentPage + 1) % pages.length;
    } else {
      currentPage = Math.min(pages.length, currentPage + 1);
    }
  };

  const previousPage = () => {
    if (allowWrapping) {
      currentPage -= 1;
      if (currentPage < 0) currentPage = pages.length - 1;
    } else {
      currentPage = Math.max(0, currentPage - 1);
    }
  };
</script>

<Modal bind:open>
  <div class="container" style={`--height: ${height}; --width: ${width}`}>
    {#each pages as page}
      <div class="page">
        {#if page.title}
          <h1 class="title">
            {page.title}
          </h1>
        {/if}
        <div class="content">
          {#if typeof page.content === 'function'}
            {@html page.content()}
          {:else}
            <p>{page.content}</p>
          {/if}
        </div>
        <div class="footer">
          <Button class="page-button" size="small" onclick={previousPage}>
            <ReactiveIcon class="arrow-icon" icon={'left-arrow'} />
          </Button>
          {#each pages as _, i}
            <div class={`dot ${currentPage === i ? 'highlighted' : ''}`}></div>
          {/each}
          <Button size="small" onclick={nextPage}>
            <ReactiveIcon icon={'right-arrow'} />
          </Button>
        </div>
      </div>
    {/each}
  </div>
</Modal>

<style lang="scss">
  .container {
    --height: 55vh;
    --width: 70vw;

    position: relative;

    height: var(--height);
    max-width: 95vw;
    width: var(--width);

    padding: 1rem;

    text-align: center;
  }

  .page {
    .content {
      margin-top: 1rem;
    }
  }

  .footer {
    display: flex;
    gap: 0.5rem;
  }

  .page-button {
    background-color: red;

    .arrow-icon {
      color: black;
    }
  }
</style>
