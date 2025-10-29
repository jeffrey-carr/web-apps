<script lang="ts">
  import './reset.css';
  import './globals.css';
  import { page } from '$app/state';
  import {
    getUserLocale,
    Notification,
    NOTIFICATION_LEVELS,
    type NotificationInfo,
    type NotificationLevel,
    type User,
  } from '@jeffrey-carr/frontend-common';
  import { setContext } from 'svelte';
  import { UserLoadingKey, UserKey, CalendarsKey, CalendarsLoadingKey, CurrentCalendarKey, NotificationKey, UserLocaleKey } from '$lib/constants/context';
  import { writable } from 'svelte/store';
  import type { Calendar } from '$lib/types';
  import type { GetCalendarsResponse } from '$lib/types/request';
    import { browser } from '$app/environment';

  let { data, children }: { data: GetCalendarsResponse; children?: () => any } = $props();

  // This data is going to be needed everywhere in the app, so let's
  // load it once and make it available everywhere
  const userStore = writable<User | undefined>();
  const userLoadingStore = writable(true);
  const calendarsStore = writable<Record<string, Calendar>>({});
  const calendarsLoadingStore = writable(true);
  const currentCalendarStore = writable("");

  // Also include the notification store so components can send data to our notifications manager
  const notificationsStore = writable<NotificationInfo>();

  setContext(UserKey, userStore);
  setContext(UserLoadingKey, userLoadingStore);
  setContext(CalendarsKey, calendarsStore);
  setContext(CalendarsLoadingKey, calendarsLoadingStore);
  setContext(CurrentCalendarKey, currentCalendarStore);
  setContext(NotificationKey, notificationsStore);

  $effect(() => {
    if (browser) {
      setContext(UserLocaleKey, getUserLocale(window));
    }
  });

  $effect(() => {
    userLoadingStore.set(true);
    userStore.set(data?.user);
    userLoadingStore.set(false);
  });

  $effect(() => {
    calendarsLoadingStore.set(true);
    calendarsStore.set(data?.calendars ?? {});
    calendarsLoadingStore.set(false);
  });

  let notification = $state<NotificationInfo>();
  let notificationLevel = $state<NotificationLevel>('info');

  $effect(() => {
    const n = $notificationsStore;
    if (n) {
      notification = { title: n.title, message: n.message };
      notificationLevel = n.level ?? 'info';
    } else {
      notification = undefined;
    }
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
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Dosis:wght@200..800&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet">

  <title>Jeff's Calendar Creator</title>
</svelte:head>

<main class="container">
  <div class="content">
    {@render children?.()}
  </div>
  {#if notification}
    <Notification
      level={notification.level ?? 'info'}
      title={notification.title}
      message={notification.message}
      close={closeNotification}
      duration={5000}
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
    margin: 1rem;
  }
</style>
