<script lang="ts">
  import { Button, Input, Modal } from '@jeffrey-carr/frontend-common';

  import styles from './styles.module.scss';
  import { isValidName } from '$lib/utils';

  let {
    open = $bindable(false),
    fName = '',
    lName = '',
    onSubmit,
  }: {
    open?: boolean;
    fName?: string;
    lName?: string;
    onSubmit?: (fName: string, lName: string) => Promise<boolean>;
  } = $props();
  let fNameValue = $state(fName);
  let lNameValue = $state(lName);
  let loadingUpdate = $state(false);

  const doSubmit = async () => {
    const fNameErr = isValidName(fNameValue);
    const lNamErr = isValidName(lNameValue);
    if (fNameErr !== '' || lNamErr != '') {
      return;
    }

    loadingUpdate = true;
    const success = await onSubmit?.(fNameValue, lNameValue);
    loadingUpdate = false;
    if (success) {
      open = false;
    }
  };
</script>

<Modal class={styles.container} bind:open>
  <h1 class={styles.title}>Update Your Info</h1>
  <div class={styles.inputs}>
    <Input bind:value={fNameValue} validator={isValidName} label="First Name" />
    <Input bind:value={lNameValue} validator={isValidName} label="Last Name" />
  </div>
  <div class={styles.buttons}>
    <Button size="md" onclick={doSubmit} loading={loadingUpdate}>Update</Button>
    <Button size="md" onclick={() => (open = false)} variant="secondary">Cancel</Button>
  </div>
</Modal>
