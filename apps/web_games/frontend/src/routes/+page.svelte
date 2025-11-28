<script lang="ts">
  import { AVAILABLE_GAMES, GamesInfo } from '$lib';
  import { GameButton } from '$lib/components';
  import { makeRequest, METHODS } from '@jeffrey-carr/frontend-common';

  let open = $state(false);

  const testCORs = async () => {
    const response = await makeRequest({
      path: 'http://login.jeffreycarr.local:9999/api/admin/keys',
      method: METHODS.GET,
      credentials: 'required',
    });

    console.log(response);
  };
</script>

<main class="main">
  <div class="games-container">
    {#each AVAILABLE_GAMES as game}
      <GameButton
        icon={GamesInfo[game].icon}
        name={GamesInfo[game].name}
        slug={GamesInfo[game].path}
      />
    {/each}
  </div>

  <button onclick={testCORs}>Test</button>
</main>

<style lang="scss">
  .main {
    height: 100%;

    overflow-x: hidden;
  }

  .games-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 2rem;

    height: 100%;
  }
</style>
