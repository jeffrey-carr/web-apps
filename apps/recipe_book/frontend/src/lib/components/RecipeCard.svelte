<script lang="ts">
  import type { Recipe } from '$lib/types/recipe';
  import { Button, getRandomElement, ReactiveIcon, Spinner } from '@jeffrey-carr/frontend-common';
  import placeholderImg1 from '$lib/images/missing_img_1.png';
  import placeholderImg2 from '$lib/images/missing_img_2.png';
  import placeholderImg3 from '$lib/images/missing_img_3.png';
  import placeholderImg4 from '$lib/images/missing_img_4.png';

  import clsx from 'clsx';
  import Tag from './Tag.svelte';
  import { cookTimeToStr } from '$lib/mappers/recipe';
  import { userState } from '$lib/globals/user.svelte';
  import FavoriteButton from './IconButtons/FavoriteButton.svelte';

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
  let recipeLink = $derived(`/recipe/${recipe.slug || recipe.uuid}`);
  let loadingDeleting = $state(false);

  const handleImageError = (e: Event) => {
    const target = e.currentTarget as HTMLImageElement;
    target.onerror = null;

    target.src = getRandomElement(imgs);
    target.alt = `Default fallback image for ${recipe.name}`;
  };

  const handleDeleteRecipe = async (e: Event) => {
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

<div class="container">
  <div class="image">
    <img
      class={clsx({ disabled: recipe.status === 'draft' })}
      src={recipe.imageURL}
      alt={`Image of ${recipe.name}`}
      onerror={handleImageError}
    />
  </div>

  <div class="content">
    <div class="actions">
      {#if userState.user}
        <FavoriteButton isFavorited={recipe.isFavorited} {onFavorite} />

        {#if userState.user.isAdmin || userState.user.uuid === recipe.authorUUID}
          <button class={'trash-button'} onclick={handleDeleteRecipe} disabled={loadingDeleting}>
            {#if loadingDeleting}
              <Spinner class="delete-icon" />
            {:else}
              <ReactiveIcon class="delete-icon" icon="trash" />
            {/if}
          </button>
        {/if}
      {/if}
    </div>

    <div class="title">
      <h1>{recipe.name}</h1>
    </div>

    <div class="author-cook-time">
      <span><em>By {recipe.authorFName} {recipe.authorLName}</em></span>

      {#if recipe.cookTimeMs}
        <span class="decorated-time">
          <ReactiveIcon class="stopwatch-icon" icon="stopwatch" />
          {cookTimeToStr(recipe.cookTimeMs)}
        </span>
      {/if}
    </div>

    <div class="description">
      {@html recipe.description}
    </div>

    <div class="tags">
      {#each recipe.tags as tag (tag.uuid)}
        <Tag data={tag} />
      {/each}
    </div>

    <div class="open-button">
      <Button href={recipeLink}>Open recipe</Button>
    </div>
  </div>
</div>

<style lang="scss">
  .container {
    display: grid;
    gap: 0.5rem;

    grid-template-columns: 200px 1fr;

    border: 1px solid var(--app-theme-border-color);
    border-radius: 5px;
  }

  .image {
    overflow: hidden;
    border-right: 1px solid var(--app-theme-border-color);

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      object-position: center;

      &.disabled {
        filter: grayscale(50%);
        opacity: 0.5;
      }
    }
  }

  .content {
    display: grid;

    grid-template-columns: 1fr auto auto;
    grid-template-rows: auto auto 1fr auto;
    grid-template-areas:
      'title title actions'
      'author cook-time .'
      'desc desc desc'
      'tags tags open-button';

    padding: 0.5rem;
  }

  .title {
    grid-area: title;
    margin: 0.45rem 0 0.35rem;

    h1 {
      font-size: 2rem;
      margin-bottom: 0px;
      padding-bottom: 0px;
      line-height: 2rem;
    }
  }

  .author-cook-time {
    grid-area: author;
    align-self: start;

    display: flex;
    align-items: center;
    gap: 0.85rem;
    margin-bottom: 1rem;

    .decorated-time {
      display: flex;
      align-items: center;
      gap: 5px;

      :global(.stopwatch-icon) {
        --size: 1.2rem;
        height: var(--size);
        width: var(--size);
      }
    }
  }

  .actions {
    grid-area: actions;

    display: flex;
    justify-content: end;
    align-items: center;
    gap: 0.5rem;

    .trash-button {
      background: none;
      border: none;

      &:hover {
        cursor: pointer;
      }

      .delete-icon {
        height: 1.5rem;
        width: 1.5rem;
      }
    }
  }

  .description {
    grid-area: desc;

    padding: 1rem;
  }
  .tags {
    grid-area: tags;
    align-self: end;

    display: flex;
    gap: 0.25rem;

    margin-bottom: 0.25rem;
  }
  .cook-time {
    grid-area: cook-time;
    align-self: end;
  }
  .open-button {
    grid-area: open-button;
    align-self: end;
  }

  @media (max-width: 945px) {
    .container {
      grid-template-columns: 1fr;
    }

    .image {
      border-right: none;
      border-bottom: 1px solid var(--app-theme-border-color);

      img {
        height: 250px;
        object-fit: contain;
      }
    }

    .content {
      grid-template-columns: 1fr;
      grid-template-rows: auto auto auto auto auto auto;
      grid-template-areas:
        'actions'
        'title'
        'author'
        'desc'
        'tags'
        'open-button';
      gap: 0.5rem;
    }

    .title {
      text-align: center;
      margin-bottom: 0;
    }

    .author-cook-time {
      justify-content: center;
      margin-bottom: 0.5rem;
    }

    .description {
      text-align: center;
    }

    .actions {
      justify-content: flex-end;
    }

    .tags {
      flex-wrap: wrap;
      justify-content: center;
    }

    .open-button {
      margin-top: 1rem;
      width: 100%;

      :global(a),
      :global(button) {
        width: 100%;
        justify-content: center;
      }
    }
  }
</style>
