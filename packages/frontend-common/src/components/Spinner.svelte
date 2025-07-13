<script lang="ts">
  let {
    theme = 'primary',
  }: {
    theme?: 'primary' | 'secondary' | 'red';
  } = $props();
</script>

<span class={`spinner ${theme}`}></span>

<style lang="scss">
  .spinner {
    --large-spinner-color: var(--light);
    height: 100%;
    aspect-ratio: 1 / 1;
    border: 3px solid var(--large-spinner-color);
    border-radius: 50%;
    display: inline-block;
    position: relative;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;

    &.primary {
      --large-spinner-color: var(--theme-primary);
    }
    &.secondary {
      --large-spinner-color: var(--theme-secondary);
    }
    &.dark {
      --large-spinner-color: var(--dark);
    }
  }

  .spinner::after {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    height: 80%;
    border-radius: 50%;
    border: 3px solid transparent;
    border-bottom-color: var(--red);
    box-sizing: border-box;
  }
  .spinner.primary::after {
    border-bottom-color: var(--theme-primary);
  }
  .spinner.secondary::after {
    border-bottom-color: var(--theme-secondary);
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
