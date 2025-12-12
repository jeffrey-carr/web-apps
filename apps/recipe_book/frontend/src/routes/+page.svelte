<script lang="ts">
  import { page } from '$app/state';
  import { onMount } from 'svelte';
  import {
    App,
    APP_QUERY_PARAM,
    Button,
    CharacterIcon,
    getAppURL,
    getUser,
    PATH_QUERY_PARAM,
    ServerError,
    Spinner,
    type Environment,
  } from '@jeffrey-carr/frontend-common';
  import styles from './page.module.scss';
  import { PUBLIC_ENVIRONMENT } from '$env/static/public';
  import type { Recipe, UserFavoriteRecipe } from '$lib/types/recipe';
  import {
    deleteRecipe,
    favoriteRecipe,
    getHomeRecipes,
    unFavoriteRecipe,
  } from '$lib/requests/recipe';
  import { MainSidebar, RecipeCard } from '$lib/components';
  import { notificationQueue } from '$lib/globals/notifications.svelte';
  import { userFavorites, userState } from '$lib/globals/user.svelte';
  import { greetUser } from '$lib/mappers/greeting';

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

  let favoritedRecipes = $derived(
    userFavorites.favorites?.map(favorite => favorite.recipeUUID) ?? []
  );

  // TODO - make this better (pull it out of page n stuff)
  const getRecipes = async (): Promise<Recipe[]> => {
    const results = await getHomeRecipes();
    if (results instanceof ServerError) {
      console.error(`error getting recipe: ${results.message}`);
      notificationQueue.push({
        level: 'error',
        title: 'Error getting recipes',
        message: results.message,
      });
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

  const applyFilters = () => {
    loading = !loading;
  };

  const onFavoriteRecipe = async (recipeUUID: string): Promise<boolean> => {
    let result;
    let errTitle;
    if (favoritedRecipes.includes(recipeUUID)) {
      result = await unFavoriteRecipe(recipeUUID);
      errTitle = 'Error unfavoriting recipe';
      if (result == null && userFavorites.favorites != null && userFavorites.favorites.length > 0) {
        const idx = userFavorites.favorites.findIndex(fav => fav.recipeUUID === recipeUUID);
        if (idx >= 0) {
          userFavorites.favorites.splice(idx, 1);
        }
      }
    } else {
      result = await favoriteRecipe(recipeUUID);
      errTitle = 'Error favoriting recipe';
      if (!(result instanceof ServerError)) {
        if (userFavorites.favorites == null) {
          userFavorites.favorites = [];
        }

        userFavorites.favorites.push(result);
      }
    }

    if (result instanceof ServerError) {
      notificationQueue.push({
        level: 'error',
        title: errTitle,
        message: result.message,
      });
      return false;
    }

    return true;
  };

  const onDeleteRecipe = async (recipeUUID: string) => {
    const recipeIdx = recipes.findIndex(recipe => recipe.uuid === recipeUUID);
    if (recipeIdx < 0) {
      notificationQueue.push({
        level: 'error',
        title: 'Error deleting recipe',
        message: 'Recipe not found',
      });
      return;
    }

    const response = await deleteRecipe(recipeUUID);
    if (response instanceof ServerError) {
      notificationQueue.push({
        level: 'error',
        title: 'Error deleting recipe',
        message: response.message,
      });
      return;
    }

    recipes.splice(recipeIdx, 1);
  };
</script>

<div class={styles.container}>
  <div class={styles.header}>
    <div class={styles.title}>
      <h1>Jean's Recipe Book</h1>
      <span>A Jeffrey Carr jawn</span>
    </div>

    <div class={styles.userContainer}>
      {#if userState.isLoading}
        <Spinner class={styles.userLoadingSpinner} />
      {:else if userState.user != null}
        <CharacterIcon character={userState.user.character} />
        <p>{greetUser(userState.user.fName)}</p>
      {:else}
        <Button size="sm" variant="secondary" href={loginURL}>Log in</Button>
      {/if}
    </div>
  </div>

  <div class={styles.sidebar}>
    <MainSidebar onApplyFilters={applyFilters} />
  </div>

  <div class={styles.main}>
    {#if loading || userFavorites.isLoading}
      <Spinner class={styles.pageLoading} label="Loading recipes..." />
    {:else}
      <div class={styles.recipeContainer}>
        {#each recipes as recipe (recipe.uuid)}
          <div class={styles.recipeCardContainer}>
            <RecipeCard
              {recipe}
              isFavorited={favoritedRecipes.includes(recipe.uuid)}
              onFavorite={() => onFavoriteRecipe(recipe.uuid)}
              onDelete={() => onDeleteRecipe(recipe.uuid)}
            />
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>
