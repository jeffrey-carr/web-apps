<script lang="ts">
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { notificationQueue } from '$lib/notifications.svelte';
	import { availableBears } from '$lib/bears';
	import BracketView from '$lib/BracketView.svelte';

	export let data: PageData;

	let joinCode = page.url.searchParams.get('code') || '';
	let bracketTitle = '';
	let joining = false;

	let newChoices: Record<string, any[]> = {
		northwest: [null, null, null],
		southwest: [null, null, null],
		northeast: [null, null, null],
		southeast: [null, null, null],
		finals: [null, null, null]
	};

	import { mapToTree } from '$lib/treeAdapter';

	async function submitBracket() {
		if (!bracketTitle.trim()) {
			notificationQueue.push({ level: 'error', title: 'Error', message: 'Please provide a title' });
			return;
		}
		if (!joinCode) {
			notificationQueue.push({ level: 'error', title: 'Error', message: 'Missing join code' });
			return;
		}

		joining = true;
		try {
			const res = await fetch(`/api/tournament/${joinCode}/join`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					title: bracketTitle,
					choices: mapToTree(newChoices)
				})
			});
			if (res.ok) {
				goto(`/tournament/${joinCode}`);
			} else {
				const errJson = await res.json().catch(() => null);
				notificationQueue.push({ level: 'error', title: 'Failed to join', message: errJson?.message || 'Unknown error' });
			}
		} catch (e) {
			notificationQueue.push({ level: 'error', title: 'Error', message: 'Network error joining tournament' });
		}
		joining = false;
	}

	function handleSelect(region: string, index: number, val: number) {
		const typedRegion = region as keyof typeof newChoices;
		const bear = availableBears.find((b: any) => b.id === val);
		if (bear) {
			newChoices[typedRegion][index] = { id: bear.id, nickname: bear.nickname };
			newChoices = { ...newChoices }; // Trigger Svelte reactivity
		}
	}
</script>

<div style="max-width: 800px; margin: 0 auto; padding: 2rem;">
	<div class="pixel-box" style="margin-bottom: 2rem;">
		<h2>Create Your Bracket</h2>
		<p>Tournament Code: <strong>{joinCode}</strong></p>
		
		<div style="margin-top: 1.5rem;">
			<label style="display: block; font-weight: bold; margin-bottom: 0.5rem;">Bracket Title</label>
			<input type="text" class="pixel-input" bind:value={bracketTitle} placeholder="My Awesome Bracket" />
		</div>
	</div>

	<div style="margin-top: 2rem;">
		<BracketView choices={newChoices} editing={true} onSelect={handleSelect} />
	</div>

	<div style="text-align: center; margin-top: 2rem;">
		<button class="pixel-button" on:click={submitBracket} disabled={joining} style="font-size: 1.25rem; padding: 1rem 3rem;">
			{joining ? 'Submitting...' : 'Join Tournament'}
		</button>
	</div>
</div>
