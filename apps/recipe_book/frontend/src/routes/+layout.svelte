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
    getRandomElement,
    Spinner,
    NOTIFICATION_LEVELS,
    generateRandomInt,
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

  const createNotification = () => {
    const SAMPLE_NOTIFS: NotificationInfo[] = [
      {
        title: 'Security Alert',
        message: "Your cat has successfully deployed 'butt_on_keyboard.exe'. Input blocked.",
      },
      {
        title: 'Hydration Station',
        message: 'Your houseplant is dramatically wilting just to get your attention.',
      },
      {
        title: 'Miracle Detected',
        message: 'Your code compiled on the first try. This is highly suspicious.',
      },
      {
        title: 'Caffeine Critical',
        message: 'Bloodstream indicates insufficient bean juice. Please refill coffee immediately.',
      },
      {
        title: 'Pizza Tracker',
        message: 'The pizza has arrived. This is not a drill. I repeat: THE PIZZA IS HERE.',
      },
      {
        title: 'Bug Report',
        message: 'We found a bug. We named him Kevin. He lives in the navigation bar now.',
      },
      {
        title: 'Social Battery',
        message: "Energy at 4%. Please initiate 'Irish Goodbye' protocol immediately.",
      },
      {
        title: 'Wifi Status',
        message: 'Connected, but no Internet. The ultimate modern tragedy.',
      },
      {
        title: 'Sleep Reminder',
        message: 'Go to bed. The syntax errors will still be there in the morning.',
      },
      {
        title: 'Server Status',
        message: 'The server is taking a nap. Please use inside voices.',
      },
    ];

    const info = getRandomElement(SAMPLE_NOTIFS);
    const levelN = generateRandomInt(0, NOTIFICATION_LEVELS.length);
    info.level = NOTIFICATION_LEVELS[levelN];

    addNotificationToQueue(info);
  };

  const addNotificationToQueue = (notif: NotificationInfo) => {
    notificationQueue.push(notif);
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
  <div class="notification-button">
    <button onclick={createNotification}>Add notification to queue</button>
  </div>
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

  .notification-button {
    position: absolute;
    top: 0;
    left: 0;
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
