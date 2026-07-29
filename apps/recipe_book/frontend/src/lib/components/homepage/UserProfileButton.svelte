<script lang="ts">
  import {
    Button,
    CharacterIcon,
    CustomDropdown,
    type User,
    logout as doLogout,
  } from '@jeffrey-carr/frontend-common';
  import { PUBLIC_ENVIRONMENT } from '$env/static/public';
  import { notificationQueue } from '$lib/globals/notifications.svelte';
  import { userState } from '$lib/globals/user.svelte';

  let { user }: { user: User } = $props();

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
  <button class="character-container" onclick={toggleShow}>
    {#if user}
      <CharacterIcon character={user.character} />
    {:else}
      <span class="login-text">Log in</span>
    {/if}
  </button>
{/snippet}
{#snippet content()}
  <div class="dropdown">
    <Button href="/create" size="sm" variant="plain">New Recipe</Button>
    <Button
      class="logout-button"
      onclick={onLogout}
      size="sm"
      variant="plain"
      loading={loadingLogout}>Log out</Button
    >
  </div>
{/snippet}

<div class="container">
  <CustomDropdown bind:show {trigger} {content} />
  <span class="greeting">Hello, {user?.fName}</span>
</div>

<style lang="scss">
  .container {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;

    .character-container {
      --size: 3.5rem;
      height: var(--size);
      width: var(--size);

      padding: 0.5rem;

      border: 1px solid var(--app-theme-secondary);
      border-radius: 100%;

      background-color: transparent;

      transition: background-color var(--default-transition-ms) ease-in-out;

      &:hover {
        cursor: pointer;

        background-color: var(--app-theme-secondary);

        :global(.loginText) {
          color: var(--app-theme-text-secondary);
        }
      }
    }

    .login-text {
      color: var(--app-theme-text-primary);
    }

    .dropdown {
      background-color: var(--bg-color-overlay);

      :global(.logout-button) {
        width: 100%;
      }
    }

    .greeting {
      color: var(--app-theme-text-secondary);
    }
  }
</style>
