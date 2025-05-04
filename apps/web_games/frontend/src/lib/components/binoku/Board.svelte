<script lang="ts">
	import type { BoardStyle, Coordinate, InvalidHint } from '$lib/types';
	import { resizeObserver } from '$lib/utils';
	import { Stack } from '$lib/objects';
	import Button from '$lib/components/common/Button.svelte';
	import Cell from '$lib/components/binoku/Cell.svelte';

	let {
		board = $bindable(),
		hint,
		style = 'colors',
		lockedCells,
		showButtons = true
	}: {
		board: number[][];
		hint?: InvalidHint;
		style?: BoardStyle;
		lockedCells: Coordinate[];
		showButtons?: boolean;
	} = $props();

	let container = $state<HTMLDivElement>();
	let boardContainerSize = $state<number>();
	const resizeContainer = (height: number, width: number) => {
		boardContainerSize = Math.min(height, width);
	};

	type Move = {
		row: number;
		col: number;
		value: number;
	};
	let moveStack = $state(new Stack<Move>());
	let noMoves = $state(true);

	const fillCell = (row: number, col: number, value: number) => {
		const previousValue = board[row][col];
		moveStack.push({ row, col, value: previousValue });
		noMoves = false;
		board[row][col] = value;
	};

	const isLocked = (row: number, col: number): boolean => {
		return lockedCells.findIndex((cell) => cell.row === row && cell.col === col) >= 0;
	};

	const isHintCell = (row: number, col: number): boolean => {
		if (hint?.rows?.includes(row)) {
			return true;
		}

		if (hint?.cols?.includes(col)) {
			return true;
		}

		return false;
	};

	const undoMove = () => {
		if (moveStack.size() === 0) {
			return;
		}

		const lastMove = moveStack.pop();
		if (lastMove == null) {
			return;
		}

		if (moveStack.size() === 0) {
			noMoves = true;
		}

		board[lastMove.row][lastMove.col] = lastMove.value;
	};

	const resetBoard = () => {
		while (moveStack.size() > 0) {
			undoMove();
		}
	};
</script>

<div bind:this={container} class="container" use:resizeObserver={resizeContainer}>
	<div
		class="board-container"
		style={`--board-size: ${board.length}; --board-container-size: ${boardContainerSize}px`}
	>
		{#each board as row, rowI}
			{#each row as cell, colI}
				<Cell
					value={board[rowI][colI]}
					updateValue={fillCell}
					coord={{ row: rowI, col: colI }}
					locked={isLocked(rowI, colI)}
					zeroColor={style === 'numbers' ? 'var(--gray)' : undefined}
					oneColor={style === 'numbers' ? 'var(--gray)' : undefined}
					isHint={isHintCell(rowI, colI)}
				>
					{#if style === 'numbers' && cell >= 0}
						{cell}
					{/if}
				</Cell>
			{/each}
		{/each}
	</div>
	{#if showButtons}
		<div class="buttons-container">
			<Button onclick={undoMove} disabled={noMoves}>Undo last move</Button>
			<Button onclick={resetBoard} disabled={noMoves}>Reset board</Button>
		</div>
	{/if}
</div>

<style>
	.container {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1rem;

		height: 100%;
		width: 100%;
	}

	.board-container {
		--board-size: 0;
		--board-container-size: 0;

		box-sizing: border-box;

		display: grid;
		gap: 3px;

		height: var(--board-container-size);
		width: var(--board-container-size);

		grid-template-columns: repeat(var(--board-size), 1fr);
	}

	.buttons-container {
		display: inline-flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	@media only screen and (max-width: 600px) {
		.container {
			--container-size: min(80vw, 80vh);

			flex-direction: column;
			justify-content: flex-start;
		}

		.buttons-container {
			flex-direction: row;
			justify-content: center;

			width: 100%;
		}
	}
</style>
