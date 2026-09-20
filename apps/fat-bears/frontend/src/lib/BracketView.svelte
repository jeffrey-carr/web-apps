<script lang="ts">
	import { availableBears } from '$lib/bears';
	import PixelBear from '$lib/PixelBear.svelte';
	
	export let choices: Record<string, any[]> = {
		northwest: [null, null, null],
		southwest: [null, null, null],
		northeast: [null, null, null],
		southeast: [null, null, null],
		finals: [null, null, null]
	};
	export let goldenBracket: any = null;
	export let editing = false;
	export let onSelect: (region: string, index: number, val: number) => void = () => {};

	let selectingFor: { region: string, index: number } | null = null;

	function openSelector(region: string, index: number) {
		if (!editing) return;
		selectingFor = { region, index };
	}

	function handleSelection(bearId: number) {
		if (selectingFor) {
			onSelect(selectingFor.region, selectingFor.index, bearId);
			selectingFor = null;
		}
	}

	function getChoice(choices: Record<string, any[]>, region: string, index: number) {
		return choices[region] && choices[region][index];
	}

	function getCorrectness(region: string, index: number, bear: any) {
		if (editing || !goldenBracket || !goldenBracket.choices || !bear) return '';
		const officialChoice = getChoice(goldenBracket.choices, region, index);
		if (!officialChoice || !officialChoice.id) return '';
		if (officialChoice.id === bear.id) return 'correct';
		return 'incorrect';
	}

	// 16 starting bears assigned sequentially to the 4 regions
	const startingBears: Record<string, any[]> = {
		northwest: [availableBears[0], availableBears[1], availableBears[2], availableBears[3]],
		southwest: [availableBears[4], availableBears[5], availableBears[6], availableBears[7]],
		northeast: [availableBears[8], availableBears[9], availableBears[10], availableBears[11]],
		southeast: [availableBears[12], availableBears[13], availableBears[14], availableBears[15]]
	};
	startingBears.finals = [...startingBears.northwest, ...startingBears.southwest, ...startingBears.northeast, ...startingBears.southeast];

	function getValidOptions(choices: Record<string, any[]>, region: string, index: number) {
		if (region === 'finals') {
			if (index === 0) return [choices.northwest?.[2], choices.southwest?.[2]].filter(Boolean);
			if (index === 1) return [choices.northeast?.[2], choices.southeast?.[2]].filter(Boolean);
			if (index === 2) return [choices.finals?.[0], choices.finals?.[1]].filter(Boolean);
		} else {
			if (index === 0) return [startingBears[region][0], startingBears[region][1]];
			if (index === 1) return [startingBears[region][2], startingBears[region][3]];
			if (index === 2) return [choices[region]?.[0], choices[region]?.[1]].filter(Boolean);
		}
		return [];
	}

	function isInvalid(choices: Record<string, any[]>, region: string, index: number) {
		const pick = choices[region]?.[index];
		if (!pick) return false;
		const validOptions = getValidOptions(choices, region, index);
		return !validOptions.find(b => b.id === pick.id);
	}

	function getBearName(b: any) {
		if (!b) return 'Pick Winner';
		return `Bear ${b.id}`;
	}
	function getBearNickname(b: any) {
		return b?.nickname || '';
	}
</script>

<div class="bracket-wrapper">
	<div class="bracket-container">
		<div class="bracket-side left-side">
			{#each ['northwest', 'southwest'] as region}
				<div class="quadrant">
				<!-- Starting Bears (Round 0) -->
				<div class="round r0">
					{#each [0, 1, 2, 3] as i}
						<div class="match starting-node">
							<div class="node static">
								{#if getBearNickname(startingBears[region][i])}
									<div class="bear-nickname">{getBearNickname(startingBears[region][i])}</div>
								{/if}
								<div class="bear-icon"><PixelBear id={startingBears[region][i]?.id} /></div>
								<div class="bear-name">{getBearName(startingBears[region][i])}</div>
							</div>
						</div>
					{/each}
				</div>
				<!-- Quarterfinals (Round 1) -->
				<div class="round r1">
					{#each [0, 1] as i}
						<div class="match">
							<div class="node" class:editing class:empty={!getChoice(choices, region, i)} class:invalid={isInvalid(choices, region, i)} on:click={() => openSelector(region, i)}>
								{#if getCorrectness(region, i, getChoice(choices, region, i)) === 'correct'}
									<div class="correctness-icon correct">✅</div>
								{:else if getCorrectness(region, i, getChoice(choices, region, i)) === 'incorrect'}
									<div class="correctness-icon incorrect">❌</div>
								{/if}
								{#if getBearNickname(getChoice(choices, region, i))}
									<div class="bear-nickname">{getBearNickname(getChoice(choices, region, i))}</div>
								{/if}
								<div class="bear-icon"><PixelBear id={getChoice(choices, region, i)?.id} /></div>
								<div class="bear-name">{getBearName(getChoice(choices, region, i))}</div>
							</div>
						</div>
					{/each}
				</div>
				<!-- Semifinals (Round 2) -->
				<div class="round r2">
					<div class="match">
						<div class="node" class:editing class:empty={!getChoice(choices, region, 2)} class:invalid={isInvalid(choices, region, 2)} on:click={() => openSelector(region, 2)}>
								{#if getCorrectness(region, 2, getChoice(choices, region, 2)) === 'correct'}
									<div class="correctness-icon correct">✅</div>
								{:else if getCorrectness(region, 2, getChoice(choices, region, 2)) === 'incorrect'}
									<div class="correctness-icon incorrect">❌</div>
								{/if}
							{#if getBearNickname(getChoice(choices, region, 2))}
									<div class="bear-nickname">{getBearNickname(getChoice(choices, region, 2))}</div>
								{/if}
								<div class="bear-icon"><PixelBear id={getChoice(choices, region, 2)?.id} /></div>
								<div class="bear-name">{getBearName(getChoice(choices, region, 2))}</div>
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>

	<div class="bracket-center">
		<div class="quadrant finals-quad">
			<!-- Left side champ -->
			<div class="round r3">
				<div class="match">
					<div class="node" class:editing class:empty={!getChoice(choices, 'finals', 0)} class:invalid={isInvalid(choices, 'finals', 0)} on:click={() => openSelector('finals', 0)}>
								{#if getCorrectness('finals', 0, getChoice(choices, 'finals', 0)) === 'correct'}
									<div class="correctness-icon correct">✅</div>
								{:else if getCorrectness('finals', 0, getChoice(choices, 'finals', 0)) === 'incorrect'}
									<div class="correctness-icon incorrect">❌</div>
								{/if}
						{#if getBearNickname(getChoice(choices, 'finals', 0))}
									<div class="bear-nickname">{getBearNickname(getChoice(choices, 'finals', 0))}</div>
								{/if}
								<div class="bear-icon"><PixelBear id={getChoice(choices, 'finals', 0)?.id} /></div>
								<div class="bear-name">{getBearName(getChoice(choices, 'finals', 0))}</div>
					</div>
				</div>
			</div>
			
			<!-- Champion -->
			<div class="round r4" style="align-items: center;">
				<div class="match" style="position: relative; display: flex; flex-direction: column; align-items: center;">
					<div class="center-trophy" style="position: absolute; top: -3rem; font-size: 3rem; filter: drop-shadow(0 0 10px rgba(255, 215, 0, 0.5)); z-index: 10;">👑</div>
					<div class="node champ-node" style="transform: scale(1.2); border-color: #ffd700; background-color: #d4af37;" class:editing class:empty={!getChoice(choices, 'finals', 2)} class:invalid={isInvalid(choices, 'finals', 2)} on:click={() => openSelector('finals', 2)}>
								{#if getCorrectness('finals', 2, getChoice(choices, 'finals', 2)) === 'correct'}
									<div class="correctness-icon correct" style="top: -10px; right: -10px;">✅</div>
								{:else if getCorrectness('finals', 2, getChoice(choices, 'finals', 2)) === 'incorrect'}
									<div class="correctness-icon incorrect" style="top: -10px; right: -10px;">❌</div>
								{/if}
						{#if getBearNickname(getChoice(choices, 'finals', 2))}
									<div class="bear-nickname" style="color: #000;">{getBearNickname(getChoice(choices, 'finals', 2))}</div>
								{/if}
								<div class="bear-icon"><PixelBear id={getChoice(choices, 'finals', 2)?.id} /></div>
								<div class="bear-name" style="color: #000;">{getBearName(getChoice(choices, 'finals', 2))}</div>
					</div>
				</div>
			</div>

			<!-- Right side champ -->
			<div class="round r3">
				<div class="match">
					<div class="node" class:editing class:empty={!getChoice(choices, 'finals', 1)} class:invalid={isInvalid(choices, 'finals', 1)} on:click={() => openSelector('finals', 1)}>
								{#if getCorrectness('finals', 1, getChoice(choices, 'finals', 1)) === 'correct'}
									<div class="correctness-icon correct">✅</div>
								{:else if getCorrectness('finals', 1, getChoice(choices, 'finals', 1)) === 'incorrect'}
									<div class="correctness-icon incorrect">❌</div>
								{/if}
						{#if getBearNickname(getChoice(choices, 'finals', 1))}
									<div class="bear-nickname">{getBearNickname(getChoice(choices, 'finals', 1))}</div>
								{/if}
								<div class="bear-icon"><PixelBear id={getChoice(choices, 'finals', 1)?.id} /></div>
								<div class="bear-name">{getBearName(getChoice(choices, 'finals', 1))}</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="bracket-side right-side">
		{#each ['northeast', 'southeast'] as region}
			<div class="quadrant right-quad">
				<!-- Semifinals (Round 2) -->
				<div class="round r2">
					<div class="match">
						<div class="node" class:editing class:empty={!getChoice(choices, region, 2)} class:invalid={isInvalid(choices, region, 2)} on:click={() => openSelector(region, 2)}>
								{#if getCorrectness(region, 2, getChoice(choices, region, 2)) === 'correct'}
									<div class="correctness-icon correct">✅</div>
								{:else if getCorrectness(region, 2, getChoice(choices, region, 2)) === 'incorrect'}
									<div class="correctness-icon incorrect">❌</div>
								{/if}
							{#if getBearNickname(getChoice(choices, region, 2))}
									<div class="bear-nickname">{getBearNickname(getChoice(choices, region, 2))}</div>
								{/if}
								<div class="bear-icon"><PixelBear id={getChoice(choices, region, 2)?.id} /></div>
								<div class="bear-name">{getBearName(getChoice(choices, region, 2))}</div>
						</div>
					</div>
				</div>
				<!-- Quarterfinals (Round 1) -->
				<div class="round r1">
					{#each [0, 1] as i}
						<div class="match">
							<div class="node" class:editing class:empty={!getChoice(choices, region, i)} class:invalid={isInvalid(choices, region, i)} on:click={() => openSelector(region, i)}>
								{#if getCorrectness(region, i, getChoice(choices, region, i)) === 'correct'}
									<div class="correctness-icon correct">✅</div>
								{:else if getCorrectness(region, i, getChoice(choices, region, i)) === 'incorrect'}
									<div class="correctness-icon incorrect">❌</div>
								{/if}
								{#if getBearNickname(getChoice(choices, region, i))}
									<div class="bear-nickname">{getBearNickname(getChoice(choices, region, i))}</div>
								{/if}
								<div class="bear-icon"><PixelBear id={getChoice(choices, region, i)?.id} /></div>
								<div class="bear-name">{getBearName(getChoice(choices, region, i))}</div>
							</div>
						</div>
					{/each}
				</div>
				<!-- Starting Bears (Round 0) -->
				<div class="round r0">
					{#each [0, 1, 2, 3] as i}
						<div class="match starting-node">
							<div class="node static">
								{#if getBearNickname(startingBears[region][i])}
									<div class="bear-nickname">{getBearNickname(startingBears[region][i])}</div>
								{/if}
								<div class="bear-icon"><PixelBear id={startingBears[region][i]?.id} /></div>
								<div class="bear-name">{getBearName(startingBears[region][i])}</div>
							</div>
						</div>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</div>
</div>

{#if selectingFor}
	<div class="modal-overlay" on:click={() => selectingFor = null}>
		<div class="modal-content pixel-box" on:click|stopPropagation>
			<h3>Select a Bear</h3>
			<div class="bear-grid">
				<!-- Limit choices to the bears that can actually reach this slot -->
				{#each getValidOptions(choices, selectingFor.region, selectingFor.index) as b}
					<button class="pixel-button" on:click={() => handleSelection(b.id)} style="display: flex; flex-direction: column; align-items: center; padding: 0.5rem; line-height: 1.2;">
						<div style="width: 48px; height: 48px;"><PixelBear id={b.id} /></div>
						<span style="font-size: 0.8rem; margin-top: 0.5rem;">{getBearName(b)}</span>
					</button>
				{/each}
			</div>
			{#if getValidOptions(choices, selectingFor.region, selectingFor.index).length === 0}
				<div style="text-align: center; color: red; margin-top: 1rem; font-weight: bold;">
					Select the winners of the previous round first!
				</div>
			{/if}
			{#if getChoice(choices, selectingFor.region, selectingFor.index)}
				<button class="pixel-button" style="margin-top: 1.5rem; background: #e74c3c; width: 100%;" on:click={() => handleSelection(0)}>Clear Choice</button>
			{/if}
			<button class="pixel-button" style="margin-top: 0.5rem; background: #888; width: 100%;" on:click={() => selectingFor = null}>Cancel</button>
		</div>
	</div>
{/if}

<style>
	.bracket-wrapper {
		width: 100%;
		overflow-x: auto;
		-webkit-overflow-scrolling: touch;
		padding-bottom: 1rem;
		/* Hide scrollbar for a cleaner look but still allow scrolling */
		scrollbar-width: none;
		-ms-overflow-style: none;
	}
	@media (max-width: 1024px) {
		.bracket-wrapper {
			scroll-snap-type: x proximity;
		}
	}
	.bracket-wrapper::-webkit-scrollbar {
		display: none;
	}

	.bracket-container {
		display: flex;
		justify-content: space-between;
		align-items: stretch;
		background: #7ca873; /* A nice forest green */
		background-image: linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
		                  linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px);
		background-size: 20px 20px;
		padding: 2rem 1rem;
		border-radius: 8px;
		min-width: max-content;
		border: 4px solid #4a6644;
	}

	.bracket-side {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		flex: 1;
		gap: 2rem;
		scroll-snap-align: start;
	}

	.bracket-center {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 1rem;
		scroll-snap-align: center;
	}
	
	.right-side {
		scroll-snap-align: end;
	}

	.center-trophy {
		font-size: 5rem;
		text-shadow: 0 4px 0 rgba(0,0,0,0.2);
		filter: drop-shadow(0 0 10px rgba(255, 215, 0, 0.5));
	}

	.quadrant {
		display: flex;
		align-items: stretch;
		gap: 1.5rem;
	}

	.right-quad {
		justify-content: flex-end;
	}

	.round {
		display: flex;
		flex-direction: column;
		height: 100%;
		/* No gap, so match borders touch perfectly */
	}

	.match {
		display: flex;
		flex-direction: column;
		justify-content: center;
		position: relative;
		flex: 1; /* Stretch to fill round height */
	}

	/* Lines - Left Side */
	.left-side .quadrant .match::after, .left-side .quadrant .match::before,
	.right-side .quadrant .match::after, .right-side .quadrant .match::before,
	.finals-quad .match::after, .finals-quad .match::before {
		box-sizing: border-box;
	}

	/* Top of a pair (feeds down) */
	.left-side .quadrant .match:nth-child(odd):not(:last-child)::after {
		content: '';
		position: absolute;
		right: -0.75rem;
		width: 0.75rem;
		top: 50%;
		height: 50%;
		border-top: 2px solid #fff;
		border-right: 2px solid #fff;
		border-top-right-radius: 6px;
	}
	/* Bottom of a pair (feeds up) */
	.left-side .quadrant .match:nth-child(even)::after {
		content: '';
		position: absolute;
		right: -0.75rem;
		width: 0.75rem;
		bottom: 50%;
		height: 50%;
		border-bottom: 2px solid #fff;
		border-right: 2px solid #fff;
		border-bottom-right-radius: 6px;
	}
	/* Inward horizontal connecting lines */
	.left-side .quadrant .r1 .match::before,
	.left-side .quadrant .r2 .match::before {
		content: '';
		position: absolute;
		left: -0.75rem;
		width: 0.75rem;
		border-top: 2px solid #fff;
		top: 50%;
	}

	/* Lines - Right Side */
	/* Top of a pair (feeds down) */
	.right-side .quadrant .match:nth-child(odd):not(:last-child)::after {
		content: '';
		position: absolute;
		left: -0.75rem;
		width: 0.75rem;
		top: 50%;
		height: 50%;
		border-top: 2px solid #fff;
		border-left: 2px solid #fff;
		border-top-left-radius: 6px;
	}
	/* Bottom of a pair (feeds up) */
	.right-side .quadrant .match:nth-child(even)::after {
		content: '';
		position: absolute;
		left: -0.75rem;
		width: 0.75rem;
		bottom: 50%;
		height: 50%;
		border-bottom: 2px solid #fff;
		border-left: 2px solid #fff;
		border-bottom-left-radius: 6px;
	}
	/* Inward horizontal connecting lines */
	.right-side .quadrant .r1 .match::before,
	.right-side .quadrant .r2 .match::before {
		content: '';
		position: absolute;
		right: -0.75rem;
		width: 0.75rem;
		border-top: 2px solid #fff;
		top: 50%;
	}

	/* Finals Lines */
	.finals-quad .r3 .match::after {
		content: '';
		position: absolute;
		top: 50%;
		width: 0.75rem;
		border-top: 2px solid #fff;
	}
	.finals-quad .r3:first-child .match::after {
		right: -0.75rem;
	}
	.finals-quad .r3:last-child .match::after {
		left: -0.75rem;
	}

	.finals-quad .r4 .match::before,
	.finals-quad .r4 .match::after {
		content: '';
		position: absolute;
		width: 0.75rem;
		border-top: 2px solid #fff;
		top: 50%;
	}
	.finals-quad .r4 .match::before {
		left: -0.75rem;
	}
	.finals-quad .r4 .match::after {
		right: -0.75rem;
	}

	.correctness-icon {
		position: absolute;
		top: -8px;
		right: -8px;
		font-size: 1rem;
		filter: drop-shadow(0 2px 2px rgba(0,0,0,0.5));
		z-index: 5;
	}
	.node {
		position: relative;
		background: #d2322d;
		border: 3px solid #8e231e;
		padding: 0.25rem;
		border-radius: 6px;
		width: 105px;
		text-align: center;
		box-shadow: 2px 2px 0px rgba(0,0,0,0.3);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		color: white;
	}

	.node.static {
		background: #444;
		border-color: #222;
	}

	.node.empty {
		background: rgba(255,255,255,0.2);
		border: 3px dashed #fff;
		color: #fff;
		box-shadow: none;
	}

	.node.empty .bear-icon {
		opacity: 0.3;
	}

	.node.invalid {
		border-color: #ff0000;
		background: #ffa0a0;
		box-shadow: 0 0 10px rgba(255, 0, 0, 0.8);
		animation: shake 0.5s infinite alternate;
	}

	@keyframes shake {
		0% { transform: translateX(0); }
		100% { transform: translateX(2px); }
	}

	.bear-icon {
		width: 48px;
		height: 48px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(255,255,255,0.8);
		border-radius: 4px;
		margin-bottom: 4px;
		padding: 2px;
	}
	.node.empty .bear-icon {
		background: transparent;
	}

	.bear-nickname {
		font-weight: bold;
		font-size: 0.55rem;
		line-height: 1.1;
		width: 100%;
		white-space: normal;
		word-break: break-word;
		text-shadow: 1px 1px 0 #000;
		color: #ffd700;
		margin-bottom: 2px;
	}
	.bear-name {
		font-weight: bold;
		font-size: 0.65rem;
		line-height: 1.1;
		width: 100%;
		white-space: normal;
		word-break: break-word;
		text-shadow: 1px 1px 0 #000;
	}

	.node.editing {
		cursor: pointer;
		transition: transform 0.1s, border-color 0.1s;
	}

	.node.editing:hover {
		transform: scale(1.05);
		border-color: #ffd700;
	}

	.modal-overlay {
		position: fixed;
		top: 0; left: 0; right: 0; bottom: 0;
		background: rgba(0,0,0,0.6);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
	}

	.modal-content {
		max-width: 90%;
		width: 400px;
		max-height: 90vh;
		overflow-y: auto;
		background: #fff;
		padding: 2rem;
	}

	.bear-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
		margin-top: 1.5rem;
	}
</style>
