<script lang="ts">
  import { goto } from '$app/navigation';
  import type { SidebarAction, SidebarItem } from '$lib/types/sidebar';
  import { Button, CharacterIcon, generateGreeting, Sidebar } from '@jeffrey-carr/frontend-common';
  import type { User } from '@jeffrey-carr/frontend-common';

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
    console.log('button clicked!');
    if (typeof action === 'string') {
      window.location.assign(action);
    } else {
      action();
    }
  };

  const gotoAccount = () => {
    goto('/account');
    open = false;
  };

  const logout = () => {
    // TODO
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
        <h3>{generateGreeting()}, {user.fName}</h3>
        <div class="buttons">
          <Button size="medium" onclick={gotoAccount}>View Account</Button>
          <Button size="medium" type="secondary" onclick={logout}>Logout</Button>
        </div>
      {:else}
        <h3>Login</h3>
        <div class="buttons">
          <Button size="medium">Login</Button>
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

    background-color: white;
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

    margin-top: auto;

    padding: 1rem 0;

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
</style>
