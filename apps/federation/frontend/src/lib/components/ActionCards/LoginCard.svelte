<script lang="ts">
  import { Apps, Button, Input, type RouteQuery } from '@jeffrey-carr/frontend-common';
  import styles from './LoginCard.module.scss';
  import sharedStyles from './shared.module.scss';

  let {
    query,
    login,
    switchToCreate,
  }: {
    query?: RouteQuery;
    login: (email: string, password: string) => Promise<boolean>;
    switchToCreate: () => void;
  } = $props();
  let email = $state('');
  let password = $state('');
  let loggingIn = $state(false);
  let appName = $derived(query?.app ? Apps[query.app].friendlyName : null);

  const callLoginShortcut = (e: KeyboardEvent) => {
    if (e.key !== 'Enter') {
      return;
    }

    callLogin();
  };

  const callLogin = async () => {
    loggingIn = true;
    await login(email, password);
    loggingIn = false;
  };
</script>

<div class={sharedStyles.container}>
  <h1 class={styles.title}>Enter the Jeffiverse</h1>
  {#if appName}
    <p>Once you log in, you'll be brought back to <span class="app-highlight">{appName}</span></p>
  {/if}
  <div class={sharedStyles.inputs}>
    <div class={sharedStyles.input}>
      <label class={sharedStyles.label} for="email">Email</label>
      <Input bind:value={email} name="email" type="email" placeholder="email@example.com" />
    </div>
    <div class={sharedStyles.input}>
      <label class={sharedStyles.label} for="password">Password</label>
      <Input bind:value={password} name="password" type="password" />
    </div>
  </div>
  <div class={sharedStyles.buttons}>
    <Button class={styles.loginButton} size="md" onclick={callLogin} loading={loggingIn}>
      Login
    </Button>
    <Button size="md" variant="outline" onclick={switchToCreate}>Create Account</Button>
  </div>
</div>

<svelte:window onkeydown={callLoginShortcut} />
