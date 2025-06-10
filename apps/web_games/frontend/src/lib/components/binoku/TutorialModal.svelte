<script lang="ts">
  import type { Coordinate, InvalidHint } from '$lib/types/binoku';
  import { MultiPageModal } from '@jeffrey-carr/frontend-common';
  import Board from './Board.svelte';

  let { open = $bindable() }: { open: boolean } = $props();
  let currentPage = $state(0);

  const ALL_COORDINATES: Coordinate[] = [];
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
      ALL_COORDINATES.push({ row: i, col: j });
    }
  }
  const RULES = [
    'There must be an equal number of types of tiles in each row and column',
    'There cannot be more than 2 consecutive tile types next to each other in each row and column',
    'There cannot be any identical rows or any identical columns',
  ];
  const BOARDS = [
    [
      [1, 1, 0, 0, 1, 0],
      [0, 0, 1, 1, 0, 1],
      [1, 0, 1, 0, 1, 1],
      [0, 1, 0, 1, 1, 0],
      [1, 1, 0, 0, 1, 0],
      [0, 0, 1, 1, 0, 1],
    ],
    [
      [1, 1, 1, 0, 0, 1],
      [0, 0, 0, 1, 1, 0],
      [1, 1, 0, 0, 1, 1],
      [0, 0, 1, 1, 0, 0],
      [1, 1, 0, 0, 1, 1],
      [0, 0, 1, 1, 0, 0],
    ],
    [
      [1, 0, 1, 0, 1, 0],
      [1, 0, 1, 0, 1, 0],
      [0, 1, 0, 1, 0, 1],
      [0, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 0],
      [0, 1, 0, 1, 0, 1],
    ],
  ];
  const BOARD_HINTS: InvalidHint[] = [
    { rows: [2], cols: [4] },
    { rows: [0], cols: [] },
    { rows: [0, 1], cols: [1, 3] },
  ];
</script>

{#snippet instruction(pageNum: number)}
  <h1 class="title">Rule {pageNum + 1}</h1>
  <p class="instruction">{RULES[pageNum]}</p>
  <div class="board-container">
    <Board
      board={BOARDS[pageNum]}
      hint={BOARD_HINTS[pageNum]}
      lockedCells={ALL_COORDINATES}
      showButtons={false}
    />
  </div>
{/snippet}

<MultiPageModal bind:open bind:currentPage content={instruction} numPages={RULES.length} />

<style lang="scss">
  .instruction {
    margin: 1rem 1rem;
  }

  .board-container {
    height: 300px;
    width: 100%;

    margin: 1rem;
  }
</style>
