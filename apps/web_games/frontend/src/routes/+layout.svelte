<script lang="ts">
  import './reset.css';
  import './globals.css';
  import { NavBar } from '$lib/components';
  import { page } from '$app/state';
  import {
    Notification,
    NOTIFICATION_LEVELS,
    type NotificationLevel,
    type User,
  } from '@jeffrey-carr/frontend-common';

  let { data, children }: { data?: { user: User }; children?: () => any } = $props();
  let user = $derived(data?.user);

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
  <!-- Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700" rel="stylesheet" />
  <link href="https://fonts.googleapis.com/css2?family=Luckiest+Guy" rel="stylesheet" />
  <link href="https://fonts.googleapis.com/css2?family=Monoton" rel="stylesheet" />
  <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700" rel="stylesheet" />
  <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P" rel="stylesheet" />

  <title>Jeff's Web Games</title>
</svelte:head>

<main class="container">
  <NavBar {user} />
  <div class="content">
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
    display: flex;
    flex-direction: column;

    height: 100vh;
    width: 100vw;

    margin: 0;

    background-color: var(--app-theme-background);
  }

  .content {
    flex: 1;
    overflow-y: 100%;
  }
</style>
