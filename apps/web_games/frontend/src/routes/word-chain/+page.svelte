<script lang="ts">
  import {
    type ValidateAnswerRequest,
    type ValidateAnswerResponse,
    type WordChainGameData,
  } from '$lib/types/word-chain';
  import { Word } from '$lib/components/word-chain';
  import {
    Button,
    Confetti,
    makeRequest,
    METHODS,
    Modal,
    Spinner,
    type RouteInformation,
  } from '@jeffrey-carr/frontend-common';

  const Routes: Record<string, RouteInformation> = {
    NEW_GAME: {
      path: '/api/word-chain/new-game',
      method: METHODS.GET,
    },
    VALIDATE_ANSWER: {
      path: '/api/word-chain/validate-answer',
      method: METHODS.POST,
    },
  };

  const TIMEOUT_PENALTY = 5000;

  let game = $state<WordChainGameData>();
  let gameUUID = $state('');
  let loading = $state(false);

  let guesses = $state<string[]>([]);
  let timeouts = $state<number[]>([]);
  let showWin = $state(false);

  $effect(() => {
    if (!game) {
      gameUUID = '';
      return;
    }

    if (gameUUID !== game.uuid) {
      gameUUID = game.uuid;

      const initialTimeouts = Array(game.chain.length).fill(0);
      timeouts = initialTimeouts;
    }
  });

  const newGame = async () => {
    game = undefined;
    loading = true;

    const response = await makeRequest(Routes.NEW_GAME, { credentials: true });
    if (response.status !== 200) {
      loading = false;
      console.error('error getting new game', response);
      return;
    }

    game = await response.json();
    loading = false;
  };

  const updateGuess = (guess: string, index: number) => {
    if (!game) {
      console.error('Cannot update guess - no game');
      return;
    }

    if (timeouts[index] > new Date().getTime()) {
      return;
    }

    guess = guess.toUpperCase();
    if (guess === guesses[index]) {
      return;
    }

    guesses[index] = guess;

    if (guesses[index].length === game.chain[index].length) {
      submitGuess(guess, index);
    }
  };

  const submitGuess = async (guess: string, index: number) => {
    if (!game) {
      console.error('Could not submit guess - no game');
      return;
    }

    const request: ValidateAnswerRequest = {
      guess,
      payload: game,
    };
    const rawResponse = await makeRequest(Routes.VALIDATE_ANSWER, {
      body: request,
      credentials: true,
    });
    if (rawResponse.status !== 200) {
      console.error('error in request', rawResponse);
      return;
    }

    const response: ValidateAnswerResponse = await rawResponse.json();
    game = response.game;
    if (response.correct) {
      console.log('correct!');
      if (response.victory) {
        showWin = true;
      }
    } else {
      timeouts[index] = new Date().getTime() + TIMEOUT_PENALTY;
    }
  };
</script>

<div class="container">
  {#if showWin}
    <Confetti />
  {/if}
  <Modal bind:open={showWin}>
    <div class="correct-message">
      <h1>Correct!</h1>
      <!-- <p>You completed a {board.length}x{board.length} puzzle in {0}</p> -->
      <p>Would you like to play again?</p>
      <div class="buttons-container">
        <Button size="medium" onclick={newGame}>New Game</Button>
        <Button
          size="medium"
          type="secondary"
          onclick={() => {
            showWin = false;
          }}>View board</Button
        >
      </div>
    </div>
  </Modal>

  <div class="info-center">
    <div class="title">
      <h1>Word Chain <span class="subtext">BETA</span></h1>
    </div>

    <div class="buttons-container">
      <Button onclick={newGame} size="medium">New Game</Button>
    </div>
  </div>

  <div class="words-column">
    {#if loading}
      <div class="loading-container">
        <div class="spinner-container">
          <Spinner theme="red" />
        </div>
        Loading...
      </div>
    {:else if game}
      {#each game.chain as word, i}
        <div class="word" id={word}>
          <Word
            {word}
            onUpdate={(newGuess: string) => updateGuess(newGuess, i)}
            correct={i !== 0 && i < game.userProgress}
            locked={i !== game.userProgress}
            timedOutUntil={timeouts[i]}
          />
        </div>
      {/each}
    {/if}
  </div>
</div>

<style lang="scss">
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    width: 100%;

    padding-top: 1rem;
  }

  .info-center {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .title {
    text-align: center;

    .subtext {
      font-size: 0.7rem;
      color: var(--app-theme-danger);
    }
  }

  .loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;

    .spinner-container {
      --size: 2rem;
      height: var(--size);
      width: var(--size);
    }
  }

  .words-column {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1.3rem;

    padding: 1rem;
  }

  .word {
    display: flex;

    height: 4rem;
  }

  @media only screen and (max-width: 800px) {
    .word {
      height: 3rem;
    }
  }

  .correct-message {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    height: 60vh;
    width: 85vw;

    h1 {
      margin-bottom: 0;
    }

    .buttons-container {
      display: flex;
      gap: 1rem;
    }
  }
</style>
