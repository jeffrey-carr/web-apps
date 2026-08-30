<script lang="ts">
  import { page } from '$app/state';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import {
    Button,
    ConfirmModal,
    debounce,
    Input,
    ReactiveIcon,
    ServerError,
    Spinner,
  } from '@jeffrey-carr/frontend-common';
  import { PUBLIC_ENVIRONMENT } from '$env/static/public';
  import {
    deleteRecipe,
    favoriteRecipe,
    getAllTags,
    searchRecipes,
    unFavoriteRecipe,
  } from '$lib/requests/recipe';
  import { MainFilters, MainHeader, RecipeCard } from '$lib/components';
  import { notificationQueue } from '$lib/globals/notifications.svelte';
  import type { Recipe, SearchOptions, Tag } from '$lib/types/recipe';
  import { makeSearchQueryString } from '$lib/mappers/recipe';
  import { constructLoginURL } from '$lib/mappers/requests';

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
  }, 1500);

  $effect(() => {
    updatePageNum(currentPageStr);
  });

  let currentFilters = $state<SearchOptions>({});
  let tags = $state<Tag[]>([]);
  let loadingRecipes = $state(false);
  let loadingTags = $state(false);
  let drawerOpen = $state(false);
  let showDeleteModal = $state(false);
  let recipeToDelete = $state<Recipe>();

  let nameSearchValue = $derived(data.searchOpts.recipeName ?? '');
  let selectedTags = $state<Tag[]>([]);
  let inverseTags = $state<Tag[]>([]);
  let favoritesOnlySearchValue = $derived(!!data.searchOpts.favoritesOnly);
  let includeDraftsSearchValue = $derived(!!data.searchOpts.includeDrafts);

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
        if (!!data.searchOpts.selectedTagUUIDs && data.searchOpts.selectedTagUUIDs.length > 0) {
          selectedTags = tags.filter(t => data.searchOpts.selectedTagUUIDs?.includes(t.uuid));
        }
        if (!!data.searchOpts.inverseTagUUIDs && data.searchOpts.inverseTagUUIDs.length > 0) {
          inverseTags = tags.filter(t => data.searchOpts.inverseTagUUIDs?.includes(t.uuid));
        }
      }
    };

    loadData();
  });

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

  const handleDeleteRecipe = async (recipeUUID: string) => {
    const recipeIdx = recipes.findIndex(recipe => recipe.uuid === recipeUUID);
    if (recipeIdx < 0) {
      notificationQueue.push({
        level: 'error',
        title: 'Error deleting recipe',
        message: 'Recipe not found',
      });
      return;
    }

    recipeToDelete = recipes[recipeIdx];
    showDeleteModal = true;
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

<svelte:head>
  <title>Jean's Recipe Book</title>
</svelte:head>

<ConfirmModal
  bind:open={showDeleteModal}
  onAccept={() => onDeleteRecipe(recipeToDelete?.uuid ?? '')}
  onDecline={async () => (recipeToDelete = undefined)}
>
  <p>
    Are you sure you want to delete <em>{recipeToDelete?.name}</em>? This is <b>irreversible</b>!
  </p>
</ConfirmModal>

<main class="container">
  <MainHeader />
  <MainFilters {loadingTags} {tags} {onUpdateFilters} startingOpts={data.searchOpts} />

  {#if drawerOpen}
    <div
      class="drawer-backdrop"
      onclick={() => (drawerOpen = false)}
      onkeydown={e => e.key === 'Escape' && (drawerOpen = false)}
      role="button"
      tabindex="0"
      aria-label="Close drawer"
    ></div>
  {/if}

  <div class="mobile-drawer-toggle-button">
    <Button onclick={() => (drawerOpen = !drawerOpen)} size="md" shape="round">
      <ReactiveIcon icon="funnel" /> Filters & Actions
    </Button>
  </div>

  <div class="main">
    {#if loadingRecipes}
      <Spinner class="page-loading" size="2rem" label="Loading recipes..." />
    {:else if !recipes || recipes.length === 0}
      <div class="no-recipes-container">
        <p class="sad-logo">:(</p>
        <p>No recipes found</p>
      </div>
    {:else}
      <ul class="recipe-list">
        {#each recipes as recipe (recipe.uuid)}
          <li>
            <RecipeCard
              {recipe}
              onFavorite={() => onFavoriteRecipe(recipe.uuid)}
              onDelete={() => handleDeleteRecipe(recipe.uuid)}
            />
          </li>
        {/each}
      </ul>
      <div class="pagination-container">
        {#if !loadingRecipes && totalPages > 1}
          <Button
            class="pagination-button"
            variant="plain"
            size="sm"
            disabled={currentPage === 1}
            onclick={() => changePage(currentPage - 1)}
          >
            <ReactiveIcon icon="left-arrow" />
          </Button>

          <Input
            class="pagination-input"
            type="number"
            min={1}
            max={totalPages}
            bind:value={currentPageStr}
            hideErrArea
          />
          <span class="pagination-total">of {totalPages}</span>

          <Button
            class="pagination-button"
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

<style lang="scss">
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    height: 100%;
    width: 100%;
  }

  .drawer-backdrop {
    display: none;
  }

  .mobile-drawer-toggle-button {
    display: none;
  }

  .main {
    grid-area: main;
    width: 100%;
  }

  .container :global(.page-loading) {
    justify-self: center;

    --size: 4rem;
    height: var(--size);
    width: var(--size);
  }

  .no-recipes-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;

    height: 100%;
    width: 100%;

    color: var(--app-theme-gray-dark);

    .sad-logo {
      font-size: 32px;
    }
  }

  .recipe-list {
    padding: 0 1rem; /* prevent horizontal overflow on small devices, remove default padding */
    margin: 0;

    li {
      display: flex;
      justify-content: center;
      list-style-type: none;
      margin-bottom: 1rem;
    }
  }

  .pagination-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    margin: 1rem 0;
    flex-wrap: wrap;

    :global(.pagination-input) {
      width: 3.5rem;
      text-align: center;
      font-size: 0.9rem;

      // Remove number arrows
      :global(input::-webkit-outer-spin-button),
      :global(input::-webkit-inner-spin-button) {
        -webkit-appearance: none;
        margin: 0;
      }

      :global(input[type='number']) {
        -moz-appearance: textfield;
        appearance: textfield;
        text-align: center;
        padding: 0.25rem;
      }
    }

    :global(.pagination-button) {
      padding: 0 0.5rem;
    }

    .pagination-total {
      color: var(--app-theme-gray-dark);
      font-size: 0.9rem;
    }
  }
</style>
