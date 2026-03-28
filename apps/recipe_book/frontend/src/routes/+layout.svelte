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
    {@render children?.()}
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

  .child-container {
    height: 100%;
    width: 100%;
  }
</style>
