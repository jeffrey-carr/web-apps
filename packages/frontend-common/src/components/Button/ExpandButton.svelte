<script lang="ts">
  import { ReactiveIcon } from '../index';

  let {
    icon = 'left-arrow',
    theme = 'primary',
    onclick,
    children,
  }: {
    icon?: 'left-arrow' | 'right-arrow' | 'account';
    theme?: 'primary' | 'secondary';
    onclick?: () => void;
    children?: () => any;
  } = $props();
</script>

<div class="container">
  <button class={`button ${theme}`} {onclick}>
    {#if icon != null}
      <ReactiveIcon {icon} />
    {/if}
    <span class="text">{@render children?.()}</span>
  </button>
</div>

<style lang="scss">
  .container {
    height: 3rem;
  }

  .button {
    --transition-ms: 300ms;
    --transition-delay-ms: 50ms;

    --reactive-icon-fill: var(--theme-primary);
    --reactive-icon-width: 100%;

    --main-color: var(--theme-primary-parent, var(--theme-primary));
    --text-color: var(--theme-color-parent, var(--theme-text-primary));
    --text-second-color: var(--theme-second-color-parent, var(--theme-text-secondary));

    --reactive-icon-fill: var(--text-color);

    position: relative;
    display: flex;
    align-items: center;

    height: 3rem;
    padding: 0.5rem;
    min-width: 3rem;
    max-width: 3rem;
    overflow: hidden;

    background-color: transparent;
    // color: var(--text-color);
    color: orange;
    border: 1px solid var(--main-color);
    border-radius: 50%;
    cursor: pointer;

    transition:
      max-width var(--transition-ms) ease-in-out,
      padding var(--transition-ms) ease-in-out,
      background-color var(--transition-ms) ease-in-out,
      color var(--transition-ms) ease-in-out,
      border-radius var(--transition-ms) ease-in-out var(--transition-delay-ms);

    .text {
      opacity: 0;
      white-space: nowrap;
      transform: translateX(-0.5rem);
      transition:
        opacity 0.3s ease,
        transform 0.3s ease,
        width 0.3s ease var(--transition-delay-ms);
    }

    &:hover {
      --reactive-icon-width: 1.5rem;
      --reactive-icon-fill: var(--text-second-color);
      --reactive-icon-margin: 0 0.5rem 0 0;

      max-width: 10rem;
      padding-left: 0.75rem;
      padding-right: 0.75rem;
      border-radius: 18px;
      background-color: var(--main-color);
      color: var(--text-second-color);

      transition:
        max-width var(--transition-ms) ease-in-out var(--transition-delay-ms),
        padding var(--transition-ms) ease-in-out var(--transition-delay-ms),
        border-radius var(--transition-ms) ease-in-out;

      .text {
        opacity: 1;
        transform: translateX(0);
        color: inherit;
      }
    }

    &.secondary {
      --main-color: var(--theme-secondary);
      --text-color: var(--theme-text-secondary);
      --text-second-color: var(--theme-text-primary);
    }
  }
</style>
