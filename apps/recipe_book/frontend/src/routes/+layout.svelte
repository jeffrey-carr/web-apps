<script lang="ts">
  import './reset.css';
  import './globals.css';

  import { onMount, setContext } from 'svelte';
  import { navigating } from '$app/state';
  import {
    getUser,
    type User,
    App,
    type NotificationInfo,
    Notification,
    Spinner,
  } from '@jeffrey-carr/frontend-common';
  import { PUBLIC_ENVIRONMENT } from '$env/static/public';
  import { USER_CONTEXT_KEY } from '$lib/constants';
  import { notificationQueue } from '$lib/globals/notifications.svelte';

  // TODO - make these more fun
  const routeToLoadingMessage = (nav: typeof navigating): string | null => {
    if (nav.to == null) return null;

    if (loadingUser) {
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

  let loadingUser = $state(true);
  let user = $state<User | null>(null);

  let loadingMessage = $derived(routeToLoadingMessage(navigating));

  let notification = $state<NotificationInfo>();

  onMount(() => {
    const loadUser = async () => {
      user = await getUser(PUBLIC_ENVIRONMENT, App.RecipeBook);
      loadingUser = false;
      updateUserContext(user);
    };

    if (user != null) return;

    loadingUser = true;
    loadUser();
  });

  $effect(() => {
    if (notificationQueue.length > 0 && notification == null) {
      notification = notificationQueue.shift();
    }
  });

  const updateUserContext = (u: User | null) => {
    setContext(USER_CONTEXT_KEY, u);
  };

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
    width: 100vw;

    margin: 0;

    background-color: var(--app-theme-background);
  }

  .loading-container {
    display: flex;
    justify-content: center;
    align-items: center;

    height: 100%;
    width: 100%;
  }

  .child-container {
    padding: 1rem;
  }
</style>
