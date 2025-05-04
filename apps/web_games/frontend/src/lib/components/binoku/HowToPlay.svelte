<script lang="ts">
	import { ContentSlides } from '$lib/components/common';
	import { Board } from '$lib/components/binoku';
	import type { Coordinate, InvalidHint } from '$lib/types';

	const allCoordinates: Coordinate[] = [];
	for (let i = 0; i < 6; i++) {
		for (let j = 0; j < 6; j++) {
			allCoordinates.push({ row: i, col: j });
		}
	}

	const rules = [
		'There must be an equal number of types of tiles in each row and column',
		'There cannot be more than 2 consecutive tile types next to each other in each row and column',
		'There cannot be any identical rows or any identical columns'
	];
	const boards = [
		[
			[1, 1, 0, 0, 1, 0],
			[0, 0, 1, 1, 0, 1],
			[1, 0, 1, 0, 1, 1],
			[0, 1, 0, 1, 1, 0],
			[1, 1, 0, 0, 1, 0],
			[0, 0, 1, 1, 0, 1]
		],
		[
			[1, 1, 1, 0, 0, 1],
			[0, 0, 0, 1, 1, 0],
			[1, 1, 0, 0, 1, 1],
			[0, 0, 1, 1, 0, 0],
			[1, 1, 0, 0, 1, 1],
			[0, 0, 1, 1, 0, 0]
		],
		[
			[1, 0, 1, 0, 1, 0],
			[1, 0, 1, 0, 1, 0],
			[0, 1, 0, 1, 0, 1],
			[0, 1, 0, 1, 0, 1],
			[1, 0, 1, 0, 1, 0],
			[0, 1, 0, 1, 0, 1]
		]
	];
	const boardHints: InvalidHint[] = [
		{ rows: [2], cols: [4] },
		{ rows: [0], cols: [] },
		{ rows: [0, 1], cols: [1, 3] }
	];
</script>

<div class="container">
	<div class="header">
		<h1>How To Play</h1>
	</div>
	<div class="content">
		{#snippet content(index: number)}
			<p class="instruction">{index + 1}. {rules[index]}</p>
			<div class="board-container">
				<Board
					board={boards[index]}
					hint={boardHints[index]}
					lockedCells={allCoordinates}
					showButtons={false}
				/>
			</div>
		{/snippet}
		<ContentSlides snippet={content} numPages={rules.length} />
	</div>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;

		height: 85vh;
		max-height: 37rem;
		width: 85vw;

		margin: 0;
		padding: 0;

		font-size: 1.5rem;
		color: black;
	}

	.header h1 {
		margin-bottom: 0;
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;

		padding: 1rem;
	}

	.board-container {
		height: 300px;
		width: 100%;
	}
</style>
