<script lang="ts">
  import { GAME_INFO, PLAYABLE_GAMES, type AvailableGame } from '$lib';

  let { setGame }: { setGame(game: AvailableGame): void } = $props();
</script>

<div class="container">
  {#each PLAYABLE_GAMES as game}
    {@const info = GAME_INFO[game]}
    <button onclick={() => setGame(game)} class="card">
      <div class="icon">
        <img class="icon-img" alt={`${info.name} icon`} src={info.icon} />
      </div>
      <div class="content">
        <div class="title">
          <h1>{info.name}</h1>
        </div>
        <div class="description">
          <p>{info.description}</p>
        </div>
      </div>
    </button>
  {/each}
</div>

<style lang="scss">
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    padding: 1rem;

    height: 100%;
    width: 100%;
    min-width: 150px;
  }

  .card {
    display: flex;

    height: 100%;
    max-height: 200px;
    width: 100%;
    max-width: 600px;

    background: transparent;

    border: 1px solid var(--app-theme-secondary);
    border-radius: 5px;

    transition: background-color 150ms;

    &:hover {
      cursor: pointer;

      background-color: var(--app-theme-secondary);
    }
    // TODO - this is bad, I need to fix my global css for this
    &:hover * {
      color: var(--app-theme-text-secondary);
    }

    .icon {
      flex: 0;

      .icon-img {
        height: 100%;
        width: 100%;

        aspect-ratio: 1 / 1;
      }
    }

    .content {
      flex: 5;
      padding: 1rem;

      .title {
        margin-bottom: 1rem;
        border-bottom: 1px solid var(--app-theme-secondary);
      }
    }
  }
</style>
