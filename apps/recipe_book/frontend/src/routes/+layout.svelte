<script lang="ts">
  import './reset.css';
  import './globals.css';

  import { onMount } from 'svelte';
  import { navigating } from '$app/state';
  import {
    getUser,
    App,
    type NotificationInfo,
    Notification,
    Spinner,
  } from '@jeffrey-carr/frontend-common';
  import { PUBLIC_ENVIRONMENT } from '$env/static/public';
  import { notificationQueue } from '$lib/globals/notifications.svelte';
  import { userFavorites, userState } from '$lib/globals/user.svelte';
  import { getUserFavorites } from '$lib/requests/recipe';

  // TODO - make these more fun
  const routeToLoadingMessage = (nav: typeof navigating): string | null => {
    if (nav.to == null) return null;

    if (userState.isLoading) {
      return 'Loading your info...';
    }

    if (nav.to.route.id === '/create') {
      return 'Loading create form...';
    }

    if (nav.to.route.id?.startsWith('/recipe/')) {
      return 'Loading recipe...';
    }

    return 'Loading...';
  };

  let { children }: { children?: () => any } = $props();

  let loadingMessage = $derived(routeToLoadingMessage(navigating));

  let notification = $state<NotificationInfo>();

  onMount(() => {
    const loadUser = async () => {
      const promises: Promise<any>[] = [];
      promises.push(getUser(PUBLIC_ENVIRONMENT, App.RecipeBook));
      promises.push(getUserFavorites());

      let resolved = [];
      try {
        resolved = await Promise.all(promises);
      } catch (e) {
        // Any errors here we can just swallow, it's probably an expired cookie
        userState.isLoading = false;
        userFavorites.isLoading = false;
        return;
      }

      userState.user = resolved[0];
      userFavorites.favorites = resolved[1];

      userState.isLoading = false;
      userFavorites.isLoading = false;
    };

    if (userState.user != null) return;

    userState.isLoading = true;
    loadUser();
  });

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
  <title>Recipe Book</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link
    href="https://fonts.googleapis.com/css2?family=Atma:wght@300;400;500;600;700&family=Quicksand:wght@300..700&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<main class="container">
  <div class="child-container">
    {#if loadingMessage}
      <div class="loading-container">
        <Spinner label={loadingMessage} />
      </div>
    {:else}
      {@render children?.()}
    {/if}
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
</main>

<style lang="scss">
  .container {
    --navbar-height: 5rem;

    position: relative;
    height: 100vh;

    margin: 0;

    background-color: var(--app-theme-background);
  }

  .loading-container {
    display: flex;
    justify-content: center;
    align-items: center;

    height: 100%;
    width: 100%;
    --min-size: 1rem;
    min-height: var(--min-size);
    min-width: var(--min-size);
  }
</style>
