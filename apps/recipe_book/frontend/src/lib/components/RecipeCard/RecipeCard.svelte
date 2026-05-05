<script lang="ts">
  import { goto } from '$app/navigation';
  import { cookTimeToStr } from '$lib/mappers/recipe';
  import type { Recipe } from '$lib/types/recipe';
  import { FavoriteButton } from '$lib/components';
  import { getRandomElement, ReactiveIcon, Spinner } from '@jeffrey-carr/frontend-common';
  import styles from './styles.module.scss';
  import placeholderImg1 from '$lib/images/missing_img_1.png';
  import placeholderImg2 from '$lib/images/missing_img_2.png';
  import placeholderImg3 from '$lib/images/missing_img_3.png';
  import placeholderImg4 from '$lib/images/missing_img_4.png';
  import { userState } from '$lib/globals/user.svelte';
  import clsx from 'clsx';
  import Tag from '../Tag/Tag.svelte';

  const imgs = [placeholderImg1, placeholderImg2, placeholderImg3, placeholderImg4];

  let {
    recipe,
    onFavorite,
    onDelete,
  }: {
    recipe: Recipe;
    onFavorite?: () => Promise<void>;
    onDelete?: () => Promise<void>;
  } = $props();
  let loadingDeleting = $state(false);
  let imgFailed = $state(false);
  let img = $derived(
    imgFailed || recipe.imageURL === '' ? getRandomElement(imgs) : recipe.imageURL
  );

  $effect(() => {
    recipe.imageURL;
    imgFailed = false;
  });

  let go = () => {
    goto(`/recipe/${recipe.slug}`);
  };

  const deleteRecipe = async (e: Event) => {
    e.stopPropagation();
    e.preventDefault();

    if (loadingDeleting) {
      return;
    }

    loadingDeleting = true;
    await onDelete?.();
    loadingDeleting = false;
  };
</script>

<!-- TODO - don't ignore this -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div class={styles.card} onclick={go} role="button" tabindex={0}>
  <div class={styles.header}>
    {#if userState.user}
      <div class={clsx(styles.managementButton, styles.favoriteButton)}>
        <FavoriteButton isFavorited={recipe.isFavorited} {onFavorite} />
      </div>
      {#if userState.user.isAdmin || recipe.authorUUID === userState.user.uuid}
        <button
          class={clsx(styles.managementButton, styles.trashButton)}
          onclick={deleteRecipe}
          disabled={loadingDeleting}
        >
          {#if loadingDeleting}
            <Spinner class={styles.icon} />
          {:else}
            <ReactiveIcon class={styles.icon} icon="trash" />
          {/if}
        </button>
      {/if}
    {/if}
    <img
      class={styles.image}
      src={img}
      alt={`Image of ${recipe.name}`}
      onerror={() => (imgFailed = true)}
    />
  </div>

  <div class={styles.content}>
    <h3 class={styles.title}>{recipe.name}</h3>
    <div class={styles.description}>
      {@html recipe.description}
    </div>
  </div>

  <div class={styles.footer}>
    {#if recipe.tags}
      <div class={styles.tags}>
        {#each recipe.tags as tag (tag.uuid)}
          <Tag data={tag} />
        {/each}
      </div>
    {/if}
    {#if recipe.cookTimeMs}
      <span class={styles.cookTime}>
        <ReactiveIcon class={styles.cookTimeImg} icon="stopwatch" />
        {cookTimeToStr(recipe.cookTimeMs)}
      </span>
    {/if}
  </div>
</div>
