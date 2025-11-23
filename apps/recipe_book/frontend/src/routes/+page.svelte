<script lang="ts">
  import { page } from '$app/state';
  import { onMount } from 'svelte';
  import {
    App,
    APP_QUERY_PARAM,
    Button,
    epochStringToFriendlyPrintDate,
    getAppURL,
    Input,
    PATH_QUERY_PARAM,
    ServerError,
    Spinner,
    type Environment,
  } from '@jeffrey-carr/frontend-common';
  import styles from './page.module.scss';
  import { PUBLIC_ENVIRONMENT } from '$env/static/public';
  import type { Recipe } from '$lib/types/recipe';
  import { getHomeRecipes } from '$lib/requests/recipe';
  import { cookTimeToStr } from '$lib/mappers/recipe';
  import { RecipeCard } from '$lib/components';

  let recipes = $state<Recipe[]>([]);
  let loading = $state(false);
  let hasLoaded = $state(false);

  onMount(async () => {
    if (hasLoaded) return;

    loading = true;
    recipes = await getRecipes();
    loading = false;
    hasLoaded = true;
  });

  // TODO - make this better (pull it out of page n stuff)
  const getRecipes = async (): Promise<Recipe[]> => {
    const results = await getHomeRecipes();
    if (results instanceof ServerError) {
      console.error(`error getting recipe: ${results.message}`);
      return [];
    }

    return results;
  };

  const constructLoginURL = (environment: Environment, path?: string): string => {
    let route = getAppURL(environment, App.Federation);
    route += `?${APP_QUERY_PARAM}=${App.RecipeBook}`;
    if (path && path !== '/') {
      route += `&${PATH_QUERY_PARAM}=${path}`;
    }

    return route;
  };

  let loginURL = $derived(constructLoginURL(PUBLIC_ENVIRONMENT, page.url.pathname.slice(1)));
</script>

<header class={styles.headerContainer}>
  <div class={styles.headerText}>
    <h1>Jean's Recipe Book</h1>
    <span>A Jeffrey Carr jawn</span>
  </div>

  <div class={styles.buttonContainer}>
    <Button size="sm" variant="outline" href={loginURL}>Log in</Button>
  </div>
</header>

<div class={styles.filterContainer}>
  <div class={styles.search}>
    <div class={styles.inputContainer}>
      <Input type="text" placeholder="Search recipes or ingredients..." />
    </div>
    <div class={styles.buttonContainer}>
      <Button size="md">Search</Button>
    </div>
  </div>
  <div class={styles.filters}>
    <select>
      <option>Category</option>
      <option>Beef</option>
      <option>Chicken</option>
    </select>
    <select>
      <option>Author</option>
      <option>Jeff</option>
      <option>Sara</option>
    </select>
    <Button size="md" variant="outline" depth="flat" shape="rect">Clear filters</Button>
    <Button size="md" variant="outline" depth="flat" shape="rect" onclick={() => (loading = true)}>
      Start loading
    </Button>
    <Button size="md" variant="outline" depth="flat" shape="rect" onclick={() => (loading = false)}
      >Stop loading</Button
    >
  </div>
</div>

<Button href="/create">Create recipe</Button>

<div class={styles.contentContainer}>
  {#if loading}
    <div class={styles.pageLoading}>
      <Spinner label="Loading recipes..." />
    </div>
  {:else}
    <div class={styles.recipeContainer}>
      {#each recipes as recipe (recipe.uuid)}
        <div class={styles.recipeCardContainer}>
          <RecipeCard {recipe} />
        </div>
      {/each}
    </div>
  {/if}
</div>
