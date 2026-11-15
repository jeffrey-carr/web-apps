<script lang="ts">
  import { goto } from '$app/navigation';
  import Game from '$lib/components/word-chain/Game.svelte';
  import { userState } from '$lib/globals/user.svelte';
  import { newGame, validateGuess } from '$lib/requests/word-chain';
  import type { ValidateAnswerResponse, WordChainGameData } from '$lib/types/word-chain';
  import {
    Button,
    Confetti,
    ReactiveIcon,
    ServerError,
    Spinner,
    type ServerResponse,
  } from '@jeffrey-carr/frontend-common';
  import { onMount } from 'svelte';

  let loadingGame = $state(true);
  let loading = $derived(loadingGame || userState.isLoading);
  let game = $state<WordChainGameData>();
  let victory = $state(false);
  let timedOutUntil = $state<number>();

  const fetchGame = async () => {
    loadingGame = true;

    try {
      game = await newGame();
    } catch (e) {
      const serverResponse = e as ServerResponse;
      console.error('error loading game', serverResponse.data);
      await goto('/word-chain');
    }

    loadingGame = false;
  };

  onMount(() => {
    if (!game) {
      fetchGame();
    }
  });

  const onMakeGuess = async (guess: string) => {
    if (!game) return;

    let response: ValidateAnswerResponse;
    try {
      response = await validateGuess({ guess, encryptedState: game?.encryptedState });
    } catch (e) {
      const serverResponse = e as ServerResponse<ServerError>;
      console.error('error making guess', serverResponse.data);
      return;
    }

    if (response.victory) {
      victory = true;
    }
    if (response.penaltyInSeconds) {
      timedOutUntil = Date.now() + response.penaltyInSeconds * 1000;
    }

    game.progress = response.state.progress;
    game.chain = response.state.chain;
    if (response.encryptedState) {
      game.encryptedState = response.encryptedState;
    }
  };
</script>

<div class="container">
  {#if loading || !game}
    <div class="loading-container">
      <Spinner label="Loading game..." size="2rem" />
    </div>
  {:else if victory}
    <Confetti />
    <div class="victory-container">
      <h2 class="victory-header">You Win!</h2>
      <div class="final-chain">
        <h3 class="chain-title">Final Chain</h3>
        <div class="final-chain-word-list">
          {#each game?.chain as word, i (`${word}_${i}`)}
            <p class="chain-word">{word}</p>
            {#if i !== game.chain.length - 1}
              <ReactiveIcon icon="right-arrow" />
            {/if}
          {/each}
        </div>
      </div>
      <div class="buttons-container">
        <Button size="lg" loading={loadingGame} onclick={fetchGame}>Play Again</Button>
        <Button size="lg" variant="secondary" href="/">Back to Home</Button>
      </div>
    </div>
  {:else if game}
    <Game chain={game.chain} progress={game.progress} {onMakeGuess} bind:timedOutUntil />
  {/if}
</div>

<style lang="scss">
  .container {
    height: 100%;
    width: 100%;
  }

  .loading-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .victory-container {
    margin-top: 1.5rem;
    text-align: center;

    .victory-header {
      font-family: var(--game-font);
    }

    .final-chain {
      margin: 2rem 0;

      .final-chain-word-list {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1.5rem;

        margin-top: 1rem;
      }
    }

    .buttons-container {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;

      margin: 1rem;
    }
  }
</style>
