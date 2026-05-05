<script lang="ts">
  import { Button, Modal } from '..';
  import styles from './confirmModal.module.scss';

  let {
    open = $bindable(),
    title = 'Are you sure?',
    children,
    acceptText = 'Yes',
    declineText = 'No',
    onAccept,
    onDecline,
  }: {
    open: boolean;
    title?: string;
    children?: any;
    acceptText?: string;
    declineText?: string;
    onAccept?: () => Promise<void>;
    onDecline?: () => Promise<void>;
  } = $props();
  let loadingAccept = $state(false);
  let loadingDecline = $state(false);

  const accept = async () => {
    loadingAccept = true;
    await onAccept?.();
    loadingAccept = false;
  };

  const decline = () => {
    loadingDecline = true;
    onDecline?.();
    loadingDecline = false;
    open = false;
  };
</script>

<Modal class={styles.container} bind:open>
  <h1>{title}</h1>

  <div>
    {@render children?.()}
  </div>

  <div>
    <Button onclick={accept} loading={loadingAccept}>{acceptText}</Button>
    <Button onclick={decline} variant="secondary" loading={loadingDecline}>{declineText}</Button>
  </div>
</Modal>
