<script lang="ts">
  import { Button } from '../.';

  import styles from './modal.module.scss';
  import clsx from 'clsx';

  let {
    open = $bindable(),
    class: className,
    children,
  }: {
    open: boolean;
    class?: string;
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
  <div class={clsx(styles.contentContainer, className)}>
    <Button class={styles.closeButton} onclick={close} variant="secondary">&#x2715;</Button>
    {@render children?.()}
  </div>
</div>
