<script lang="ts">
  import './app.css';
  import { onMount } from 'svelte';
  import { page, navigating } from '$app/state';
  import {
    App,
    getAppURL,
    getUser,
    CharacterIcon,
    logout,
    Spinner,
    type User,
    Notification,
    type NotificationInfo,
  } from '@jeffrey-carr/frontend-common';
  import { PUBLIC_ENVIRONMENT } from '$env/static/public';
  import { notificationQueue } from '$lib/notifications.svelte';

  let { data, children } = $props();

  let notification = $state<NotificationInfo | undefined>();

  $effect(() => {
    if (notificationQueue.length > 0 && notification == null) {
      notification = notificationQueue.shift();
    }
  });

  const closeNotification = () => {
    notification = notificationQueue.shift();
  };

  async function handleLogout() {
    await logout(PUBLIC_ENVIRONMENT);
    window.location.href = getAppURL(PUBLIC_ENVIRONMENT, App.Auth);
  }

  let user = $state<User | null>(null);
  let loadingUser = $state(true);

  onMount(() => {
    const loadUser = async () => {
      try {
        user = await getUser(PUBLIC_ENVIRONMENT, App.FatBears);
      } catch (e) {
        user = null;
      }
      loadingUser = false;
    };
    loadUser();
  });

  let loginUrl = $derived.by(() => {
    let route = getAppURL(PUBLIC_ENVIRONMENT, App.Federation);
    route += `?app=${App.FatBears}`;
    if (page.url.pathname !== '/') {
      route += `&path=${page.url.pathname.slice(1)}`;
    }
    return route;
  });
</script>

{#if loadingUser}
  <div
    class="initial-load-spinner"
    style="display: flex; justify-content: center; align-items: center; height: 100vh; flex-direction: column;"
  >
    <Spinner label="Loading App..." size="50px" />
  </div>
{:else if !user}
  <div
    style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100vh; text-align: center;"
  >
    <h1 style="color: #FFF; text-shadow: var(--text-shadow); font-size: 3rem; margin-bottom: 2rem;">
      🐻 FAT BEARS
    </h1>
    <div style="display: flex; flex-direction: column; gap: 1rem; align-items: center;">
      <a href={loginUrl} class="pixel-button" style="font-size: 1.5rem;">Login</a>
      <div style="display: flex; gap: 1rem;">
        <a
          href="https://explore.org/meet-the-bears"
          target="_blank"
          class="pixel-button"
          style="font-size: 1rem; background-color: var(--secondary-color);">Meet the Bears</a
        >
        <a
          href="https://explore.org/fat-bear-week"
          target="_blank"
          class="pixel-button"
          style="font-size: 1rem; background-color: #ff4500;">Vote</a
        >
      </div>
    </div>
  </div>
{:else}
  <div class="layout-container" style="display: flex; flex-direction: column; min-height: 100vh;">
    <header style="display: flex; justify-content: flex-end; padding: 1rem; padding-bottom: 0;">
      <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 0.5rem;">
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <strong style="text-shadow: var(--text-shadow); color: white;"
            >{user.fName} {user.lName}</strong
          >
          <div
            style="width: 32px; height: 32px; border: 2px solid var(--primary-color); border-radius: 50%; overflow: hidden; background: #fff; display: flex; align-items: center; justify-content: center;"
          >
            <CharacterIcon character={user.character} />
          </div>
        </div>
        <div style="display: flex; gap: 0.5rem; justify-content: flex-end; flex-wrap: wrap;">
          <a
            href="https://explore.org/fat-bear-week"
            target="_blank"
            class="pixel-button"
            style="font-size: 0.7rem; padding: 0.25rem 0.5rem; text-decoration: none; background-color: #ff4500;"
            >Vote</a
          >
          <a
            href="https://explore.org/meet-the-bears"
            target="_blank"
            class="pixel-button"
            style="font-size: 0.7rem; padding: 0.25rem 0.5rem; text-decoration: none; background-color: var(--secondary-color);"
            >Meet the Bears</a
          >
          {#if user.isAdmin}
            <a
              href="/admin"
              class="pixel-button"
              style="font-size: 0.7rem; padding: 0.25rem 0.5rem; text-decoration: none;">Admin</a
            >
          {/if}
          <a
            href="/tournaments"
            class="pixel-button"
            style="font-size: 0.7rem; padding: 0.25rem 0.5rem; text-decoration: none;"
            >Tournaments</a
          >
          <button
            class="pixel-button"
            style="font-size: 0.7rem; padding: 0.25rem 0.5rem; background-color: #888;"
            on:click={handleLogout}>Logout</button
          >
        </div>
      </div>
    </header>
    <main style="flex-grow: 1; overflow-y: auto; padding: 1rem; padding-top: 0;">
      {@render children()}
    </main>
  </div>

  {#if notification}
    {#key notification}
      <Notification
        level={notification.level ?? 'info'}
        title={notification.title}
        message={notification.message}
        close={closeNotification}
      />
    {/key}
  {/if}

  {#if navigating.to}
    <div class="nav-loading-overlay">
      <Spinner label="Loading..." size="50px" />
    </div>
  {/if}
{/if}

<style>
  .nav-loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  /* To match the arcade feel, force the label in the Spinner to have the right font and shadow */
  :global(.nav-loading-overlay .label) {
    color: white;
    font-family: 'Press Start 2P', monospace;
    text-shadow: 2px 2px 0 #000;
    margin-top: 1rem;
  }
  :global(.initial-load-spinner .label) {
    color: white;
    font-family: 'Press Start 2P', monospace;
    text-shadow: var(--text-shadow);
    margin-top: 1rem;
  }
</style>
