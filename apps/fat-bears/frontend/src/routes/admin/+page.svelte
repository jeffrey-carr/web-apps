<script lang="ts">
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import { getUser, App, type User } from '@jeffrey-carr/frontend-common';
	import { PUBLIC_ENVIRONMENT } from '$env/static/public';
	import { goto } from '$app/navigation';
	import { notificationQueue } from '$lib/notifications.svelte';
	import { availableBears } from '$lib/bears';
	import BracketView from '$lib/BracketView.svelte';
	import { mapToTree } from '$lib/treeAdapter';

	export let data: PageData;

	let updating = false;
	let user = null as User | null;
	let checkingAdmin = true;

	onMount(async () => {
		try {
			user = await getUser(PUBLIC_ENVIRONMENT, App.FatBears);
			if (!user || !user.isAdmin) {
				goto('/');
			}
		} catch (e) {
			goto('/');
		} finally {
			checkingAdmin = false;
		}
	});

	// Default choices for golden bracket init
	let goldenChoices: Record<string, any[]> = data.goldenBracket?.choices || {
		northwest: [null, null, null],
		northeast: [null, null, null],
		southwest: [null, null, null],
		southeast: [null, null, null],
		finals: [null, null, null]
	};

	async function updateGolden() {
		updating = true;
		
		// Clean up sparse arrays so length accurately reflects the progression
		const cleanedChoices: Record<string, any[]> = {};
		for (const region of ['northwest', 'northeast', 'southwest', 'southeast', 'finals']) {
			const typedRegion = region as keyof typeof goldenChoices;
			cleanedChoices[typedRegion] = (goldenChoices[typedRegion] || []).map(b => b ? { id: b.id, nickname: b.nickname || '', leftVotes: b.leftVotes || 0, rightVotes: b.rightVotes || 0 } : null);
		}

		try {
			const res = await fetch(`/api/admin/update-golden`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					choices: mapToTree(cleanedChoices)
				})
			});
			if (res.ok) {
				notificationQueue.push({ level: 'success', title: 'Success', message: 'Golden Bracket Updated!'});
			} else {
				notificationQueue.push({ level: 'error', title: 'Error', message: 'Failed to update golden bracket (are you an admin?)'});
			}
		} catch (e) {
			notificationQueue.push({ level: 'error', title: 'Error', message: 'Error updating golden bracket'});
		}
		updating = false;
	}

	function handleSelect(region: string, index: number, val: number, leftVotes?: number, rightVotes?: number) {
		const typedRegion = region as keyof typeof goldenChoices;
		if (val === 0) {
			if (goldenChoices[typedRegion]) {
				goldenChoices[typedRegion][index] = null;
				goldenChoices = { ...goldenChoices };
			}
			return;
		}
		const bear = availableBears.find(b => b.id === val);
		if (bear) {
			if (!goldenChoices[typedRegion]) goldenChoices[typedRegion] = [];
			goldenChoices[typedRegion][index] = { id: bear.id, nickname: bear.nickname, leftVotes, rightVotes };
			goldenChoices = { ...goldenChoices }; // Trigger Svelte reactivity
		}
	}
</script>

{#if checkingAdmin}
	<div style="text-align: center; margin-top: 2rem;">
		<h2>Checking permissions...</h2>
	</div>
{:else}
	<div class="pixel-box" style="max-width: 1400px; margin: 0 auto;">
		<h2 style="margin-top: 0;">👑 Admin: Update Golden Bracket</h2>
		<p>Set the correct winners as the tournament progresses.</p>

		<div style="margin-top: 2rem;">
			<BracketView choices={goldenChoices} editing={true} adminMode={true} onSelect={handleSelect} />
		</div>

		<div style="margin-top: 2rem; text-align: center;">
			<button class="pixel-button" style="background-color: #ff4500; font-size: 1.25rem; padding: 1rem 3rem;" on:click={updateGolden} disabled={updating}>
				{updating ? 'Updating...' : 'Save Golden Bracket'}
			</button>
		</div>
	</div>
{/if}
