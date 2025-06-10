<script lang="ts">
  let { children }: { children?: () => any } = $props();
</script>

<div class="container">
  {@render children?.()}
</div>

<style lang="scss">
  .container {
    height: 100vh;
    width: 100vw;

    overflow: hidden;
  }
</style>
