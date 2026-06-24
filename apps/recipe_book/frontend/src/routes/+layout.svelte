<script lang="ts">
  import './reset.css';
  import './globals.css';

  import { onMount } from 'svelte';
  import {
    getUser,
    App,
    type NotificationInfo,
    Notification,
    Spinner,
  } from '@jeffrey-carr/frontend-common';
  import { PUBLIC_ENVIRONMENT } from '$env/static/public';
  import { notificationQueue } from '$lib/globals/notifications.svelte';
  import { userState } from '$lib/globals/user.svelte';
  import { navigating } from '$app/state';

  let { children }: { children?: () => any } = $props();

  let notification = $state<NotificationInfo>();

  onMount(() => {
    const loadUser = async () => {
      const promises: Promise<any>[] = [];
      // TODO: only check if cookie is present
      if (!userState.user) {
        promises.push(getUser(PUBLIC_ENVIRONMENT, App.RecipeBook));
      }

      let resolved = [];
      try {
        resolved = await Promise.all(promises);
      } catch (e) {
        // Any errors here we can just swallow, it's probably an expired cookie
        userState.isLoading = false;
        return;
      }

      userState.user = resolved[0];
      userState.isLoading = false;
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

  const getLoadingMessage = (): string => {
    if (!navigating.to?.route?.id) return 'page';
    switch (navigating.to.route.id) {
      case '/':
        return 'Loading home...';
      case '/recipe/[id]':
        return 'Loading recipe...';
      default:
        return `Loading page...`;
    }
  };
</script>

<svelte:head>
  <title>Jean's Recipe Book</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link
    href="https://fonts.googleapis.com/css2?family=Atma:wght@300;400;500;600;700&family=Quicksand:wght@300..700&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<main class="container">
  {#if navigating.to}
    <div class="spinner-container">
      <Spinner size="1.75rem" label={getLoadingMessage()} />
    </div>
  {:else}
    <div class="child-container">
      {@render children?.()}
    </div>
  {/if}

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

  .spinner-container {
    display: flex;
    justify-content: center;
    align-items: center;

    height: 100%;
    width: 100%;
  }

  .child-container {
    height: 100%;
    width: 100%;
  }
</style>
