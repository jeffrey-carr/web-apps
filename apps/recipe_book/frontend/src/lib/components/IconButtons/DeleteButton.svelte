<script lang="ts">
  import styles from './styles.module.scss';
  import { ReactiveIcon } from '@jeffrey-carr/frontend-common';
  import IconButton from './IconButton.svelte';
  import clsx from 'clsx';

  let {
    onDelete,
  }: {
    onDelete?: () => Promise<void>;
  } = $props();
</script>

<IconButton action={onDelete}>
  <ReactiveIcon class={clsx(styles.icon, styles.deleteButton)} icon="trash" />
</IconButton>
