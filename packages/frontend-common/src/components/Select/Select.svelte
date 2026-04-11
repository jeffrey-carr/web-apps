<script lang="ts">
  import styles from './Select.module.scss';
  import type { HTMLSelectAttributes } from 'svelte/elements';
  import type { SelectOption } from './SelectTypes';
  import { Spinner } from '../.';
  import clsx from 'clsx';

  let {
    label,
    options = $bindable([]),
    loadingOptions = false,
    class: className = '',
    selectClass = '',
    value = $bindable(),
    ...rest
  }: {
    label?: string;
    options?: SelectOption[];
    loadingOptions?: boolean;
    selectClass?: string;
  } & HTMLSelectAttributes = $props();
</script>

<div class={clsx(styles.container, className)}>
  {#if label}
    <span class={styles.label}>{label}</span>
  {/if}
  {#if loadingOptions}
    <div class={clsx(styles.selectContainer, styles.loading, selectClass)}>
      <Spinner size="1.2rem" />
    </div>
  {:else}
    <select class={clsx(styles.selectContainer, styles.select, selectClass)} bind:value {...rest}>
      {#each options as option}
        <option class={styles.option} value={option.value}>{option.label}</option>
      {/each}
    </select>
  {/if}
</div>