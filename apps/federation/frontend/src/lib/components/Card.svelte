<script lang="ts">
  let {
    children,
  }: {
    children?: () => any;
  } = $props();
</script>

<div class="container">
  {@render children?.()}
</div>

<style lang="scss">
  .container {
    min-height: 300px;
    min-width: 400px;

    padding: 3rem;

    border: 1px solid var(--app-theme-primary);
    border-radius: 10px;

    background-color: var(--bg-overlay);
  }
</style>
