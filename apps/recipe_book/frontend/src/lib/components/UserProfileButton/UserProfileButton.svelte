<script lang="ts">
  import {
    Button,
    CharacterIcon,
    CustomDropdown,
    type User,
    logout as doLogout,
  } from '@jeffrey-carr/frontend-common';
  import styles from './styles.module.scss';
  import { PUBLIC_ENVIRONMENT } from '$env/static/public';
  import { notificationQueue } from '$lib/globals/notifications.svelte';
  import { userState } from '$lib/globals/user.svelte';

  let { user }: { user?: User } = $props();

  let show = $state(false);
  let loadingLogout = $state(false);

  const onLogout = async () => {
    loadingLogout = true;
    const err = await doLogout(PUBLIC_ENVIRONMENT);
    if (err != null) {
      notificationQueue.push({
        level: 'error',
        title: 'Error logging out',
        message: err.message,
      });
    } else {
      notificationQueue.push({
        level: 'success',
        message: 'Successfully logged out',
      });

      userState.user = null;
    }

    loadingLogout = false;
  };

  const toggleShow = () => {
    show = !show;
  };
</script>

{#snippet trigger()}
  <button class={styles.characterContainer} onclick={toggleShow}>
    {#if user}
      <CharacterIcon character={user.character} />
    {:else}
      <span class={styles.loginText}>Log in</span>
    {/if}
  </button>
{/snippet}
{#snippet content()}
  <Button
    class={styles.logoutButton}
    onclick={onLogout}
    size="sm"
    variant="plain"
    loading={loadingLogout}>Log out</Button
  >
{/snippet}

<CustomDropdown {show} {trigger} {content} />
