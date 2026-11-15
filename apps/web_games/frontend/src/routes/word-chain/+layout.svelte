<script lang="ts">
  import { GameTitle } from '$lib/components';

  let { children }: { children?: () => any } = $props();
</script>

<div class="container">
  <GameTitle title="Word Chain" />
  <main class="content">
    {#if children}
      {@render children()}
    {/if}
  </main>
</div>

<style lang="scss">
  .container {
    display: grid;
    grid-template-rows: auto 1fr;

    height: 100%;
  }

  .content {
    min-height: 0;
  }
</style>
