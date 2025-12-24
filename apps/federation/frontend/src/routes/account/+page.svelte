<script lang="ts">
  import { Button, ReactiveIcon, ServerError, type Character } from '@jeffrey-carr/frontend-common';
  import styles from './page.module.scss';
  import EditableCharacterIcon from '$lib/components/EditableCharacterIcon/EditableCharacterIcon.svelte';
  import ChangeCharacterModal from '$lib/Modals/ChangeCharacterModal/ChangeCharacterModal.svelte';
  import { updatePassword, updateUser, type UpdateUserRequest } from '$lib/requests/account';
  import { ChangePasswordModal, UpdateUserInfoModal } from '$lib/Modals';
  import { logout } from '$lib/requests';
  import { goto } from '$app/navigation';
  import { userState } from '$lib/globals/user.svelte';
  import { notificationQueue } from '$lib/globals/notifications.svelte';

  let user = $derived(userState.user!);
  let loadingLoggingOut = $state(false);
  let showEditCharacterModal = $state(false);
  let showChangePasswordModal = $state(false);
  let showUpdateUserModal = $state(false);

  const editCharacter = () => {
    setModal('character');
  };

  const changePassword = () => {
    setModal('password');
  };

  const editName = () => {
    setModal('name');
  };

  const setModal = (modal: 'character' | 'password' | 'name') => {
    switch (modal) {
      case 'character':
        showEditCharacterModal = true;
        showChangePasswordModal = false;
        showUpdateUserModal = false;
        break;
      case 'password':
        showEditCharacterModal = false;
        showChangePasswordModal = true;
        showUpdateUserModal = false;
        break;
      case 'name':
        showEditCharacterModal = false;
        showChangePasswordModal = false;
        showUpdateUserModal = true;
        break;
    }
  };

  const onLogout = async () => {
    loadingLoggingOut = true;
    try {
      await logout();
    } catch (e) {
      const serverResponse = e as ServerError;
      notificationQueue.push({
        title: 'Error logging out',
        message: serverResponse.message,
        level: 'error',
      });
      return;
    }

    goto('/?goto=account');
  };

  const onUpdatePassword = async (password: string, newPassword: string): Promise<boolean> => {
    let response = await updatePassword(user.uuid, password, newPassword);
    if (response == null) return true;

    console.error(response.message);
    return false;
  };

  const onUpdateCharacter = async (newCharacter: Character): Promise<boolean> => {
    return doUpdateUser({ character: newCharacter });
  };

  const onUpdateUser = async (fName: string, lName: string): Promise<boolean> => {
    return doUpdateUser({ fName, lName });
  };

  const doUpdateUser = async (request: UpdateUserRequest): Promise<boolean> => {
    let response = await updateUser(user.uuid, request);
    if (response instanceof ServerError) {
      notificationQueue.push({
        title: 'Error updating user',
        message: response.message,
        level: 'error',
      });
      return false;
    }

    notificationQueue.push({
      title: 'User updated',
      message: 'Updates saved',
      level: 'success',
    });
    userState.user = response;
    return true;
  };
</script>

<ChangeCharacterModal
  bind:open={showEditCharacterModal}
  onChangeCharacter={onUpdateCharacter}
  initialCharacter={user.character}
/>
<ChangePasswordModal bind:open={showChangePasswordModal} onSubmit={onUpdatePassword} />
<UpdateUserInfoModal
  bind:open={showUpdateUserModal}
  fName={user.fName}
  lName={user.lName}
  onSubmit={onUpdateUser}
/>

<main class={styles.container}>
  <h1>Hi, {user.fName}</h1>
  <div class={styles.character}>
    <EditableCharacterIcon character={user.character} onclick={editCharacter} />
  </div>
  <div class={styles.actionButtons}>
    <Button
      class={styles.actionButton}
      size="md"
      onclick={onLogout}
      variant="secondary"
      loading={loadingLoggingOut}
    >
      Logout</Button
    >

    <Button
      class={styles.actionButton}
      size="md"
      onclick={() => goto('/choose-app')}
      variant="secondary"
    >
      Go to an app
    </Button>
  </div>

  <div class={styles.sections}>
    <div class={styles.section}>
      <h2 class={styles.sectionTitle}>Account Info</h2>
      <div class={styles.accountInfoBody}>
        <p class={styles.email}><b>Email:</b> {user.email}</p>
        <Button variant="secondary" onclick={changePassword}>Change password</Button>
      </div>
    </div>
    <div class={styles.section}>
      <div class={styles.titleContainer}>
        <h2 class={styles.sectionTitle}>Your Info</h2>
        <div class={styles.buttonContainer}>
          <Button variant="secondary" onclick={editName}>
            <ReactiveIcon icon="pencil" />
          </Button>
        </div>
      </div>
      <table class={styles.userInfoTable}>
        <tbody>
          <tr>
            <td><b>First name</b></td>
            <td>{user.fName}</td>
          </tr>
          <tr>
            <td><b>Last name</b></td>
            <td>{user.lName}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</main>
