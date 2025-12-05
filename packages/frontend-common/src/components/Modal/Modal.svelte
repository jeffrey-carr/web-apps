<script lang="ts">
  import { Button } from '../.';

  import styles from './modal.module.scss';
  import clsx from 'clsx';

  let {
    open = $bindable(),
    children,
  }: {
    open: boolean;
    children?: () => any;
  } = $props();

  $effect(() => {
    addEventListener('keydown', keyListener);

    return () => {
      removeEventListener('keydown', keyListener);
    };
  });

  const keyListener = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      close();
    }
  };

  const close = () => {
    open = false;
  };
</script>

<div class={clsx(styles.container, { [styles.open]: open })}>
  <button class={styles.background} onclick={close} aria-label="Close modal"></button>
  <div class={styles.contentContainer}>
    <Button class={styles.closeButton} onclick={close}>&#x2715;</Button>
    {@render children?.()}
  </div>
</div>
