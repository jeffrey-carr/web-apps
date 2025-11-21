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
    type Environment,
  } from '@jeffrey-carr/frontend-common';
  import styles from './page.module.scss';
  import { PUBLIC_ENVIRONMENT } from '$env/static/public';
  import type { Recipe } from '$lib/types/recipe';
  import { getHomeRecipes } from '$lib/requests/recipe';
  import { msToCookTime } from '$lib/mappers/recipe';

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
    return getHomeRecipes();
  };

  const constructLoginURL = (environment: Environment, path?: string): string => {
    let route = getAppURL(environment, App.Federation);
    route += `?${APP_QUERY_PARAM}=${App.RecipeBook}`;
    if (path && path !== '/') {
      route += `&${PATH_QUERY_PARAM}=${path}`;
    }

    return route;
  };

  const cookTimeToStr = (ms?: number): string => {
    if (ms == null) {
      return 'Unknown';
    }

    const hoursAndMinutes = msToCookTime(ms);
    const hours = hoursAndMinutes.getFirst();
    const minutes = hoursAndMinutes.getSecond();

    let str = '';
    if (hours > 0) {
      const plural = hours > 1;
      str += `${hours} hour${plural ? 's' : ''}`;
    }

    if (minutes > 0) {
      const plural = minutes > 1;
      str += `${minutes} minute${plural ? 's' : ''}`;
    }

    return str;
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
  </div>

  <Button href="/create">Create recipe</Button>

  <div class={styles.recipeContainer}>
    {#each recipes as recipe (recipe.uuid)}
      <div id={recipe.uuid}>
        <h3>{recipe.name}</h3>
        <div class={styles.recipe}>
          <ul>
            <li>
              <b>Description</b>
              <br />
              {@html recipe.description}
            </li>
            <li>
              <b>Cook time: {cookTimeToStr(recipe.cookTimeMs)}</b>
            </li>
            <li>
              <b>Author UUID: {recipe.authorUUID}</b>
            </li>
            <li><b>{recipe.sections.length}</b> sections</li>
            <li>
              <b>Created at:</b>
              {epochStringToFriendlyPrintDate(recipe.createdAt)}
            </li>
          </ul>
        </div>
      </div>
    {/each}
  </div>
</div>
