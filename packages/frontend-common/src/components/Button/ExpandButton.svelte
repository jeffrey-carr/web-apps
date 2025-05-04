<script lang="ts">
  import { ReactiveIcon } from '../index';

  let {
    icon = 'left-arrow',
    onclick,
    children,
  }: {
    icon?: string;
    onclick?: () => void;
    children?: () => any;
  } = $props();
</script>

<div class="container">
  <button class="button" {onclick}>
    {#if icon === 'left-arrow'}
      <ReactiveIcon class="icon" {icon} />
    {/if}
    <!-- <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="icon" viewBox="0 0 16 16">
      {#if icon === 'left-arrow'}
        <path
          fill-rule="evenodd"
          d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
        />
      {/if}
    </svg> -->
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

    position: relative;
    display: flex;
    align-items: center;

    height: 3rem;
    padding: 0.5rem;
    min-width: 3rem;
    max-width: 3rem;
    overflow: hidden;

    background-color: transparent;
    color: var(--theme-text-primary);
    border: 1px solid var(--theme-primary);
    border-radius: 50%;
    cursor: pointer;

    transition:
      max-width var(--transition-ms) ease-in-out,
      padding var(--transition-ms) ease-in-out,
      background-color var(--transition-ms) ease-in-out,
      color var(--transition-ms) ease-in-out,
      border-radius var(--transition-ms) ease-in-out var(--transition-delay-ms);

    .icon {
      width: 100%;
      height: 1.5rem;
      flex-shrink: 0;
      margin-right: 0;
    }

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
      max-width: 10rem;
      padding-left: 0.75rem;
      padding-right: 0.75rem;
      border-radius: 18px;
      background-color: var(--theme-primary);
      color: var(--theme-text-secondary);

      transition:
        max-width var(--transition-ms) ease-in-out var(--transition-delay-ms),
        padding var(--transition-ms) ease-in-out var(--transition-delay-ms),
        border-radius var(--transition-ms) ease-in-out;

      .icon {
        height: 1.5rem;
        width: 1.5rem;
        margin-right: 0.5rem;
        fill: var(--theme-text-secondary);
      }

      .text {
        opacity: 1;
        transform: translateX(0);
        color: inherit;
      }
    }
  }
</style>
