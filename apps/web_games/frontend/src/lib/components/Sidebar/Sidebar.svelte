<script lang="ts">
  import { page } from '$app/state';
  import { goto } from '$app/navigation';
  import { PUBLIC_ENVIRONMENT } from '$env/static/public';
  import type { SidebarAction, SidebarItem } from '$lib/types/sidebar';
  import {
    App,
    APP_QUERY_PARAM,
    Button,
    CharacterIcon,
    generateGreeting,
    getAppURL,
    PATH_QUERY_PARAM,
  } from '@jeffrey-carr/frontend-common';
  import type { ServerResponse, User } from '@jeffrey-carr/frontend-common';
  import { logout as doLogout } from '$lib/requests/user';

  import styles from './sidebar.module.scss';
  import clsx from 'clsx';

  let {
    title,
    open = $bindable(),
    items,
    user,
    loadingUser,
  }: {
    title?: string;
    open: boolean;
    items: SidebarItem[];
    user?: User | null;
    loadingUser?: boolean;
  } = $props();

  let loadingLogout = $state(false);

  const handleClick = (action: SidebarAction) => {
    if (typeof action === 'string') {
      window.location.assign(action);
    } else {
      action();
    }
  };

  const login = () => {
    let route = getAppURL(PUBLIC_ENVIRONMENT, App.Federation);
    route += `?${APP_QUERY_PARAM}=${App.WebGames}`;
    if (page.url.pathname !== '/') {
      route += `&${PATH_QUERY_PARAM}=${page.url.pathname.slice(1)}`;
    }
    window.location.assign(route);
  };

  const gotoAccount = () => {
    goto('/account');
    open = false;
  };

  const logout = async () => {
    loadingLogout = true;

    try {
      await doLogout();
    } catch (e) {
      const err = e as ServerResponse;
      console.error(`Error logging in: ${err.data}`);
      loadingLogout = false;
      return;
    }

    loadingLogout = false;

    if (page.url.pathname.includes('account')) {
      // Use location.assign so the sidebar reloads
      window.location.assign('/');
      return;
    }

    // Or if we don't route, just reload the page
    location.reload();
  };

  const close = () => {
    open = false;
  };
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class={clsx(styles.overlay, { [styles.open]: open })} onclick={close}></div>
<div class={clsx(styles.container, { [styles.open]: open })}>
  <div class={styles.sidebar}>
    {#if title}
      <h1 class={styles.title}>{title}</h1>
    {/if}
    <div class={styles.items}>
      {#each items as item}
        <button class={styles.item} onclick={() => handleClick(item.action)}>{item.title}</button>
      {/each}
    </div>
    <div class={styles.account}>
      {#if loadingUser}
        <span>Loading your info...</span>
      {:else if user}
        <div class={styles.profile}>
          <CharacterIcon character={user.character} />
        </div>
        <h3 class={styles.userGreeting}>{generateGreeting()}, {user.fName}</h3>
        <div class={styles.buttons}>
          <Button class={styles.accountButton} size="md" onclick={gotoAccount}>View Account</Button>
          <Button size="md" variant="secondary" onclick={logout} loading={loadingLogout}
            >Logout</Button
          >
        </div>
      {:else}
        <h3>Login</h3>
        <div class={styles.buttons}>
          <Button onclick={login}>Login</Button>
        </div>
      {/if}
    </div>
  </div>
</div>
