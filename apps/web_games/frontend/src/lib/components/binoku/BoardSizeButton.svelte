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
  }
</style>
