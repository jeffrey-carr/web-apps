<script lang="ts">
  import { Spinner } from '@jeffrey-carr/frontend-common';
  import styles from './styles.module.scss';

  let {
    action,
    children,
  }: {
    action?: () => Promise<void>;
    children?: any;
  } = $props();
  let loadingAction = $state(false);

  const onclick = async (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (loadingAction) return;

    loadingAction = true;
    await action?.();
    loadingAction = false;
  };
</script>

<button class={styles.iconButton} {onclick} disabled={loadingAction}>
  {#if loadingAction}
    <Spinner class={styles.icon} theme="secondary" />
  {:else}
    {@render children?.()}
  {/if}
</button>
