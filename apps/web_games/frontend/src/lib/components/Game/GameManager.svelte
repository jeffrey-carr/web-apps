<script lang="ts">
  import { AVAILABLE_GAMES, GAME_INFO, type AvailableGame } from '$lib';
  import { GameMenu } from '$lib/components';
  import { Game as Binoku } from '$lib/components/binoku';
  import { Game as WordChain } from '$lib/components/word-chain';
  import BinokuIcon from '$lib/assets/binoku/game-icon.svg';

  let currentGame = $state<AvailableGame | 'None'>('None');
  let changeGame = $state(false);

  const setGame = (game: AvailableGame) => {
    if (game === 'None') {
      changeGame = true;
      setTimeout(() => {
        currentGame = game;
        changeGame = false;
      }, 500);
    } else {
      currentGame = game;
    }
  };
</script>

<svelte:head>
  <title>{currentGame !== 'None' ? `${GAME_INFO[currentGame].name} - ` : ''}Jeff's Web Games</title>
</svelte:head>

<div class="container">
  <GameMenu {setGame} />

  {#if currentGame !== 'None'}
    <div class={`game ${changeGame ? 'leave' : ''}`}>
      {#if currentGame === 'Binoku'}
        <Binoku {setGame} />
      {:else if currentGame === 'WordChain'}
        <WordChain {setGame} />
      {/if}
    </div>
  {/if}
</div>

<style lang="scss">
  .container {
    height: 100%;
    width: 100%;
  }

  .game-container {
    height: 100%;
    width: 100%;
  }

  .game {
    --slide-speed: 450ms;

    position: absolute;
    top: 0;
    z-index: 1;

    height: 100%;
    width: 100vw;

    background-color: var(--bg-color);

    animation: slideIn var(--slide-speed) cubic-bezier(0.5, 1.75, 0.5, 1);

    &.leave {
      animation: slideOut var(--slide-speed) cubic-bezier(0.47, -0.48, 0, -0.5) forwards;
    }
  }

  @keyframes slideIn {
    from {
      left: 100%;
    }
    to {
      left: 0;
    }
  }

  @keyframes slideOut {
    from {
      left: 0;
    }
    to {
      left: 100%;
    }
  }
</style>
