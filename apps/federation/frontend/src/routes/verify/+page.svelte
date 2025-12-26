<script lang="ts">
  import { ServerError, Spinner, type User } from '@jeffrey-carr/frontend-common';
  import type { VerificationRouteValues } from './+page';
  import styles from './page.module.scss';
  import { onMount } from 'svelte';
  import { verifyEmail } from '$lib/requests/verify';
  import { goto } from '$app/navigation';
  import { notificationQueue } from '$lib/globals/notifications.svelte';
  import { userState } from '$lib/globals/user.svelte';

  let { data }: { data: VerificationRouteValues } = $props();
  let isVerifying = false;

  onMount(() => {
    const verify = async () => {
      if (isVerifying) return;
      isVerifying = true;

      const response: User | ServerError = await verifyEmail(data.token);
      if (response instanceof ServerError) {
        notificationQueue.push({
          title: 'Error verifying email',
          message: response.message,
          level: 'error',
        });
        await goto('/');
        return;
      }

      userState.user = response;
      notificationQueue.push({
        title: 'Account verified',
        message: 'Your account has been created',
        level: 'success',
      });
      await goto('/account');
    };

    verify();
  });
</script>

<svelte:head>
  <title>Central Fed | Verify</title>
</svelte:head>

<main class={styles.container}>
  <h1 class={styles.title}>Verifying your email</h1>
  <div class={styles.loadingContainer}>
    <Spinner class={styles.loading} label="Hang on while we verify your email..." />
  </div>
</main>
