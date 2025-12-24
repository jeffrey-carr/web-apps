<script lang="ts">
  import { goto } from '$app/navigation';
  import { userState } from '$lib/globals/user.svelte';
  import { buildRerouteURL } from '$lib/utils';
  import { Apps, App, APP_QUERY_PARAM, type RouteQuery } from '@jeffrey-carr/frontend-common';
  import clsx from 'clsx';

  let { data }: { data: RouteQuery } = $props();

  const buildAppRoute = (app: App): string => {
    return `/?${APP_QUERY_PARAM}=${app}`;
  };

  const gotoApp = (app?: App) => {
    // if the user is logged in, send them on their way
    if (userState.user) {
      if (app) {
        window.location.assign(buildRerouteURL(app));
      } else if (data.goto) {
        goto(data.goto);
      } else if (data.app) {
        window.location.assign(buildRerouteURL(data.app, data.path));
      }
      return;
    }

    // otherwise, send them to the login page and pass the props
    if (app) {
      goto(buildAppRoute(app));
    } else if (data.goto) {
      goto(`/?goto=${goto}`);
    } else if (data.app) {
      goto(buildAppRoute(data.app));
    }
  };
</script>

{#snippet card(router: () => void, name: string, className?: string)}
  <button class={clsx('app', className)} onclick={router}>
    <h2>{name}</h2>
  </button>
{/snippet}
{#snippet appCard(app: App)}
  {@render card(() => gotoApp(app), Apps[app].friendlyName, Apps[app].subdomain)}
{/snippet}

<main class="main">
  <h1 class="title">Choose Your App</h1>

  <div class="app-container">
    {@render appCard(App.WebGames)}
    {@render card(() => goto('/account'), 'Your Account')}
  </div>
</main>

<style lang="scss">
  .main {
    text-align: center;
  }

  .title {
    margin-top: 2rem;
    margin-bottom: 5rem;
  }

  .app-container {
    display: flex;
    justify-content: center;
    gap: 1rem;
  }

  .app {
    padding: 1rem;

    border: 1px solid black;
    border-radius: 10px;

    box-shadow: 3px 3px 13px black;

    &:hover {
      cursor: pointer;
    }
  }
</style>
