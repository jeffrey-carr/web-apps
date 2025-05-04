<script lang="ts">
  import { Spinner } from '../.';
  import type { ButtonOptions } from './types.js';
  let {
    class: className,
    type = 'primary',
    size = 'fill',
    shape = 'rectangular',
    disabled,
    loading,
    onclick,
    children,
  }: ButtonOptions & { children?: () => any } = $props();
  let containerClass = $derived(`container ${size} ${type}${className ? ` ${className}` : ''}`);
  $inspect(containerClass);
  let buttonClass = $derived(`button ${type} ${shape}`);
</script>

<div class={containerClass}>
  <button class={buttonClass} {onclick} disabled={disabled || loading}>
    {#if loading}
      <Spinner color="dark" />
    {:else}
      {@render children?.()}
    {/if}
  </button>
</div>

<style lang="scss">
  .container {
    /* Defaults to 'fill' */
    height: 100%;
    width: 100%;
  }
  .container.fit {
    height: fit-content;
    width: fit-content;
  }
  .container.small {
    height: 2rem;
    width: 2rem;
  }
  .container.medium {
    height: 2rem;
    width: 6rem;

    font-size: 0.8rem;
  }
  .container.large {
    height: 3.3rem;
    width: 10rem;
  }
  .button {
    --transition-ms: 150ms;
    --transform-x-px: 0;
    --transform-y-px: 0.15rem;
    --border-px: 2px;

    position: relative;

    overflow: hidden;

    height: 100%;
    width: 100%;

    font-family: var(--theme-readable-font);

    // padding: 0.3rem 0.5rem;

    color: var(--theme-text-secondary);
    background-color: var(--theme-primary);

    border: var(--border-px) solid transparent;
    border-radius: var(--default-border-radius);

    box-shadow: var(--transform-x-px) var(--transform-y-px) var(--theme-tertiary);

    transition:
      transform var(--transition-ms) linear,
      box-shadow var(--transition-ms) linear,
      border var(--transition-ms) linear,
      color var(--transition-ms) linear,
      background-color var(--transition-ms) linear;

    &:hover {
      cursor: pointer;
      border: var(--border-px) solid var(--theme-secondary);
    }

    &:active {
      transform: translate(var(--transform-x-px), var(--transform-y-px));
      box-shadow: 0 0;
    }

    &:disabled {
      box-shadow: 0 0;

      color: var(--theme-disabled-text);
      background-color: var(--theme-disabled);

      &:hover {
        cursor: default;
        border: 2px solid transparent;
      }
    }

    &.round {
      border-radius: 25px;
    }

    &.secondary {
      color: var(--theme-secondary);
      background-color: transparent;

      border: 1px solid var(--theme-secondary);

      box-shadow: none;

      &:hover {
        background-color: var(--theme-secondary);
        color: var(--theme-text-secondary);
        transform: none;
        box-shadow: none;
      }
    }

    &.plain {
      color: var(--theme-secondary);
      background-color: transparent;

      &:hover {
        border: 1px solid var(--theme-secondary);

        transform: none;
        box-shadow: none;
      }
    }
  }
</style>
