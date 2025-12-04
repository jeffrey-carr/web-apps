<script lang="ts">
  import type { PageProps } from './$types';
  let { data }: PageProps = $props();
</script>

<h1>{data.recipe.name}</h1>
<div>
  {@html data.recipe.description}
  <a href="/">Back to home</a>
</div>
