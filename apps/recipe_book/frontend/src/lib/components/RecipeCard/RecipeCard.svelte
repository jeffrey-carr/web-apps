<script lang="ts">
  import { goto } from '$app/navigation';
  import { cookTimeToStr } from '$lib/mappers/recipe';
  import type { Recipe } from '$lib/types/recipe';
  import { getRandomElement, ReactiveIcon, Spinner } from '@jeffrey-carr/frontend-common';
  import styles from './styles.module.scss';
  import placeholderImg1 from '$lib/images/missing_img_1.png';
  import placeholderImg2 from '$lib/images/missing_img_2.png';
  import placeholderImg3 from '$lib/images/missing_img_3.png';
  import placeholderImg4 from '$lib/images/missing_img_4.png';
  import { userState } from '$lib/globals/user.svelte';
  import clsx from 'clsx';

  const imgs = [placeholderImg1, placeholderImg2, placeholderImg3, placeholderImg4];
  const img = getRandomElement(imgs);

  let {
    recipe,
    isFavorited = false,
    onFavorite,
    onDelete,
  }: {
    recipe: Recipe;
    isFavorited?: boolean;
    onFavorite?: () => Promise<boolean>;
    onDelete?: () => Promise<void>;
  } = $props();
  let loadingFavoriting = $state(false);
  let loadingDeleting = $state(false);

  let go = () => {
    goto(`/recipe/${recipe.slug}`);
  };

  const favorite = async (e: Event) => {
    e.stopPropagation();
    e.preventDefault();

    loadingFavoriting = true;
    await onFavorite?.();
    loadingFavoriting = false;
  };

  const deleteRecipe = async (e: Event) => {
    e.stopPropagation();
    e.preventDefault();

    loadingDeleting = true;
    onDelete?.();
    loadingDeleting = false;
  };
</script>

<!-- TODO - don't ignore this -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div class={styles.card} onclick={go} role="button" tabindex={0}>
  <div class={styles.header}>
    {#if userState.user}
      <button class={clsx(styles.managementButton, styles.favoriteButton)} onclick={favorite}>
        {#if loadingFavoriting}
          <Spinner class={styles.icon} />
        {:else}
          <ReactiveIcon class={styles.icon} icon={isFavorited ? 'heart-fill' : 'heart'} />
        {/if}
      </button>
      {#if userState.user.isAdmin || recipe.authorUUID === userState.user.uuid}
        <button class={clsx(styles.managementButton, styles.trashButton)} onclick={deleteRecipe}>
          {#if loadingDeleting}
            <Spinner class={styles.icon} />
          {:else}
            <ReactiveIcon class={styles.icon} icon="trash" />
          {/if}
        </button>
      {/if}
    {/if}
    <img class={styles.image} src={img} alt="Missing recipe" />
  </div>

  <div class={styles.content}>
    <h3 class={styles.title}>{recipe.name}</h3>
    <div class={styles.description}>
      {@html recipe.description}
    </div>
  </div>

  <div class={styles.footer}>
    <span class={styles.cookTime}>
      <ReactiveIcon class={styles.cookTimeImg} icon="stopwatch" />
      {cookTimeToStr(recipe.cookTimeMs)}
    </span>
  </div>
</div>
