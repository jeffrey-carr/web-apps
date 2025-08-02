<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/state';
  import { PUBLIC_ENVIRONMENT } from '$env/static/public';
  import {
    App,
    ExpandButton,
    getAppURL,
    getUser,
    ReactiveIcon,
  } from '@jeffrey-carr/frontend-common';
  import { Sidebar } from './index';
  import type { User } from '@jeffrey-carr/frontend-common';
  import { onMount } from 'svelte';

  let height = $state('5rem');
  let bar = $state<HTMLDivElement>();
  let path = $state(page.url.pathname);
  let user = $state<User | null>(null);
  let loadingUser = $state(true);
  let isSidebarOpen = $state(false);

  onMount(async () => {
    const loadedUser = await getUser(PUBLIC_ENVIRONMENT, App.WebGames);
    loadingUser = false;

    if (loadedUser == null) {
      return;
    }

    user = loadedUser;
  });

  $effect(() => {
    path = page.url.pathname;
  });

  $effect(() => {
    if (bar == null) {
      return;
    }

    height = `${bar.getBoundingClientRect().height}px`;
  });

  const back = () => {
    goto('/');
  };

  const toggleSidebar = () => {
    isSidebarOpen = !isSidebarOpen;
  };

  const handleAccount = () => {
    if (loadingUser) {
      return;
    }

    if (user != null && user.uuid !== '') {
      goto('/account');
      return;
    }

    // Build query info to route back here
    const params = new URLSearchParams({
      app: App.WebGames,
    });

    const p = path;
    if (p !== '/') {
      params.set('path', p.slice(1));
    }
    window.location.assign(`${getAppURL(PUBLIC_ENVIRONMENT, App.Federation)}?${params.toString()}`);
  };

  const boop = () => {
    alert('boop');
  };
</script>

<div class="container" bind:this={bar}>
  <div class="button back-button icon">
    {#if path != '/'}
      <ExpandButton onclick={back}>Back to main</ExpandButton>
    {/if}
  </div>
  <h1 class="title">Jeff's Web Games</h1>
  {#if path != '/account'}
    <div class="button account-button">
      <button onclick={toggleSidebar}>
        <ReactiveIcon icon="hamburger" />
      </button>
    </div>
  {/if}
</div>
<Sidebar
  title="Sidebar"
  items={[{ title: 'Item 1', action: boop }]}
  bind:open={isSidebarOpen}
  {user}
/>

<style lang="scss">
  .container {
    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;

    padding: 1rem 2rem;

    background-color: var(--app-theme-primary);
  }

  .icon {
    --theme-primary-parent: var(--app-theme-secondary);
    --theme-color-parent: var(--app-theme-secondary);
  }

  .title {
    color: var(--app-theme-text-secondary);
  }

  .button {
    --button-offset: 1rem;

    position: absolute;
  }

  .back-button {
    left: var(--button-offset);
  }

  .account-button {
    right: var(--button-offset);

    button {
      background-color: transparent;
      border: none;

      &:hover {
        cursor: pointer;
      }
    }
  }
</style>
