<script lang="ts">
  import { writable } from 'svelte/store';
  import { Spinner } from '@jeffrey-carr/frontend-common';
  import styles from './layout.module.scss';
  import type { LayoutProps } from './$types';
  import type { Recipe } from '$lib/types/recipe';
  import { setContext } from 'svelte';

  let { data, children }: LayoutProps = $props();

  let recipe = $state<{ current: Recipe | null }>({ current: null });
  setContext('recipe', recipe);

  data.recipePromise.then(resolvedRecipe => {
    recipe.current = resolvedRecipe;
  });
</script>

{#await data.recipePromise}
  <div class={styles.container}>
    <Spinner label="Loading recipe..." size="2rem" />
  </div>
{:then}
  {@render children?.()}
{/await}
