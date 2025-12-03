<script lang="ts">
  import { goto } from '$app/navigation';
  import { Apps, App, APP_QUERY_PARAM } from '@jeffrey-carr/frontend-common';

  const chooseApp = (app: App) => {
    goto(`/?${APP_QUERY_PARAM}=${app}`);
  };
</script>

{#snippet appCard(app: App)}
  <button class={`app ${Apps[app].subdomain}`} onclick={() => chooseApp(app)}>
    <h2>{Apps[app].friendlyName}</h2>
  </button>
{/snippet}

<main class="main">
  <h1 class="title">Choose Your App</h1>

  <div class="app-container">
    {@render appCard(App.WebGames)}
    {@render appCard(App.RecipeBook)}
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
