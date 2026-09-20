<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import type { PageData } from './$types';
	import { PUBLIC_ENVIRONMENT } from '$env/static/public';
	import { notificationQueue } from '$lib/notifications.svelte';

	export let data: PageData;

	let joinCode = '';
	let newTournamentTitle = '';
	let creating = false;

	function joinTournament() {
		if (!joinCode.trim()) return;
		goto(`/join?code=${joinCode}`);
	}

	async function createTournament() {
		if (!newTournamentTitle.trim()) return;
		creating = true;
		try {
			const res = await fetch('/api/tournament', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ title: newTournamentTitle })
			});
			if (res.ok) {
				const tournamentResp = await res.json();
				const tournament = tournamentResp?.data || tournamentResp;
				await invalidateAll();
				goto(`/tournament/${tournament.joinCode}`);
			} else {
				notificationQueue.push({ level: 'error', title: 'Error', message: 'Failed to create tournament'});
			}
		} catch (e) {
			notificationQueue.push({ level: 'error', title: 'Error', message: 'Error creating tournament'});
		}
		creating = false;
	}
</script>

<div style="display: flex; flex-direction: column; align-items: center; justify-content: flex-start; height: 100%; padding: 1rem; overflow-y: auto;">
	<div style="display: flex; gap: 1rem; width: 100%; max-width: 800px; flex-direction: column;">
		
		{#if data.tournaments && data.tournaments.length > 0}
			<div class="pixel-box" style="padding: 1rem;">
				<h2 style="font-size: 1.5rem; margin-bottom: 1.5rem; text-align: center;">My Tournaments</h2>
				<div style="display: flex; flex-direction: column; gap: 1rem;">
					{#each data.tournaments as tournament}
						<div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: var(--bg-color); border: 2px solid var(--box-border); border-radius: 4px; gap: 1rem;">
							<div style="flex: 1; min-width: 0;">
								<div style="font-weight: bold; font-size: 1.2rem; word-break: break-word;">{tournament.title}</div>
								<div style="font-size: 0.8rem; color: #aaa; word-break: break-all;">Code: {tournament.joinCode}</div>
							</div>
							<a href="/tournament/{tournament.joinCode}" class="pixel-button" style="text-decoration: none; flex-shrink: 0;">View</a>
						</div>
					{/each}
				</div>
			</div>
		{/if}

		<div style="display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center;">
			<div class="pixel-box" style="text-align: center; padding: 1rem; flex: 1 1 100%;">
				<h2 style="font-size: 1.5rem; margin-bottom: 1.5rem;">Join a Tournament</h2>
				<input type="text" class="pixel-input" bind:value={joinCode} placeholder="Enter Join Code" style="font-size: 1rem; padding: 0.75rem; text-align: center; margin-bottom: 1rem; width: 100%; box-sizing: border-box;" />
				<button class="pixel-button" on:click={joinTournament} style="font-size: 1rem; padding: 0.75rem 1.5rem; width: 100%;">
					Enter
				</button>
			</div>

			<div class="pixel-box" style="text-align: center; padding: 1rem; flex: 1 1 100%;">
				<h3 style="font-size: 1.5rem; margin-bottom: 1.5rem;">Or create your own!</h3>
				<input type="text" class="pixel-input" bind:value={newTournamentTitle} placeholder="Tournament Title" style="font-size: 1rem; padding: 0.75rem; text-align: center; margin-bottom: 1rem; width: 100%; box-sizing: border-box;" />
				<button class="pixel-button" on:click={createTournament} disabled={creating} style="font-size: 1rem; padding: 0.75rem 1.5rem; width: 100%;">
					{creating ? 'Creating...' : 'Create Tournament'}
				</button>
			</div>
		</div>
		
	</div>
</div>
