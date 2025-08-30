<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/state';
  import { PUBLIC_ENVIRONMENT } from '$env/static/public';
  import { App, ExpandButton, getAppURL, ReactiveIcon } from '@jeffrey-carr/frontend-common';
  import { Sidebar } from './index';
  import type { User } from '@jeffrey-carr/frontend-common';

  let { user }: { user?: User } = $props();
  let height = $state('5rem');
  let bar = $state<HTMLDivElement>();
  let path = $state(page.url.pathname);
  let loadingUser = $state(true);
  let isSidebarOpen = $state(false);

  $effect(() => {
    path = page.url.pathname;
  });

  $effect(() => {
    if (bar == null) {
      return;
    }

    height = `${bar.getBoundingClientRect().height}px`;
  });

  const nav = (path: string) => {
    goto(path);
    isSidebarOpen = false;
  };

  const back = () => {
    nav('/');
  };

  const binoku = () => {
    nav('/binoku');
  };

  const wordChain = () => {
    nav('/word-chain');
  };

  const toggleSidebar = () => {
    isSidebarOpen = !isSidebarOpen;
  };
</script>

<div class="container" bind:this={bar}>
  <div class="button back-button icon">
    {#if path != '/'}
      <ExpandButton onclick={back}>Back to main</ExpandButton>
    {/if}
  </div>
  <h1 class="title">Jeff's Web Games</h1>
  <div class="button account-button">
    <button onclick={toggleSidebar}>
      <ReactiveIcon icon="hamburger" />
    </button>
  </div>
</div>
<Sidebar
  title="Sidebar"
  items={[
    { title: 'Binoku', action: binoku },
    { title: 'Word Chain', action: wordChain },
  ]}
  bind:open={isSidebarOpen}
  {user}
/>

<style lang="scss">
  .container {
    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;

    padding: 1rem 2rem;

    background-color: var(--app-theme-primary);
  }

  .icon {
    --theme-primary-parent: var(--app-theme-secondary);
    --theme-color-parent: var(--app-theme-secondary);
  }

  .title {
    color: var(--app-theme-text-secondary);
    font-family: var(--app-theme-readable-font);
  }

  .button {
    --button-offset: 1rem;

    position: absolute;
  }

  .back-button {
    left: var(--button-offset);
  }

  .account-button {
    right: var(--button-offset);

    button {
      background-color: transparent;
      border: none;

      &:hover {
        cursor: pointer;
      }
    }
  }
</style>
