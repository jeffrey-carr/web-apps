<script lang="ts">
  import { Button, Input, Modal } from '@jeffrey-carr/frontend-common';
  import styles from './styles.module.scss';
  import { isValidPassword } from '$lib/utils';

  let {
    open = $bindable(false),
    onSubmit,
  }: {
    open?: boolean;
    onSubmit?: (password: string, newPassword: string) => Promise<boolean>;
  } = $props();
  let password = $state('');
  let newPassword = $state('');
  let newPasswordConfirm = $state('');
  let loadingUpdate = $state(false);

  const validateConfirmPassword = (input: string): string => {
    const validationErr = isValidPassword(input);
    if (validationErr !== '') {
      return validationErr;
    }

    if (input !== newPassword) {
      return 'Passwords do not match';
    }

    return '';
  };

  const doSubmit = async () => {
    const currentPasswordIsValid = isValidPassword(password) === '';
    const newPasswordIsValid = isValidPassword(newPassword) === '';
    const passwordsMatch = newPassword === newPasswordConfirm;
    if (!currentPasswordIsValid || !newPasswordIsValid || !passwordsMatch) return;

    loadingUpdate = true;
    const success = onSubmit?.(password, newPassword);
    loadingUpdate = false;

    if (success) {
      open = false;
    }
  };
</script>

<Modal class={styles.container} bind:open>
  <h1>Update Password</h1>
  <div class={styles.inputs}>
    <Input
      bind:value={password}
      validator={isValidPassword}
      label="Current password"
      type="password"
    />
    <Input
      bind:value={newPassword}
      validator={isValidPassword}
      label="New password"
      type="password"
    />
    <Input
      bind:value={newPasswordConfirm}
      validator={validateConfirmPassword}
      label="New password"
      type="password"
    />
  </div>
  <div class={styles.buttons}>
    <Button size="md" onclick={doSubmit} loading={loadingUpdate} disabled={onSubmit == null}
      >Update</Button
    >
    <Button size="md" onclick={() => (open = false)} variant="secondary">Cancel</Button>
  </div>
</Modal>
