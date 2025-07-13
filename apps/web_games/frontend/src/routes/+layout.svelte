<script lang="ts">
  import './reset.css';
  import './globals.css';
  import { NavBar } from '$lib/components';
  import { page } from '$app/state';
  import {
    Notification,
    NOTIFICATION_LEVELS,
    type NotificationLevel,
  } from '@jeffrey-carr/frontend-common';

  let { children }: { children?: () => any } = $props();

  let navbarHeight = $state<string>();

  let notification = $state<{ title?: string; message: string }>();
  let notificationLevel = $state<NotificationLevel>('error');

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
  <link
    href="https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&family=Luckiest+Guy&family=Quicksand:wght@300..700&display=swap"
    rel="stylesheet"
  />

  <title>Jeff's Web Games</title>
</svelte:head>

<main class="container">
  <NavBar bind:height={navbarHeight} />
  <div class="content" style={`height: calc(100% - ${navbarHeight})`}>
    {@render children?.()}
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
    height: 100vh;
    width: 100vw;

    margin: 0;

    background-color: var(--app-theme-background);
  }
</style>
