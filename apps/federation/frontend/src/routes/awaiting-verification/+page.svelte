<script lang="ts">
  import { page } from '$app/state';
  import { Button } from '@jeffrey-carr/frontend-common';
  import styles from './page.module.scss';
  import { goto } from '$app/navigation';

  let userEmail = $derived(page.url.searchParams.get('email'));
  let emailStr = $derived(userEmail ? ` at ${userEmail} ` : '');
</script>

<main class={styles.container}>
  <div class={styles.card}>
    <h1 class={styles.title}>Verify Your Email</h1>
    <p class={styles.content}>
      Before you can use your account, you will need to verify your email.{' '}
      A verification link has been emailed to you{emailStr} that is valid for 1 hour.{' '}
      If the link expires, you will need to sign up again.
    </p>
    <Button class={styles.goButton} variant="secondary" onclick={() => goto('/choose-app')}
      >Choose an app</Button
    >
  </div>
</main>
