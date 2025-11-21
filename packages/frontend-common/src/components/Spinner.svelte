<script lang="ts">
  let {
    theme = 'primary',
  }: {
    theme?: 'primary' | 'secondary';
  } = $props();
</script>

<span class={`spinner ${theme}`}></span>

<style lang="scss">
  .spinner {
    // This is confusing because the primary spinner _class_ is meant to be used with primary
    // colored components. So to contrast with the components the spinner sits on, it should use
    // the opposite color
    --spinner-color: var(--jeffs-spinner-color, var(--theme-secondary));
    --spinner-spin-color: var(--jeffs-spinner-spin-color, var(--spinner-color));
    height: 100%;
    aspect-ratio: 1 / 1;
    border: 3px solid var(--spinner-color);
    border-radius: 50%;
    display: inline-block;
    position: relative;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;

    &.secondary {
      --spinner-color: var(--jeffs-spinner-color, --theme-primary);
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
    border-bottom-color: var(--spinner-spin-color);
    box-sizing: border-box;
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
