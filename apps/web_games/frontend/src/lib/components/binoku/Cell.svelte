<script lang="ts">
	import lock from '$lib/assets/lock.svg';
	import type { Coordinate } from '$lib/types';

	const buildClassStr = (value: number, isHint?: boolean): string => {
		let str = '';

		if (value >= 0) {
			str = `${str} ${value === 0 ? 'zero' : 'one'}`;
		}

		if (isHint) {
			str = `${str} hint`;
		}

		return str.trim();
	};

	let {
		value = $bindable(),
		updateValue,
		coord,
		isHint = false,
		locked = false,
		zeroColor,
		oneColor,
		children
	}: {
		value: number;
		updateValue: (row: number, col: number, v: number) => void;
		coord: Coordinate;
		isHint?: boolean;
		zeroColor?: string;
		oneColor?: string;
		locked?: boolean;
		children?: () => any;
	} = $props();

	let containerClassStr = $derived(buildClassStr(value, isHint));

	const change = () => {
		let newValue: number;
		if (value === 1) {
			newValue = -1;
		} else {
			newValue = value + 1;
		}

		updateValue(coord.row, coord.col, newValue);
	};
</script>

<div
	class={`container ${containerClassStr}`}
	style={`--zeroColor: ${zeroColor ?? 'var(--blue)'}; --oneColor: ${oneColor ?? 'var(--red)'}`}
>
	<button aria-label="board cell" class="button" onclick={change} disabled={locked}>
		{@render children?.()}
	</button>
	{#if locked}
		<img class="lock" src={lock} alt="lock icon" />
	{/if}
</div>

<style>
	.container {
		--animate-ms: 75ms;
		--border-radius-px: 5px;
		--zeroColor: --blue;
		--oneColor: --red;

		box-sizing: border-box;
		position: relative;

		border: 1px solid var(--dark);
		background-color: var(--gray);

		height: 100%;
		width: 100%;

		aspect-ratio: 1 / 1;

		transition: background-color var(--animate-ms) linear;
	}
	.container.top-left {
		border-top-left-radius: var(--border-radius-px);
	}
	.container.top-right {
		border-top-right-radius: var(--border-radius-px);
	}
	.container.bottom-left {
		border-bottom-left-radius: var(--border-radius-px);
	}
	.container.bottom-right {
		border-bottom-right-radius: var(--border-radius-px);
	}
	.container:disabled:hover {
		border-color: black;
	}

	.zero {
		background-color: var(--zeroColor);
	}

	.one {
		background-color: var(--oneColor);
	}

	.hint {
		border: 3px solid var(--warning);
	}

	.button {
		position: relative;
		z-index: 1;

		height: 100%;
		width: 100%;

		border: none;
		background-color: transparent;

		font-size: 1.2rem;
	}
	.button:disabled {
		color: black;
	}

	.lock {
		--gap: 0.3rem;
		--size: 0.8rem;

		position: absolute;
		top: var(--gap);
		right: var(--gap);

		height: var(--size);
		width: var(--size);
	}

	@keyframes pulse {
		to {
			border-width: 4px;
		}
	}
</style>
