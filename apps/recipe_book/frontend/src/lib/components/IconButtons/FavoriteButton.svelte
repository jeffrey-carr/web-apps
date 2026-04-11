<script lang="ts">
  import styles from './styles.module.scss';
  import { ReactiveIcon } from '@jeffrey-carr/frontend-common';
  import IconButton from './IconButton.svelte';
  import clsx from 'clsx';

  let {
    isFavorited = false,
    onFavorite,
  }: {
    isFavorited?: boolean;
    onFavorite?: () => Promise<void>;
  } = $props();
</script>

<IconButton action={onFavorite}>
  <ReactiveIcon
    class={clsx(styles.icon, styles.favoriteButton)}
    icon={isFavorited ? 'heart-fill' : 'heart'}
  />
</IconButton>
