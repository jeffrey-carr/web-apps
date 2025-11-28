<script lang="ts">
  import { AVAILABLE_GAMES, GamesInfo } from '$lib';
  import { GameButton } from '$lib/components';
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
