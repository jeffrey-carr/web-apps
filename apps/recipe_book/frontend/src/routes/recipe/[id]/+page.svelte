<script lang="ts">
  import { getContext, onDestroy, onMount } from 'svelte';
  import {
    Button,
    ConfirmModal,
    ExpandButton,
    ReactiveIcon,
    ServerError,
  } from '@jeffrey-carr/frontend-common';
  import { goto } from '$app/navigation';
  import styles from './page.module.scss';
  import { cookTimeToStr } from '$lib/mappers/recipe';
  import RecipeSection from '$lib/components/recipe/RecipeSection/RecipeSection.svelte';
  import IngredientsModal from '$lib/components/recipe/RecipeSection/IngredientsModal.svelte';
  import type { Recipe } from '$lib/types/recipe';
  import KeepAwakeVideo from '$lib/assets/keep_awake.mp4?url';
  import { userState } from '$lib/globals/user.svelte';
  import { DeleteButton, DraftBadge, EditButton, FavoriteButton } from '$lib/components';
  import { notificationQueue } from '$lib/globals/notifications.svelte';
  import { deleteRecipe, favoriteRecipe, unFavoriteRecipe } from '$lib/requests/recipe';
  import Tag from '$lib/components/Tag/Tag.svelte';

  let recipeStore = getContext<{ current: Recipe }>('recipe');
  let recipe = $derived(recipeStore.current);
  let recipeImgFailed = $state(false);
  let fullAuthorName = $derived(`${recipe.authorFName} ${recipe.authorLName}`.trim());
  let allIngredients = $derived(recipe.sections.flatMap(section => section.ingredients));
  let showDeleteConfirmation = $state(false);

  let showAllIngredients = $state(false);

  let videoElement = $state<HTMLVideoElement>();
  let isKeepingAwake = $state(false);
  let loadingKeepAwake = $state(false);
  let wakeLock = $state<WakeLockSentinel | null>(null);
  const handleVisibilityChange = async () => {
    // If they come back to the tab and it SHOULD be awake, request it again
    if (document.visibilityState === 'visible' && isKeepingAwake) {
      await requestWakeLock();
    }
  };

  onMount(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange);
  });

  onDestroy(() => {
    if (document) {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    }
    if (isKeepingAwake) {
      releaseWakeLock();
    }
  });

  // Set failure to false if recipe image changes. Maybe they fixed it!
  $effect(() => {
    recipe.imageURL;
    recipeImgFailed = false;
  });

  const goHome = async () => {
    await goto('/');
  };

  const goToEditRecipe = async () => {
    if (!recipe) return;
    await goto(`/recipe/${recipe.slug}/edit`);
  };

  const onDelete = async () => {
    showDeleteConfirmation = true;
  };

  const onDeleteRecipe = async () => {
    if (!recipe) return;

    const result = await deleteRecipe(recipe.uuid);
    if (result instanceof ServerError) {
      notificationQueue.push({
        level: 'error',
        title: 'Error deleting recipe',
        message: result.message,
      });
      return;
    }

    notificationQueue.push({
      level: 'success',
      title: 'Recipe deleted',
      message: `${recipe.name} was deleted. Poof!`,
    });
    await goHome();
  };

  const onFavorite = async () => {
    let isFavorited: boolean;
    let result;
    let errTitle;
    if (recipe.isFavorited) {
      result = await unFavoriteRecipe(recipe.uuid);
      errTitle = 'Error unfavoriting recipe';
      isFavorited = false;
    } else {
      result = await favoriteRecipe(recipe.uuid);
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

    recipeStore.current.isFavorited = isFavorited;
  };

  const requestWakeLock = async () => {
    // Try the native API first
    try {
      if ('wakeLock' in navigator) {
        wakeLock = await navigator.wakeLock.request('screen');
      }
    } catch (err) {
      console.warn(`Native Wake Lock failed: ${(err as Error).message}`);
    }

    // Fall back to video if the API isn't available
    try {
      if (videoElement) {
        await videoElement.play();
      }
      isKeepingAwake = true;
    } catch (err) {
      console.error(`Video fallback failed: ${(err as Error).message}`);
    }
  };

  const releaseWakeLock = async () => {
    try {
      if (wakeLock) {
        await wakeLock.release();
        wakeLock = null;
      }

      if (videoElement) {
        videoElement.pause();
      }

      isKeepingAwake = false;
    } catch (err) {}
  };

  const toggleKeepAwake = async () => {
    loadingKeepAwake = true;
    if (!isKeepingAwake) {
      await requestWakeLock();
    } else {
      await releaseWakeLock();
    }
    loadingKeepAwake = false;
  };
</script>

<svelte:head>
  <title>{recipe.name} - Jean's Recipe Book</title>
</svelte:head>

<IngredientsModal ingredients={allIngredients} bind:open={showAllIngredients} />
<ConfirmModal bind:open={showDeleteConfirmation} onAccept={onDeleteRecipe}>
  <p>Are you sure you want to delete <em>{recipe.name}</em>? This is <b>irreversible</b>!</p>
</ConfirmModal>
<!-- svelte-ignore a11y_media_has_caption -->
<!-- this is just a video to keep the screen awake,
   -- we don't need this to be caption'd -->
<video
  bind:this={videoElement}
  src={KeepAwakeVideo}
  class={styles.wakeLockVideo}
  loop
  playsinline
  preload="auto"
></video>

<main class={styles.container}>
  <ExpandButton onclick={goHome}>Back to home</ExpandButton>
  <div class={styles.header}>
    <h1>{recipe.name}</h1>
    {#if recipe.status === 'draft'}
      <DraftBadge />
    {/if}
    {#if recipe.imageURL && !recipeImgFailed}
      <img
        class={styles.recipeImage}
        src={recipe.imageURL}
        alt={`Image of ${recipe.name}`}
        onerror={() => (recipeImgFailed = true)}
      />
    {/if}
    {#if userState.user}
      <div class={styles.userActions}>
        <FavoriteButton isFavorited={recipe.isFavorited} {onFavorite} />
        {#if userState.user.isAdmin || userState.user.uuid === recipe.authorUUID}
          <EditButton edit={goToEditRecipe} />
          <DeleteButton {onDelete} />
        {/if}
      </div>
    {/if}
    <div class={styles.authorAndCookTime}>
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
      {#if recipe.cookTimeMs}
        <div class={styles.cookTime}>
          <ReactiveIcon icon="stopwatch" />
          <span class={styles.actualCookTime}>{cookTimeToStr(recipe.cookTimeMs)}</span>
        </div>
      {/if}
    </div>
    <div class={styles.tagsContainer}>
      {#each recipe.tags ?? [] as tag (tag.uuid)}
        <Tag data={tag} />
      {/each}
    </div>
    <div class={styles.description}>
      {@html recipe.description}
    </div>

    <div class={styles.ingredientsAndWakeLock}>
      <Button size="md" variant="secondary" onclick={() => (showAllIngredients = true)}
        >View all ingredients</Button
      >
      <Button size="md" variant="secondary" loading={loadingKeepAwake} onclick={toggleKeepAwake}>
        {#if isKeepingAwake}
          Stop keeping screen awake
        {:else}
          Keep screen awake
        {/if}
      </Button>
    </div>
  </div>
  <hr class={styles.divider} />
  <div class={styles.sections}>
    {#each recipe.sections as section}
      <RecipeSection {section} showTitle={recipe.sections.length > 1} />
    {/each}
  </div>
</main>
