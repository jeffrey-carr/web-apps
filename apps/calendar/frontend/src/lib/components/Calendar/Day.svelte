<script lang="ts">
  import { Button } from '@jeffrey-carr/frontend-common';
  import styles from './Day.module.scss';

  let { 
    day,
    contentType,
    data,
    onUpdateImage,
    onUpdateEvents,
  }: { 
    contentType: 'blank' | 'day';
    day?: number;
    data?: string[];
    onUpdateImage?: () => void;
    onUpdateEvents?: () => void;
  } = $props();
</script>

{#snippet hoverContainer(onclick: () => void, label: string)}
  <div class={styles.hoverContainer}>
    <div class={styles.background}></div>
    <div class={styles.hoverContainerButton}>
      <Button {onclick}>{label}</Button>
    </div>
  </div>
{/snippet}

{#snippet dayCell()}
  <div class={styles.cell}>
    <div class={styles.dayNumber}>
      {day}
    </div>
    <div class={styles.dayContent}>
      <ul class={styles.dayContentList}>
        {#each data ?? [] as d}
          <li>{d}</li>
        {/each}
      </ul>
    </div>
    {@render hoverContainer(onUpdateEvents!, "Edit Events")}
  </div>
{/snippet}

{#snippet emptyCell()}
  <div class={styles.cell}>
    {@render hoverContainer(onUpdateImage!, `${data == null || data.length === 0 ? "Add" : "Edit"} Image`)}
  </div>?
{/snippet}

<div class={styles.container}>
  {#if contentType === 'day'}
    {@render dayCell()}
  {:else}
    {@render emptyCell()}
  {/if}
</div>

