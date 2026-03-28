<script lang="ts">
  import clsx from 'clsx';
  import styles from './styles.module.scss';
  import type { Snippet } from 'svelte';

  let {
    trigger,
    content,
    show,
  }: {
    trigger: Snippet;
    content: Snippet;
    show: boolean;
  } = $props();

  let wrapperObj = $state<HTMLDivElement>();
  let contentObj = $state<HTMLDivElement>();
  let scrollY = $state(0);
  let windowHeight = $state(0);
  let isNearBottom = $derived.by(() => {
    scrollY;
    windowHeight;

    if (!wrapperObj || !contentObj) return false;

    const wrapperRect = wrapperObj.getBoundingClientRect();
    const contentHeight = contentObj.offsetHeight;

    const spaceBelow = windowHeight - wrapperRect.bottom;
    return spaceBelow < contentHeight;
  });
</script>

<svelte:window bind:scrollY bind:innerHeight={windowHeight} />
<div bind:this={wrapperObj} class={styles.wrapper}>
  {@render trigger()}

  {#if show}
    <div bind:this={contentObj} class={clsx(styles.content, { [styles.flipped]: isNearBottom })}>
      {@render content()}
    </div>
  {/if}
</div>
