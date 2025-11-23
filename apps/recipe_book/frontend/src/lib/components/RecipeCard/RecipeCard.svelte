<script lang="ts">
  import { goto } from '$app/navigation';
  import { cookTimeToStr } from '$lib/mappers/recipe';
  import type { Recipe } from '$lib/types/recipe';
  import { getRandomElement, ReactiveIcon } from '@jeffrey-carr/frontend-common';
  import styles from './styles.module.scss';
  import placeholderImg1 from '$lib/images/missing_img_1.png';
  import placeholderImg2 from '$lib/images/missing_img_2.png';
  import placeholderImg3 from '$lib/images/missing_img_3.png';
  import placeholderImg4 from '$lib/images/missing_img_4.png';

  const imgs = [placeholderImg1, placeholderImg2, placeholderImg3, placeholderImg4];
  const img = getRandomElement(imgs);

  let { recipe, onFavorite }: { recipe: Recipe; onFavorite?: (uuid: string) => void } = $props();

  let go = () => {
    goto(`/recipe/${recipe.slug}`);
  };

  const favorite = (e: Event) => {
    e.stopPropagation();
    e.preventDefault();

    onFavorite?.(recipe.uuid);
  };
</script>

<!-- TODO - don't ignore this -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div class={styles.card} onclick={go} role="button" tabindex={0}>
  <div class={styles.header}>
    <button class={styles.favoriteButton} onclick={favorite}>
      <ReactiveIcon class={styles.favoriteIcon} icon="heart" />
    </button>
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
