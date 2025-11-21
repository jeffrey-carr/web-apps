<script lang="ts">
  import clsx from 'clsx';
  import styles from './Button.module.scss';
  import { default as Spinner } from '../Spinner.svelte';
  import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';

  let {
    variant = 'solid',
    depth = 'raised',
    animated = true,
    size = 'md',
    shape = 'rounded',
    disabled = false,
    loading = false,
    type = 'button',
    onclick,
    href,
    target,
    rel,
    class: className = '',
    children,
  }: {
    // visual
    variant?: 'solid' | 'outline' | 'ghost';
    depth?: 'flat' | 'raised' | '3d';
    animated?: boolean;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    shape?: 'rect' | 'rounded' | 'pill';

    // behavior
    disabled?: boolean;
    loading?: boolean;
    type?: 'button' | 'submit' | 'reset';
    onclick?: () => void;

    // link-polymorphic
    href?: string;
    target?: '_blank' | '_self' | '_parent' | '_top';
    rel?: string;

    class?: string;
    children?: () => any;
  } & HTMLAnchorAttributes &
    HTMLButtonAttributes = $props();

  const rootClass = $derived(
    clsx(styles.root, animated && 'is-animated', loading && 'is-loading', className)
  );
  const isLink = $derived(Boolean(href) && !disabled && !loading);
</script>

{#if isLink}
  <a
    role="button"
    class={rootClass}
    data-variant={variant}
    data-depth={depth}
    data-animated={animated ? 'true' : 'false'}
    data-size={size}
    data-shape={shape}
    aria-busy={loading ? 'true' : 'false'}
    aria-disabled={disabled ? 'true' : 'false'}
    tabindex={disabled ? -1 : 0}
    {href}
    {target}
    {rel}
  >
    <span class={styles.content}>
      {@render children?.()}
    </span>
    {#if loading}
      <div class={styles.loading}>
        <Spinner theme="secondary" />
      </div>
    {/if}
  </a>
{:else}
  <button
    {type}
    {onclick}
    class={rootClass}
    data-variant={variant}
    data-depth={depth}
    data-animated={animated ? 'true' : 'false'}
    data-size={size}
    data-shape={shape}
    disabled={disabled || loading}
    aria-busy={loading ? 'true' : 'false'}
  >
    {#if loading}
      <div class={styles.loading}>
        <Spinner />
      </div>
    {:else}
      <span class={styles.content}>
        {@render children?.()}
      </span>
    {/if}
  </button>
{/if}
