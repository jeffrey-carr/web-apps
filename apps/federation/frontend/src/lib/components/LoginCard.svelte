<script lang="ts">
  import { Apps, Button, Input, type RouteQuery } from '@jeffrey-carr/frontend-common';

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

<div class="container">
  <h1 class="title">Enter the Jeffiverse</h1>
  {#if appName}
    <p>Once you log in, you'll be brought back to <span class="app-highlight">{appName}</span></p>
  {/if}
  <div class="inputs">
    <div class="input">
      <label class="label" for="email">Email</label>
      <Input bind:value={email} name="email" type="email" placeholder="email@example.com" />
    </div>
    <div class="input">
      <label class="label" for="password">Password</label>
      <Input bind:value={password} name="password" type="password" />
    </div>
  </div>
  <div class="buttons">
    <Button size="medium" onclick={callLogin} loading={loggingIn}>Login</Button>
    <Button size="medium" type="secondary" onclick={switchToCreate}>Create Account</Button>
  </div>
</div>

<svelte:window onkeydown={callLoginShortcut} />

<style lang="scss">
  @import 'shared.scss';

  .title {
    justify-self: flex-start;
  }
</style>
