<script lang="ts">
  import type { Tag } from '$lib/types/recipe';
  let { data }: { data: Tag } = $props();
</script>

<span class="container">
  {data.name}
</span>

<style lang="scss">
  .container {
    padding: 5px 10px;

    background-color: var(--app-theme-secondary);
    border: 1px solid var(--app-theme-border-color);
    border-radius: 25px;

    font-size: 0.75rem;
  }
</style>
