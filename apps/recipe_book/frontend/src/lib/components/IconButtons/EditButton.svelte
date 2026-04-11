<script lang="ts">
  import styles from './styles.module.scss';
  import { ReactiveIcon } from '@jeffrey-carr/frontend-common';
  import IconButton from './IconButton.svelte';
  import clsx from 'clsx';

  let {
    edit,
  }: {
    edit?: () => Promise<void>;
  } = $props();
</script>

<IconButton action={edit}>
  <ReactiveIcon class={clsx(styles.icon, styles.editButton)} icon="pencil" />
</IconButton>
