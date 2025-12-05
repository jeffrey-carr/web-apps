<script lang="ts">
  import { Button, Modal, ReactiveIcon } from '../index';

  import styles from './multiModal.module.scss';

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
    class={styles.container}
    style={`--height: ${height}; --width: ${width}; --position: ${currentPage}`}
  >
    <!-- {#each pages as page} -->
    <div class={styles.pageContainer}>
      {#each { length: numPages } as _, page}
        <div class={styles.page}>
          <div class={styles.content}>
            {@render content(page)}
          </div>
        </div>
      {/each}
      <div class={styles.footer}>
        <Button class={styles.pageButton} onclick={previousPage} disabled={currentPage === 0}>
          <ReactiveIcon icon="left-arrow" />
        </Button>
        {#each { length: numPages } as _, i}
          <div class={`dot ${currentPage === i ? 'highlighted' : ''}`}></div>
        {/each}
        <Button
          class={styles.pageButton}
          onclick={nextPage}
          disabled={currentPage === numPages - 1}
        >
          <ReactiveIcon icon={'right-arrow'} />
        </Button>
      </div>
    </div>
  </div>
</Modal>
