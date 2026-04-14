<script lang="ts">
  import { page } from '$app/state';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import {
    App,
    APP_QUERY_PARAM,
    Button,
    debounce,
    getAppURL,
    Input,
    PATH_QUERY_PARAM,
    ReactiveIcon,
    ServerError,
    Spinner,
    type Environment,
  } from '@jeffrey-carr/frontend-common';
  import styles from './page.module.scss';
  import { PUBLIC_ENVIRONMENT } from '$env/static/public';
  import {
    deleteRecipe,
    favoriteRecipe,
    getAllTags,
    searchRecipes,
    unFavoriteRecipe,
  } from '$lib/requests/recipe';
  import { MainSidebar, RecipeCard } from '$lib/components';
  import { notificationQueue } from '$lib/globals/notifications.svelte';
  import { userState } from '$lib/globals/user.svelte';
  import { greetUser } from '$lib/mappers/greeting';
  import type { Recipe, SearchOptions, Tag } from '$lib/types/recipe';
  import UserProfileButton from '$lib/components/UserProfileButton/UserProfileButton.svelte';
  import clsx from 'clsx';
  import { makeSearchQueryString } from '$lib/mappers/recipe';

  let { data } = $props();

  let recipes = $state<Recipe[]>([]);
  let totalRecipes = $state<number>();
  let lastLimit = $state<number>();
  let currentPageStr = $state(`${data.searchOpts.page ?? '1'}`);
  let currentPage = $state(data.searchOpts.page ?? 1);
  let totalPages = $derived(
    totalRecipes && lastLimit && lastLimit > 0 ? Math.ceil(totalRecipes / lastLimit) : 0
  );

  const updatePageNum = debounce((newPageStr: string) => {
    if (!newPageStr) {
      return;
    }

    const newPageNum = Number(currentPageStr);
    if (isNaN(newPageNum) || newPageNum < 1 || newPageNum > totalPages) {
      return;
    }

    changePage(newPageNum);
  }, 800);

  $effect(() => {
    updatePageNum(currentPageStr);
  });

  let currentFilters = $state<SearchOptions>({});
  let tags = $state<Tag[]>([]);
  let loadingRecipes = $state(false);
  let loadingTags = $state(false);
  let drawerOpen = $state(false);

  let nameSearchValue = $derived(data.searchOpts.recipeName ?? '');
  let tagUUIDsSearchValue = $state('');
  let favoritesOnlySearchValue = $derived(!!data.searchOpts.favoritesOnly);

  onMount(() => {
    if (loadingRecipes || loadingTags) return;

    const loadData = async () => {
      loadingRecipes = true;
      loadingTags = true;

      const [recipesResult, tagsResult] = await Promise.all([
        searchRecipes(data.searchOpts),
        getAllTags(),
      ]);

      loadingRecipes = false;
      loadingTags = false;

      if (recipesResult instanceof ServerError) {
        notificationQueue.push({
          level: 'error',
          title: 'Error loading recipes',
          message: recipesResult.message,
        });
      } else {
        recipes = recipesResult.data;
        totalRecipes = recipesResult.total;
        lastLimit = recipesResult.limit;
      }

      if (tagsResult instanceof ServerError) {
        notificationQueue.push({
          level: 'error',
          title: 'Error loading categories',
          message: tagsResult.message,
        });
      } else {
        tags = tagsResult;
        if (!!data.searchOpts.tagUUIDs && data.searchOpts.tagUUIDs.length > 0) {
          const searchUUID = data.searchOpts.tagUUIDs[0];
          const searchedTag = tags.find(tag => tag.uuid === searchUUID);
          if (!searchedTag) return;
          tagUUIDsSearchValue = searchUUID;
        }
      }
    };

    loadData();
  });

  const constructLoginURL = (environment: Environment, path?: string): string => {
    let route = getAppURL(environment, App.Federation);
    route += `?${APP_QUERY_PARAM}=${App.RecipeBook}`;
    if (path && path !== '/') {
      route += `&${PATH_QUERY_PARAM}=${path}`;
    }

    return route;
  };

  let loginURL = $derived(constructLoginURL(PUBLIC_ENVIRONMENT, page.url.pathname.slice(1)));

  const onFavoriteRecipe = async (recipeUUID: string): Promise<void> => {
    let result;
    let errTitle;

    const recipeIndex = recipes.findIndex(rec => rec.uuid === recipeUUID);
    if (recipeIndex < 0) {
      notificationQueue.push({
        level: 'error',
        title: 'Unknown recipe',
        message: "Hmmm, I don't know that recipe. Try refreshing the page and trying again",
      });
      return;
    }
    const recipe = recipes[recipeIndex];

    let isFavorited: boolean;
    if (recipe.isFavorited) {
      result = await unFavoriteRecipe(recipeUUID);
      errTitle = 'Error unfavoriting recipe';
      isFavorited = false;
    } else {
      result = await favoriteRecipe(recipeUUID);
      errTitle = 'Error favoriting recipe';
      isFavorited = true;
    }

    if (result instanceof ServerError) {
      notificationQueue.push({
        level: 'error',
        title: errTitle,
        message: result.message,
      });
      return;
    }

    recipes[recipeIndex].isFavorited = isFavorited;
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

    recipes = recipes.filter(recipe => recipe.uuid !== recipeUUID);
  };

  const onUpdateFilters = async (opts: SearchOptions) => {
    loadingRecipes = true;
    currentPage = 1;
    currentFilters = opts;
    drawerOpen = false;

    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(makeSearchQueryString(opts));
    url.search = searchParams.toString();
    goto(url.toString(), { replaceState: true });

    const response = await searchRecipes(opts);
    loadingRecipes = false;
    if (response instanceof ServerError) {
      notificationQueue.push({
        level: 'error',
        title: 'Error deleting recipe',
        message: response.message,
      });
      return;
    }

    recipes = response.data;
    totalRecipes = response.total;
    lastLimit = response.limit;
  };

  const changePage = async (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) {
      return;
    }

    currentPageStr = `${page}`;
    const url = new URL(window.location.href);
    if (page === 1) {
      url.searchParams.delete('page');
    } else {
      url.searchParams.set('page', page.toString());
    }
    goto(url.toString(), { replaceState: true });

    loadingRecipes = true;
    const response = await searchRecipes({ ...currentFilters, page, limit: lastLimit });
    loadingRecipes = false;

    if (response instanceof ServerError) {
      notificationQueue.push({
        level: 'error',
        title: 'Error changing page',
        message: response.message,
      });
      return;
    }

    recipes = response.data;
    totalRecipes = response.total;
    lastLimit = response.limit;
    currentPage = page;
  };
</script>

<main class={styles.container}>
  <div class={styles.header}>
    <div class={styles.title}>
      <h1>Jean's Recipe Book</h1>
      <span>A Jeffrey Carr jawn</span>
    </div>

    <div class={styles.userContainer}>
      {#if userState.isLoading}
        <Spinner class={styles.userLoadingSpinner} />
      {:else if userState.user != null}
        <UserProfileButton user={userState.user} />
        <p>{greetUser(userState.user.fName)}</p>
      {:else}
        <Button size="sm" variant="secondary" shape="round" href={loginURL}>Log in</Button>
      {/if}
    </div>
  </div>

  <div class={clsx(styles.sidebar, { [styles.drawerOpen]: drawerOpen })}>
    <MainSidebar
      user={userState.user}
      {tags}
      onApplyFilters={onUpdateFilters}
      {loadingTags}
      nameValue={nameSearchValue}
      tagValue={tagUUIDsSearchValue}
      favoritesOnlyValue={favoritesOnlySearchValue}
      {loginURL}
    />
  </div>

  {#if drawerOpen}
    <div
      class={styles.drawerBackdrop}
      onclick={() => (drawerOpen = false)}
      onkeydown={e => e.key === 'Escape' && (drawerOpen = false)}
      role="button"
      tabindex="0"
      aria-label="Close drawer"
    ></div>
  {/if}

  <div class={styles.mobileDrawerToggleButton}>
    <Button onclick={() => (drawerOpen = !drawerOpen)} size="md" shape="round">
      <ReactiveIcon icon="funnel" /> Filters & Actions
    </Button>
  </div>

  <div class={styles.main}>
    {#if loadingRecipes}
      <Spinner class={styles.pageLoading} label="Loading recipes..." />
    {:else if !recipes || recipes.length === 0}
      <div class={styles.noRecipesContainer}>
        <p class={styles.sadLogo}>:(</p>
        <p>No recipes found</p>
      </div>
    {:else}
      <div class={styles.recipeContainer}>
        {#each recipes as recipe (recipe.uuid)}
          <div class={styles.recipeCardContainer}>
            <RecipeCard
              {recipe}
              onFavorite={() => onFavoriteRecipe(recipe.uuid)}
              onDelete={() => onDeleteRecipe(recipe.uuid)}
            />
          </div>
        {/each}
      </div>
      <div class={styles.paginationContainer}>
        {#if !loadingRecipes && totalPages > 1}
          <Button
            class={styles.paginationButton}
            variant="plain"
            size="sm"
            disabled={currentPage === 1}
            onclick={() => changePage(currentPage - 1)}
          >
            <ReactiveIcon icon="left-arrow" />
          </Button>

          <Input
            class={styles.paginationInput}
            type="number"
            min={1}
            max={totalPages}
            bind:value={currentPageStr}
            hideErrArea
          />
          <span class={styles.paginationTotal}>of {totalPages}</span>

          <Button
            class={styles.paginationButton}
            variant="plain"
            size="sm"
            disabled={currentPage === totalPages}
            onclick={() => changePage(currentPage + 1)}
          >
            <ReactiveIcon icon="right-arrow" />
          </Button>
        {/if}
      </div>
    {/if}
  </div>
</main>
