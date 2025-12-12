<script lang="ts">
  import styles from './Select.module.scss';
  import type { HTMLSelectAttributes } from 'svelte/elements';
  import type { SelectOption } from './SelectTypes';
  import clsx from 'clsx';

  let {
    label,
    options = $bindable([]),
    class: className = '',
    value = $bindable(),
    ...rest
  }: {
    label?: string;
    options?: SelectOption[];
  } & HTMLSelectAttributes = $props();
</script>

<div class={styles.container}>
  {#if label}
    <span class={styles.label}>{label}</span>
  {/if}
  <select class={clsx(styles.select, className)} bind:value {...rest}>
    {#each options as option}
      <option class={styles.option} value={option.value}>{option.label}</option>
    {/each}
  </select>
</div>
