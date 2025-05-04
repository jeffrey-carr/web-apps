<script lang="ts">
  import { goto } from '$app/navigation';
  import { PUBLIC_BACKEND_URL } from '$env/static/public';
  import Board from './Board.svelte';
  import HowToPlay from './HowToPlay.svelte';
  import { Button, Confetti, Modal, Spinner } from '@jeffrey-carr/frontend-common';
  import type { InvalidHint, Coordinate } from '$lib/types/binoku';

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
  const GENERATING_MESSAGES = [
    'Generating puzzle...',
    'This is taking a while, sorry',
    'Doo doo do...',
    "Hold on, it's coming!!!",
    'Okay, well eventually',
  ];

  let validating = $state(false);

  const back = () => {
    goto('/');
  };

  // Board
  const generateBoard = async (size: BoardSize) => {
    board = [];
    showCorrect = false;

    let generatingTimeout: NodeJS.Timeout | undefined;
    generatingLevel = 1;
    generatingTimeout = setInterval(() => {
      generatingLevel = Math.min(GENERATING_MESSAGES.length, generatingLevel + 1);
    }, 5000);

    const boardRequest = await fetch(`${PUBLIC_BACKEND_URL}/binoku/new-game?size=${size}`);
    const data = await boardRequest.json();
    board = data['board'];
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
    const validateRequest = await fetch(`${PUBLIC_BACKEND_URL}/binoku/validate-game`, {
      method: 'POST',
      body: JSON.stringify({ board }),
    });

    const response = await validateRequest.json();
    if (response['valid']) {
      showCorrect = true;
    } else if (response['hint']) {
      setHint(response['hint']);
    }

    validating = false;
    return true;
  };

  // Modal
  let showInstructions = $state(false);
  const toggleModal = () => {
    showInstructions = !showInstructions;
  };

  // Correct celebration
  let showCorrect = $state(false);
</script>

<div class="container">
  {#snippet sizeButton(n: BoardSize)}
    <button class="size-button" onclick={() => generateBoard(n)}>
      {n}
    </button>
  {/snippet}
  <Modal bind:open={showInstructions}>
    <HowToPlay />
  </Modal>
  <Modal bind:open={showCorrect}>
    <div class="correct-message">
      <h1>Correct!</h1>
      <!-- <p>You completed a {board.length}x{board.length} puzzle in {0}</p> -->
      <p>Would you like to play again?</p>
      <div class="buttons-container">
        {#each SIZES as size}
          {@render sizeButton(size)}
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
    <Button onclick={back}>Back to Main</Button>
    <div class="new-game-container">
      <div class="title">
        <p>Start a new game</p>
      </div>
      <div class="buttons">
        {#each SIZES as size}
          {@render sizeButton(size)}
        {/each}
      </div>
    </div>
    <Button size="medium" onclick={checkSolution} disabled={board.length === 0}>
      {#if validating}
        <Spinner color="dark" />
      {:else}
        Check Solution
      {/if}
    </Button>
    <Button size="medium" onclick={toggleModal}>How To Play</Button>
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
</div>

<style lang="scss">
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 1.3rem;

    box-sizing: border-box;

    height: 100vh;
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
  }
  .header .title {
    font-size: 5rem;

    margin: 0;
    padding: 0;
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
  }
  .new-game-container .title {
    position: absolute;
    top: calc(-1 * (var(--button-size) + var(--title-size) - 1rem));

    width: 100%;

    text-align: center;
    font-size: var(--title-size);
  }
  .new-game-container .buttons {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
  }

  /* Board area */
  .board-container {
    flex: 1;
    display: flex;
    justify-content: center;

    height: 90%;
    width: 90%;
  }
  .board-container .spinner-container {
    --size-rem: 2.5rem;
    height: var(--size-rem);
    width: var(--size-rem);
  }

  .loading-container {
    --spacing: 1rem;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing);

    width: 100%;

    margin-top: var(--spacing);
  }
  .loading-text {
    width: 100%;
  }
  .loading-text .message {
    animation: upAndIn 250ms ease-out forwards;

    text-align: center;
    font-size: 1rem;
  }

  /* Other */
  .size-button {
    --button-size: 3rem;
    --transition-ms: 200ms;
    --move-x-rem: 0.1rem;
    --move-y-rem: calc(var(--move-x-rem) * -1);

    background-color: var(--light);
    height: var(--button-size);
    width: var(--button-size);

    border: 1px solid var(--dark);
    border-radius: 5px;

    transition:
      color var(--transition-ms) linear,
      background-color var(--transition-ms) linear,
      border-color var(--transition-ms) linear,
      transform var(--transition-ms) linear,
      box-shadow var(--transition-ms) linear;
  }
  .size-button:hover {
    background-color: var(--gray);
    transform: translate(var(--move-x-rem), var(--move-y-rem));
  }
  .size-button:hover:nth-child(odd) {
    box-shadow: var(--move-y-rem) var(--move-x-rem) var(--red);
  }
  .size-button:hover:nth-child(even) {
    box-shadow: var(--move-y-rem) var(--move-x-rem) var(--blue);
  }
  .size-button:active {
    --transition-ms: 120ms;
    transform: translate(0, 0);
    box-shadow: none !important;
  }

  .correct-message {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    height: 60vh;
    width: 85vw;
  }

  .correct-message h1 {
    margin-bottom: 0;
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
