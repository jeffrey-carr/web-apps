<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements';

  import styles from './styles.module.scss';
  import clsx from 'clsx';

  let {
    class: className,
    checked = $bindable(),
    label,
    labelPos = 'before',
    ...rest
  }: {
    class?: string;
    label?: string;
    labelPos?: 'above' | 'below' | 'before' | 'after';
  } & HTMLInputAttributes = $props();
</script>

<div class={clsx(styles.container, styles[labelPos])}>
  {#if label}
    <span class={styles.label}>{label}</span>
  {/if}
  <input class={clsx(styles.checkbox, className)} type="checkbox" {...rest} />
</div>
