<script lang="ts">
  import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';

  import { Spinner } from '../.';

  import styles from './button.module.scss';
  import clsx from 'clsx';

  let {
    class: className,
    animated = true,
    variant = 'primary',
    size,
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
    `${variant === 'primary' ? 'secondary' : 'primary'}`
  );

  const steez = clsx(
    styles.button,
    styles[variant],
    styles[size ?? ''],
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
  <a class={steez} {...rest}>
    {#if loading}
      <Spinner theme={spinnerTheme} />
    {:else}
      {@render children?.()}
    {/if}
  </a>
{:else}
  <button class={steez} disabled={disabled || loading} {...rest}>
    {#if loading}
      <Spinner theme={spinnerTheme} />
    {:else}
      {@render children?.()}
    {/if}
  </button>
{/if}
