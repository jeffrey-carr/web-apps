<script lang="ts">
  import './reset.css';
  import './globals.css';
  import { NavBar } from '$lib/components';
  import { navigating, page } from '$app/state';
  import {
    App,
    getUser,
    Notification,
    NOTIFICATION_LEVELS,
    Spinner,
    type NotificationLevel,
    type User,
  } from '@jeffrey-carr/frontend-common';
  import { PUBLIC_ENVIRONMENT } from '$env/static/public';
  import { onMount } from 'svelte';
  import { userState } from '$lib/globals/user.svelte';

  const routeToLoadingMessage = (nav: typeof navigating): string | null => {
    if (nav.to == null) return null;

    switch (nav.to.route.id) {
      case '/account':
        return 'Loading your account...';
      case '/word-chain':
      case '/binoku':
        return 'Loading game...';
      default:
        return 'Loading...';
    }
  };

  let { children }: { children?: () => any } = $props();
  let loadingUser = $state(true);

  let loadingMessage = $derived(routeToLoadingMessage(navigating));

  let notification = $state<{ title?: string; message: string }>();
  let notificationLevel = $state<NotificationLevel>('error');

  onMount(() => {
    const loadUser = async () => {
      if (userState.user) {
        return;
      }

      let user: User | null;
      try {
        user = await getUser(PUBLIC_ENVIRONMENT, App.WebGames);
      } catch (e) {
        userState.isLoading = false;
        return;
      }

      userState.user = user;
      userState.isLoading = false;
      return;
    };

    if (userState.user != null) return;

    loadingUser = true;
    loadUser();
  });

  // Manage messages
  $effect(() => {
    const query = page.url.searchParams;

    const message = query.get('message');
    if (message == null || message === '') {
      return;
    }

    const queryMessageTitle = query.get('messageTitle');
    let title;
    if (queryMessageTitle != null && queryMessageTitle !== '') {
      title = queryMessageTitle;
    }

    const queryLevel = query.get('level');
    let level: NotificationLevel;
    if (queryLevel == null || queryLevel === '') {
      level = 'error';
    } else {
      level = queryLevel.toLowerCase() as NotificationLevel;
    }
    if (NOTIFICATION_LEVELS.indexOf(level) < 0) {
      level = 'error';
    }

    notification = { title, message };
    notificationLevel = level;
  });

  const closeNotification = () => {
    notification = undefined;
  };
</script>

<svelte:head>
  <!-- Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700" rel="stylesheet" />
  <link href="https://fonts.googleapis.com/css2?family=Luckiest+Guy" rel="stylesheet" />
  <link href="https://fonts.googleapis.com/css2?family=Monoton" rel="stylesheet" />
  <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700" rel="stylesheet" />
  <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P" rel="stylesheet" />

  <title>Jeff's Web Games</title>
</svelte:head>

<main class="container">
  <NavBar />
  <div class="content">
    {#if loadingMessage}
      <div class="loading">
        <div class="spinner">
          <Spinner size="1.75rem" label={loadingMessage} />
        </div>
        <!-- <span class="message">{loadingMessage}</span> -->
      </div>
    {:else}
      {@render children?.()}
    {/if}
  </div>
  {#if notification}
    <Notification
      level={notificationLevel}
      title={notification.title}
      message={notification.message}
      close={closeNotification}
    />
  {/if}
</main>

<style lang="scss">
  .container {
    display: grid;
    grid-template-rows: auto 1fr;

    min-height: 100dvh;

    background-color: var(--app-theme-background);
  }

  .content {
    min-height: 0;
  }

  .loading {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;

    height: 100%;
    width: 100%;

    text-align: center;

    .spinner {
      --size: 2rem;
      height: var(--size);
      width: var(--size);
    }
  }
</style>
