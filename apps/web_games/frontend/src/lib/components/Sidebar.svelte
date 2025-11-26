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
<div class={clsx('overlay', { open })} onclick={close}></div>
<div class={clsx('container', { open })}>
  <div class={'sidebar'}>
    {#if title}
      <h1 class="title">{title}</h1>
    {/if}
    <div class="items">
      {#each items as item}
        <button class="item" onclick={() => handleClick(item.action)}>{item.title}</button>
      {/each}
    </div>
    <div class="account">
      {#if loadingUser}
        <span>Loading your info...</span>
      {:else if user}
        <div class="profile">
          <CharacterIcon character={user.character} />
        </div>
        <h3 class="user-greeting">{generateGreeting()}, {user.fName}</h3>
        <div class="buttons">
          <Button size="medium" onclick={gotoAccount}>View Account</Button>
          <Button size="medium" type="secondary" onclick={logout} loading={loadingLogout}
            >Logout</Button
          >
        </div>
      {:else}
        <h3>Login</h3>
        <div class="buttons">
          <Button size="medium" onclick={login}>Login</Button>
        </div>
      {/if}
    </div>
  </div>
</div>

<style lang="scss">
  .container {
    --width: 350px;
    --transition-ms: 250ms;

    position: absolute;
    top: 0;
    right: 0;
    z-index: 1001;

    pointer-events: none;

    height: 100vh;
    width: var(--width);

    overflow-x: hidden;
    overflow-y: auto;

    &.open {
      pointer-events: all;

      .sidebar {
        transition-timing-function: cubic-bezier(0.2, 0.9, 0.1, 1.2);
        right: 0;
      }
    }
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1000;

    height: 100vh;
    width: 100vw;

    background-color: black;
    opacity: 0;

    pointer-events: none;

    transition: opacity var(--transition-ms) linear;

    &.open {
      pointer-events: all;
      opacity: 0.5;
    }
  }

  .sidebar {
    position: absolute;
    top: 0;
    right: calc(-1 * var(--width));

    display: flex;
    flex-direction: column;

    height: 100%;
    width: 100%;

    text-align: center;

    border-radius: 10px;

    background-color: var(--dark-white);

    transition: right var(--transition-ms);
    transition-timing-function: cubic-bezier(0.4, 0, 0.7, 0.2);
  }

  .title {
    padding: 1rem;
  }

  .items {
    margin-bottom: 1rem;
  }

  .item {
    width: 100%;

    padding: 1.2rem 1rem;

    border: 1px solid black;
    border-left: none;
    border-right: none;

    background-color: transparent;

    transition: background-color 50ms linear;

    &:hover {
      cursor: pointer;
      background-color: rgba(0, 0, 0, 0.3);
    }
  }

  .account {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;

    margin: 0.6rem;
    margin-top: auto;

    border-radius: 15px;

    padding: 1rem 0;

    background-color: white;

    .buttons {
      display: flex;
      justify-content: center;
      gap: 1rem;
    }
  }

  .profile {
    height: 3rem;
    width: 3rem;

    border: 1px solid black;
    border-radius: 100%;
  }

  .user-greeting {
    font: var(--app-theme-font);
    font-size: 1.3rem;
    text-transform: capitalize;
  }
</style>
