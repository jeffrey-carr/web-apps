<script lang="ts">
  let {
    children,
    onclick,
  }: {
    children?: () => any;
    onclick?: () => void;
  } = $props();
</script>

<button class="button" {onclick}>{@render children?.()}</button>

<style lang="scss">
  .button {
    --button-size: 3rem;
    --transition-ms: 200ms;
    --move-x-rem: 0.2rem;
    --move-y-rem: calc(var(--move-x-rem) * -1);

    height: var(--button-size);
    width: var(--button-size);

    color: var(--app-theme-text-secondary);
    background-color: var(--app-theme-gray);

    border: 1px solid var(--dark);
    border-radius: 5px;

    transition:
      color var(--transition-ms) linear,
      background-color var(--transition-ms) linear,
      border-color var(--transition-ms) linear,
      transform var(--transition-ms) linear,
      box-shadow var(--transition-ms) linear;

    &:hover {
      background-color: var(--app-theme-gray-light);

      cursor: pointer;

      transform: translate(var(--move-x-rem), var(--move-y-rem));

      &:nth-child(odd) {
        box-shadow: var(--move-y-rem) var(--move-x-rem) var(--red);
      }
      &:nth-child(even) {
        box-shadow: var(--move-y-rem) var(--move-x-rem) var(--blue);
      }
    }
    &:active {
      --transition-ms: 120ms;
      transform: translate(0, 0);
      box-shadow: none !important;
    }
  }
</style>
