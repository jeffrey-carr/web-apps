<script lang="ts">
  import styles from './Select.module.scss';
  import type { HTMLSelectAttributes } from 'svelte/elements';
  import type { SelectOption } from './SelectTypes';
  import clsx from 'clsx';

  let {
    options = $bindable([]),
    class: className = '',
    value = $bindable(),
    ...rest
  }: {
    options?: SelectOption[];
  } & HTMLSelectAttributes = $props();
</script>

<select class={clsx(styles.container, className)} bind:value {...rest}>
  {#each options as option}
    <option class={styles.option} value={option.value}>{option.label}</option>
  {/each}
</select>
