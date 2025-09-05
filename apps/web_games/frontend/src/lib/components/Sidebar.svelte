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
    makeRequest,
    GlobalRoutes,
    Sidebar,
    PATH_QUERY_PARAM,
  } from '@jeffrey-carr/frontend-common';
  import type { RouteInformation, User } from '@jeffrey-carr/frontend-common';

  let {
    title,
    open = $bindable(),
    items,
    user,
  }: {
    title?: string;
    open: boolean;
    items: SidebarItem[];
    user?: User | null;
  } = $props();

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
    if (page.url.pathname !== "/") {
      route += `&${PATH_QUERY_PARAM}=${page.url.pathname.slice(1)}`
    }
    window.location.assign(route);
  };

  const gotoAccount = () => {
    goto('/account');
    open = false;
  };

  const logout = async () => {
    const appURL = getAppURL(PUBLIC_ENVIRONMENT, App.Federation);
    const info = GlobalRoutes.LOGOUT;
    const route = `${appURL}${info.path}`;
    const fullInfo: RouteInformation = {
      path: route,
      method: info.method,
    };
    const response = await makeRequest(fullInfo, {
      body: { logoutEverywhere: true },
      credentials: true,
    });

    if (response.status !== 200) {
      console.error('Error logging out');
      console.error(response);
      return;
    }

    if (page.url.pathname.includes("account")) {
      // Use location.assign so the sidebar reloads
      window.location.assign('/');
      return;
    }

    // Or if we don't route, just reload the page
    location.reload();
  };
</script>

<Sidebar bind:open>
  <div class="container">
    {#if title}
      <h1 class="title">{title}</h1>
    {/if}
    <div class="items">
      {#each items as item}
        <button class="item" onclick={() => handleClick(item.action)}>{item.title}</button>
      {/each}
    </div>
    <div class="account">
      {#if user}
        <div class="profile">
          <CharacterIcon character={user.character} />
        </div>
        <h3 class="user-greeting">{generateGreeting()}, {user.fName}</h3>
        <div class="buttons">
          <Button size="medium" onclick={gotoAccount}>View Account</Button>
          <Button size="medium" type="secondary" onclick={logout}>Logout</Button>
        </div>
      {:else}
        <h3>Login</h3>
        <div class="buttons">
          <Button size="medium" onclick={login}>Login</Button>
        </div>
      {/if}
    </div>
  </div>
</Sidebar>

<style lang="scss">
  .container {
    display: flex;
    flex-direction: column;

    height: 100%;
    width: 100%;

    text-align: center;

    border-radius: 10px;

    background-color: var(--dark-white);
  }

  .title {
    padding: 1rem;
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

    max-height: 33%;

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
