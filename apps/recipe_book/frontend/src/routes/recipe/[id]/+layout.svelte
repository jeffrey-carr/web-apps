<script lang="ts">
  import type { LayoutProps } from './$types';
  import type { Recipe } from '$lib/types/recipe';
  import { setContext } from 'svelte';

  let { data, children }: LayoutProps = $props();

  // svelte-ignore state_referenced_locally
  let recipe = $state<{ current: Recipe }>({ current: data.recipe });
  setContext('recipe', recipe);

  $effect(() => {
    recipe.current = data.recipe;
  });
</script>

{@render children?.()}
