<script lang="ts">
  import { Board, BoardSizeButton, TutorialModal } from '$lib/components/binoku';
  import {
    Button,
    Confetti,
    Modal,
    Spinner,
    type ServerResponse,
  } from '@jeffrey-carr/frontend-common';
  import { type InvalidHint, type Coordinate, type ValidateGameResponse } from '$lib/types/binoku';
  import { onDestroy } from 'svelte';
  import { newGame, validateAnswer } from '$lib/requests/binoku';

  // Hints
  const HINT_DURATION_MS = 3500;
  let hint = $state<InvalidHint>();
  let hintTimer = $state<NodeJS.Timeout>();
  const setHint = (newHint: InvalidHint) => {
    clearTimeout(hintTimer);
    hint = newHint;
    hintTimer = setTimeout(() => {
      hint = undefined;
    }, HINT_DURATION_MS);
  };

  // Board
  const SIZES = [4, 6, 8, 10] as const;
  type BoardSize = (typeof SIZES)[number];
  let board = $state<number[][]>([]);
  let lockedCells = $state<Coordinate[]>([]);

  let generatingLevel = $state(0);
  let generating = $derived(generatingLevel > 0);
  let generatingTimeout = $state<NodeJS.Timeout | undefined>();
  const GENERATING_MESSAGES = [
    'Generating puzzle...',
    'This is taking a while, sorry',
    'Did you know Binoku was invented in 1200 B.C.?',
    "I made that up, sorry. I don't know when Binoku was invented",
    'Really sorry for the wait. Maybe it crashed?',
  ];
  const LOADING_INTERVAL = 5000;

  let validating = $state(false);
  let canValidate = $derived(board.length > 0 && !board.some(row => row.some(cell => cell < 0)));

  // Board
  const generateBoard = async (size: BoardSize) => {
    board = [];
    showCorrect = false;

    generatingLevel = 1;
    generatingTimeout = setInterval(() => {
      generatingLevel = Math.min(GENERATING_MESSAGES.length, generatingLevel + 1);
    }, LOADING_INTERVAL);

    try {
      board = await newGame(size);
    } catch (e) {
      const err = e as ServerResponse;
      console.error(`Error generating board`, err);
      clearInterval(generatingTimeout);
      generatingLevel = 0;
      return;
    }

    lockedCells = getLockedCells(board);

    clearInterval(generatingTimeout);
    generatingLevel = 0;
  };

  const getLockedCells = (matrix: number[][]): Coordinate[] => {
    const coords: Coordinate[] = [];
    for (let row = 0; row < matrix.length; row++) {
      for (let col = 0; col < matrix.length; col++) {
        if (matrix[row][col] >= 0) {
          coords.push({ row, col });
        }
      }
    }

    return coords;
  };

  const checkSolution = async () => {
    validating = true;
    const payload = JSON.parse(JSON.stringify(board));
    let response: ValidateGameResponse;
    try {
      response = await validateAnswer(payload);
    } catch (e) {
      const err = e as ServerResponse;
      console.error(`Error checking solution: ${err.data}`);
      return;
    }

    if (response.valid) {
      showCorrect = true;
    } else if (response.hint) {
      setHint(response.hint);
    }

    validating = false;
    return true;
  };

  // Modal
  let showInstructions = $state(false);
  const toggleModal = () => {
    console.log('toggling modal');
    showInstructions = !showInstructions;
  };

  // Correct celebration
  let showCorrect = $state(false);

  onDestroy(() => {
    clearInterval(generatingTimeout);
  });
</script>

<main class="container">
  <TutorialModal bind:open={showInstructions} />
  <Modal bind:open={showCorrect}>
    <div class="correct-message">
      <h1>Correct!</h1>
      <!-- <p>You completed a {board.length}x{board.length} puzzle in {0}</p> -->
      <p>Would you like to play again?</p>
      <div class="buttons-container">
        {#each SIZES as size}
          <BoardSizeButton onclick={() => generateBoard(size)}>{size}</BoardSizeButton>
        {/each}
      </div>
      <Button
        onclick={() => {
          showCorrect = false;
        }}>View board</Button
      >
    </div>
  </Modal>
  {#if showCorrect}
    <Confetti />
  {/if}

  <!-- Header -->
  <div class="header">
    <h1 class="title">Binoku</h1>
  </div>

  <!-- Buttons -->
  <div class="buttons-container">
    <div class="new-game-container">
      <div class="title">
        <p>Start a new game</p>
      </div>
      <div class="buttons">
        {#each SIZES as size}
          <BoardSizeButton onclick={() => generateBoard(size)}>{size}</BoardSizeButton>
        {/each}
      </div>
    </div>
    <Button size="md" onclick={checkSolution} disabled={!canValidate} loading={validating}>
      Check Solution
    </Button>
    <Button size="md" variant="secondary" onclick={toggleModal}>How To Play</Button>
  </div>

  <!-- Board -->
  <div class="board-container">
    {#if generating}
      <div class="loading-container">
        <div class="spinner-container">
          <Spinner />
        </div>
        <div class="loading-text">
          {#each { length: generatingLevel } as _, i}
            <p class="message">{GENERATING_MESSAGES[i]}</p>
          {/each}
        </div>
      </div>
    {:else if board.length > 0}
      <Board bind:board {lockedCells} {hint} />
    {/if}
  </div>
</main>

<style lang="scss">
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 1.3rem;

    box-sizing: border-box;

    // height: 100vh;
    height: 100%;
    width: 100vw;

    margin: 0;
    padding: 1rem 0;
  }

  /* Header area */
  .header {
    flex: 0;

    display: flex;
    flex-direction: column;
    align-items: center;

    .title {
      font-size: 5rem;

      margin: 0;
      padding: 0;
    }
  }

  /* Buttons area */
  .buttons-container {
    flex: 0;

    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }

  .new-game-container {
    --button-size: 3rem;
    --title-size: 1rem;

    .title {
      position: absolute;
      top: calc(-1 * (var(--button-size) + var(--title-size) - 1rem));

      text-align: center;
      font-size: var(--title-size);
    }
    .buttons {
      display: flex;
      justify-content: center;
      gap: 0.5rem;
    }
  }

  /* Board area */
  .board-container {
    flex: 1;
    display: flex;
    justify-content: center;

    height: 90%;
    width: 90%;

    .spinner-container {
      --size-rem: 2.5rem;
      height: var(--size-rem);
      width: var(--size-rem);
    }
  }

  .loading-container {
    --spacing: 1rem;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing);

    width: 100%;

    margin-top: var(--spacing);

    .loading-text {
      width: 100%;

      .message {
        animation: upAndIn 250ms ease-out forwards;

        text-align: center;
        font-size: 1rem;

        margin-top: 1.5rem;
      }
    }
  }

  /* Other */
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
  }

  @keyframes upAndIn {
    from {
      transform: translateY(-1rem);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
</style>
