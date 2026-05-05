<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements';

  import styles from './styles.module.scss';
  import clsx from 'clsx';

  let {
    class: className,
    checked = $bindable(false),
    inverse = $bindable(false),
    allowInverse = false,
    label,
    labelPos = 'before',
    ...rest
  }: {
    class?: string;
    checked?: boolean;
    inverse?: boolean;
    allowInverse?: boolean;
    label?: string;
    labelPos?: 'above' | 'below' | 'before' | 'after';
  } & Omit<HTMLInputAttributes, 'checked'> = $props();

  function handleClick(e: MouseEvent) {
    if (allowInverse) {
      e.preventDefault();
      if (!checked && !inverse) {
        checked = true;
        inverse = false;
      } else if (checked) {
        checked = false;
        inverse = true;
      } else {
        checked = false;
        inverse = false;
      }
    }
  }
</script>

<div class={clsx(styles.container, styles[labelPos])}>
  {#if label && (labelPos === 'before' || labelPos === 'above')}
    <span class={styles.label}>{label}</span>
  {/if}

  <input
    class={clsx(styles.checkbox, className, checked && styles.checked, inverse && styles.inverse)}
    type="checkbox"
    bind:checked
    onclick={handleClick}
    {...rest}
  />

  {#if label && (labelPos === 'after' || labelPos === 'below')}
    <span class={styles.label}>{label}</span>
  {/if}
</div>
