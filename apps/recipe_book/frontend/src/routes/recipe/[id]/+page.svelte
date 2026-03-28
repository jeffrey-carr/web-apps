<script lang="ts">
  import {
    Button,
    ExpandButton,
    Modal,
    ReactiveIcon,
    Spinner,
  } from '@jeffrey-carr/frontend-common';
  import { goto } from '$app/navigation';
  import type { PageProps } from './$types';
  import styles from './page.module.scss';
  import { cookTimeToStr } from '$lib/mappers/recipe';
  import RecipeSection from '$lib/components/recipe/RecipeSection/RecipeSection.svelte';
  import IngredientsModal from '$lib/components/recipe/RecipeSection/IngredientsModal.svelte';
  import type { Recipe } from '$lib/types/recipe';

  let { data }: PageProps = $props();
  let showAllIngredients = $state(false);

  const goHome = () => {
    goto('/');
  };
</script>

{#await data.recipePromise}
  <div class={styles.loadingContainer}>
    <Spinner size="2rem" label="Loading recipe..." />
  </div>
{:then recipe}
  {@render pageContent(recipe)}
{/await}

{#snippet pageContent(recipe: Recipe)}
  {@const fullAuthorName = `${recipe.authorFName} ${recipe.authorLName}`.trim()}
  {@const allIngredients = recipe.sections.flatMap((section) => section.ingredients)}

  <IngredientsModal ingredients={allIngredients} bind:open={showAllIngredients} />

  <main class={styles.container}>
    <ExpandButton onclick={goHome}>Back to home</ExpandButton>
    <div class={styles.header}>
      <h1>{recipe.name}</h1>
      <div class={styles.author}>
        {#if !recipe.importURL}
          <p><em>By {fullAuthorName}</em></p>
        {:else}
          <em>Imported by {fullAuthorName}</em>
          <div class={styles.importedLink}>
            View the original recipe <a href={recipe.importURL}>here</a>
          </div>
        {/if}
      </div>
      <div class={styles.cookTime}>
        <ReactiveIcon icon="stopwatch" />
        <span class={styles.actualCookTime}>{cookTimeToStr(recipe.cookTimeMs)}</span>
      </div>
      <div class={styles.description}>
        {@html recipe.description}
      </div>

      <div class={styles.ingredientsAndWakeLock}>
        <Button size="md" variant="secondary" onclick={() => (showAllIngredients = true)}
          >View all ingredients</Button
        >
        <Button size="md" variant="secondary">Keep screen awake</Button>
      </div>
    </div>
    <div class={styles.sections}>
      {#each recipe.sections as section}
        <RecipeSection {section} showTitle={recipe.sections.length > 1} />
      {/each}
    </div>
  </main>
{/snippet}
