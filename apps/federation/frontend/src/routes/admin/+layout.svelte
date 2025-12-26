<script lang="ts">
  import { goto } from '$app/navigation';
  import { notificationQueue } from '$lib/globals/notifications.svelte';
  import { userState } from '$lib/globals/user.svelte';

  let { children }: { children?: () => any } = $props();
  let didNotify = false;

  $effect(() => {
    if (userState.isLoading) return;
    if (!userState.user || !userState.user.isAdmin) {
      goto('/?goto=/admin');
    }
    if (!userState.user?.isAdmin) {
      if (!didNotify) {
        notificationQueue.push({
          title: 'Not allowed',
          message: 'That page is for admins only',
          level: 'error',
        });
        didNotify = true;
      }

      goto('/choose-app');
    }
  });
</script>

<svelte:head>
  <link
    href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:ital,wght@0,200..900;1,200..900&display=swap"
    rel="stylesheet"
  />

  <title>Central Fed | Admin</title>
</svelte:head>

{@render children?.()}
