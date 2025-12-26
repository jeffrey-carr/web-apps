<script lang="ts">
  import './reset.css';
  import './globals.css';
  import { userState } from '$lib/globals/user.svelte';
  import {
    App,
    getUser,
    Spinner,
    Notification,
    type NotificationInfo,
  } from '@jeffrey-carr/frontend-common';
  import { PUBLIC_ENVIRONMENT } from '$env/static/public';
  import { onMount } from 'svelte';
  import { navigating } from '$app/state';
  import { notificationQueue } from '$lib/globals/notifications.svelte';

  let { children }: { children?: () => any } = $props();
  let hasLoadedUser = $state(false);
  let isInitialLoad = $state(true);

  const routeToLoadingMessage = (nav: typeof navigating): string | null => {
    if (nav.to == null) return null;

    if (isInitialLoad || userState.isLoading) {
      return 'Loading your info...';
    }

    if (nav.to.route.id === '/choose-app') {
      return 'Loading your app choices...';
    }

    if (nav.to.route.id === '/account') {
      return 'Loading your account info...';
    }

    if (nav.to.route.id === '/admin') {
      return 'Loading super secret stuff...';
    }

    return 'Loading...';
  };

  let loadingMessage = $derived(routeToLoadingMessage(navigating));

  const loadUser = async () => {
    if (userState.user) {
      isInitialLoad = false;
      return;
    }
    userState.isLoading = true;

    try {
      userState.user = await getUser(PUBLIC_ENVIRONMENT, App.Federation);
    } catch (e) {
      console.error(e);
    } finally {
      userState.isLoading = false;
      isInitialLoad = false;
    }
  };

  onMount(() => {
    if (hasLoadedUser) return;

    loadUser();
    hasLoadedUser = true;
  });

  let notification = $state<NotificationInfo>();
  $effect(() => {
    if (notificationQueue.length > 0 && notification == null) {
      notification = notificationQueue.shift();
    }
  });

  const closeNotification = () => {
    notification = notificationQueue.shift();
  };
</script>

<svelte:head>
  <title>Central Fed</title>
  <link
    href="https://fonts.googleapis.com/css2?family=Dosis:wght@200..800&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Raleway:ital,wght@0,100..900;1,100..900&display=swap"
    rel="stylesheet"
  />
</svelte:head>

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

<main class="container">
  {#if loadingMessage}
    <div class="loading-container">
      <Spinner label={loadingMessage} />
    </div>
  {:else}
    {@render children?.()}
  {/if}
</main>

<style lang="scss">
  .container {
    height: 100vh;
    width: 100vw;

    margin: 0;

    background-color: var(--app-theme-background);
  }

  .loading-container {
    height: 4rem;
    margin: auto;
    margin-top: 5rem;
  }
</style>
