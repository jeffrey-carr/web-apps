<script lang="ts">
  import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';

  import { Spinner } from '../.';

  import styles from './button.module.scss';
  import clsx from 'clsx';

  let {
    class: className,
    animated = true,
    variant = 'primary',
    size = 'md',
    shape = 'rectangular',
    disabled,
    loading,
    children,
    ...rest
  }: {
    class?: string;
    type?: 'button' | 'submit' | 'reset';
    animated?: boolean;
    variant?: 'primary' | 'secondary' | 'plain';
    size?: 'sm' | 'md' | 'lg';
    shape?: 'round' | 'rectangular' | 'box';
    loading?: boolean;
  } & HTMLAnchorAttributes &
    HTMLButtonAttributes = $props();
  let spinnerTheme = $derived<'primary' | 'secondary'>(
    variant === 'secondary' || variant === 'plain' ? 'secondary' : 'primary'
  );

  const steez = clsx(
    styles.button,
    styles[variant],
    styles[size],
    styles[shape],
    {
      [styles.loading]: loading,
      [styles.animated]: animated,
    },
    className // className goes last to make sure callers have full control
  );

  let isAnchor = $derived(Boolean(rest.href) && !disabled);
</script>

{#if isAnchor}
  <a class={clsx(styles.anchor, steez)} {...rest}>
    <span class={clsx(styles.content, { [styles.hidden]: loading })}>
      {@render children?.()}
    </span>
    {#if loading}
      <div class={styles.spinnerWrapper}>
        <Spinner theme={spinnerTheme} size="1.25rem" />
      </div>
    {/if}
  </a>
{:else}
  <button class={steez} disabled={disabled || loading} {...rest}>
    <span class={clsx(styles.content, { [styles.hidden]: loading })}>
      {@render children?.()}
    </span>
    {#if loading}
      <div class={styles.spinnerWrapper}>
        <Spinner theme={spinnerTheme} size="1.25rem" />
      </div>
    {/if}
  </button>
{/if}
