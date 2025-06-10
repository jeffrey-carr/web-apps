<script lang="ts">
  import { MainButton } from '$lib/components';
  import {
    ROUTES,
    type ValidateAnswerRequest,
    type ValidateAnswerResponse,
    type WordChainGame,
  } from '$lib/types/word-chain';
  import { Word } from '$lib/components/word-chain';
  import { Button, Confetti, makeRequest, Modal } from '@jeffrey-carr/frontend-common';

  const TIMEOUT_PENALTY = 5000;

  let game = $state<WordChainGame>();
  let gameUUID = $state('');
  let revealedWords = $state<string[]>([]);
  let guesses = $state<string[]>([]);
  let timeouts = $state<number[]>([]);
  let revealedLetters = $state<number[]>([]);
  let showWin = $state(false);

  $effect(() => {
    if (!game) {
      gameUUID = '';
      return;
    }

    revealedWords = [...game.data.generatedChain.slice(0, game.data.userProgress)];
    const newGuesses = Array(game.data.generatedChain.length)
      .fill('')
      .map((_, i) => {
        if (i === 0 || game!.data.userProgress > i) {
          return game!.data.generatedChain[i];
        }

        return game!.data.generatedChain[i].slice(0, revealedLetters[i]);
      });

    guesses = newGuesses;

    if (gameUUID !== game.data.uuid) {
      gameUUID = game.data.uuid;

      const initialTimeouts = Array(game.data.generatedChain.length).fill(0);
      timeouts = initialTimeouts;

      const initialRevealedLetters = Array(game.data.generatedChain.length).fill(1);
      // First word is completely revealed
      initialRevealedLetters[0] = game.data.generatedChain[0].length;
      revealedLetters = initialRevealedLetters;
    }
  });

  const newGame = async () => {
    const response = await makeRequest(ROUTES.NEW_GAME);
    if (response.status !== 200) {
      console.error('error getting new game', response);
      return;
    }

    game = await response.json();
  };

  const updateGuess = (guess: string, index: number) => {
    if (!game) {
      console.error('Cannot update guess - no game');
      return;
    }

    if (timeouts[index] > new Date().getTime()) {
      return;
    }

    if (guess.length === 0) {
      guess = game.data.generatedChain[index].substring(0, revealedLetters[index]);
      guesses[index] = guess;
      return;
    }

    const revealed = game.data.generatedChain[index].substring(0, revealedLetters[index]);
    if (!guess.startsWith(revealed)) {
      guess = revealed + guess.substring(revealedLetters[index]);
    }

    guess = guess.toUpperCase();
    if (guess === guesses[index]) {
      return;
    }

    guesses[index] = guess;

    if (guesses[index].length === game.data.generatedChain[index].length) {
      submitGuess(guess, index);
    }
  };

  const submitGuess = async (guess: string, index: number) => {
    if (!game) {
      console.error('Could not submit guess - no game');
      return;
    }

    const response = await makeRequest(ROUTES.VALIDATE_ANSWER, {
      body: { guess, gameState: game },
    });
    if (response.status !== 200) {
      console.error('error in request', response);
      return;
    }

    const responseJSON: ValidateAnswerResponse = await response.json();
    if (responseJSON.correct) {
      game = responseJSON.updatedGame;
      if (responseJSON.victory) {
        showWin = true;
      }
      // document.getElementById(`word-${game.userProgress}`)?.scrollIntoView();
    } else {
      timeouts[index] = new Date().getTime() + TIMEOUT_PENALTY;

      const targetWordLength = game.data.generatedChain[index].length;
      if (revealedLetters[index] < targetWordLength - 1) {
        revealedLetters[index]++;
      }

      guesses[index] = game.data.generatedChain[index].substring(0, revealedLetters[index]);
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

  <MainButton />

  <div class="info-center">
    <div class="title">
      <h1>Word Chain <span class="subtext">BETA</span></h1>
    </div>

    <div class="buttons-container">
      <Button onclick={newGame} size="medium">New Game</Button>
    </div>
  </div>

  <div class="words-column">
    {#if game}
      {#each game.data.generatedChain as word, i}
        <div class="word" id={`word-${i}`}>
          <Word
            word={guesses[i]}
            targetWord={word}
            onUpdate={(newGuess: string) => updateGuess(newGuess, i)}
            correct={i !== 0 && i < game.data.userProgress}
            locked={i !== game.data.userProgress}
            timedOutUntil={timeouts[i]}
            revealedLetters={revealedLetters[i]}
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
