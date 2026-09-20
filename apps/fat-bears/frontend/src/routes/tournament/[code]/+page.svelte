<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import type { PageData } from './$types';
	import { notificationQueue } from '$lib/notifications.svelte';
	import { CharacterIcon, ConfirmModal, getUser, App, type User } from '@jeffrey-carr/frontend-common';
	import BracketView from '$lib/BracketView.svelte';
	import { PUBLIC_ENVIRONMENT } from '$env/static/public';
	import { onMount } from 'svelte';
	import { availableBears } from '$lib/bears';

	export let data: PageData;
	$: isTournamentLocked = (() => {
		if (!data.goldenBracket || !data.goldenBracket.choices) return false;
		const gChoices = data.goldenBracket.choices;
		for (const region in gChoices) {
			if (Array.isArray(gChoices[region])) {
				if (gChoices[region].some((c: any) => c && c.id > 0)) {
					return true;
				}
			}
		}
		return false;
	})();

	$: tournament = data.tournament;
	$: userBracket = data.userBracket;
	
	let user = null as User | null;
	onMount(async () => {
		try {
			user = await getUser(PUBLIC_ENVIRONMENT, App.FatBears);
		} catch(e) {}
	});

	$: canEdit = user && tournament.ownerUUID === user.uuid;

	// The bracket currently displayed in the view area
	let viewingBracket: any = null;
	// Keep track of edited choices for the user's bracket
	let editChoices: any = null;
	let isDirty = false;

	$: if (!viewingBracket && userBracket) {
		viewingBracket = userBracket;
		editChoices = JSON.parse(JSON.stringify(userBracket.choices));
		if (!editChoices.finals) editChoices.finals = [null, null, null];
		isDirty = false;
	}

	function viewScoreboardBracket(b: any) {
		viewingBracket = b;
		if (userBracket && b.uuid === userBracket.uuid) {
			editChoices = JSON.parse(JSON.stringify(userBracket.choices));
			if (!editChoices.finals) editChoices.finals = [null, null, null];
			isDirty = false;
		}
	}

	function handleSelect(region: string, index: number, val: number) {
		if (!userBracket || viewingBracket?.uuid !== userBracket.uuid) return;
		
		const typedRegion = region;
		if (val === 0) {
			editChoices[typedRegion][index] = null;
			editChoices = { ...editChoices };
			isDirty = true;
			return;
		}
		const bear = availableBears.find((b: any) => b.id === val);
		if (bear) {
			editChoices[typedRegion][index] = { id: bear.id, nickname: bear.nickname };
			editChoices = { ...editChoices };
			isDirty = true;
		}
	}

	import { mapToTree } from '$lib/treeAdapter';

	function resetBracket() {
		if (userBracket) {
			editChoices = JSON.parse(JSON.stringify(userBracket.choices));
			if (!editChoices.finals) editChoices.finals = [null, null, null];
			isDirty = false;
		}
	}

	let saving = false;
	async function saveBracket() {
		saving = true;
		try {
			const res = await fetch(`/api/bracket/${userBracket.uuid}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					title: userBracket.title,
					choices: mapToTree(editChoices)
				})
			});
			if (res.ok) {
				notificationQueue.push({ level: 'success', title: 'Saved!', message: 'Bracket updated.' });
				isDirty = false;
				invalidateAll();
			} else {
				notificationQueue.push({ level: 'error', title: 'Error', message: 'Failed to save bracket' });
			}
		} catch (e) {
			notificationQueue.push({ level: 'error', title: 'Error', message: 'Error saving bracket' });
		}
		saving = false;
	}

	function copyToClipboard(text: string) {
		if (navigator.clipboard && window.isSecureContext) {
			navigator.clipboard.writeText(text).then(() => { notificationQueue.push({ level: 'success', title: 'Copied!', message: 'Tournament code copied to clipboard.'}); });
		} else {
			const textArea = document.createElement("textarea");
			textArea.value = text;
			textArea.style.position = "fixed";
			textArea.style.left = "-999999px";
			document.body.appendChild(textArea);
			textArea.focus();
			textArea.select();
			try {
				document.execCommand('copy');
				notificationQueue.push({ level: 'success', title: 'Copied!', message: 'Tournament code copied to clipboard.'});
			} catch (err) {
				notificationQueue.push({ level: 'error', title: 'Error', message: 'Failed to copy text'});
			}
			textArea.remove();
		}
	}

	let showConfirmModal = false;
	let confirmModalTitle = "";
	let confirmModalMessage = "";
	let confirmModalAction: (() => Promise<void>) | null = null;

	function promptConfirm(title: string, message: string, action: () => Promise<void>) {
		confirmModalTitle = title;
		confirmModalMessage = message;
		confirmModalAction = action;
		showConfirmModal = true;
	}

	function performDelete() {
		promptConfirm("Delete Tournament?", "Are you sure you want to permanently delete this tournament? This cannot be undone.", async () => {
			try {
				const res = await fetch(`/api/tournament/${tournament.joinCode}`, { method: 'DELETE' });
				if (res.ok) {
					goto('/tournaments', { invalidateAll: true });
				} else {
					notificationQueue.push({ level: 'error', title: 'Error', message: 'Failed to delete tournament'});
				}
			} catch (e) {
				notificationQueue.push({ level: 'error', title: 'Error', message: 'Error deleting tournament'});
			}
		});
	}

	function performDeleteBracket(bracketUUID: string, isKick = false) {
		const msg = isKick ? "Are you sure you want to kick this user? Their bracket will be permanently deleted." : "Are you sure you want to leave this tournament? Your bracket will be permanently deleted.";
		const title = isKick ? "Kick User?" : "Leave Tournament?";
		promptConfirm(title, msg, async () => {
			try {
				const res = await fetch(`/api/bracket/${bracketUUID}`, { method: 'DELETE' });
				if (res.ok) {
					notificationQueue.push({ level: 'success', title: 'Success', message: isKick ? 'User kicked successfully.' : 'You have left the tournament.' });
					if (!isKick) {
						goto('/tournaments', { invalidateAll: true });
					} else {
						if (viewingBracket?.uuid === bracketUUID) {
							viewingBracket = userBracket?.uuid !== bracketUUID ? userBracket : null;
						}
						invalidateAll();
					}
				} else {
					notificationQueue.push({ level: 'error', title: 'Error', message: 'Failed to delete bracket'});
				}
			} catch (e) {
				notificationQueue.push({ level: 'error', title: 'Error', message: 'Error deleting bracket'});
			}
		});
	}
	
</script>

<div style="max-width: 900px; margin: 0 auto; padding: 2rem;">
	<div class="pixel-box" style="margin-bottom: 2rem; display: flex; flex-direction: column; gap: 1rem;">
		<div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem;">
			<h2 style="margin: 0; font-size: 2rem; flex: 1; min-width: 0; word-break: break-word;">{tournament.title}</h2>
			<div style="text-align: right; flex-shrink: 0;">
				<div style="font-weight: bold; font-size: 1.2rem; color: var(--primary-color); word-break: break-all;">Code: {tournament.joinCode}</div>
				<button class="pixel-button" style="font-size: 0.7rem; padding: 0.25rem 0.5rem; margin-top: 0.25rem;" on:click={() => copyToClipboard(tournament.joinCode)}>Copy Code</button>
			</div>
		</div>
		{#if tournament.ownerFName}
			<p style="margin: 0; font-size: 0.9rem; font-style: italic;">Hosted by {tournament.ownerFName} {tournament.ownerLName.charAt(0)}.</p>
		{/if}
		
		{#if canEdit || userBracket}
			<div style="margin-top: 0.5rem; display: flex; gap: 0.5rem; flex-wrap: wrap;">
				{#if canEdit}
					<button class="pixel-button" style="background-color: #f44336; font-size: 0.8rem; padding: 0.5rem 1rem;" on:click={performDelete}>Delete Tournament</button>
				{/if}
				{#if userBracket}
					<button class="pixel-button" style="background-color: #f44336; font-size: 0.8rem; padding: 0.5rem 1rem;" on:click={() => performDeleteBracket(userBracket.uuid, false)}>Leave Tournament</button>
				{/if}
			</div>
		{/if}
	</div>

	<div class="pixel-box" style="margin-bottom: 2rem;">
		<h3 style="margin-top: 0; margin-bottom: 1.5rem; color: var(--primary-color); font-size: 1.5rem;">Scoreboard</h3>
		{#if data.scoreboard && data.scoreboard.length > 0}
			<div style="overflow-x: auto;">
				<table style="width: 100%; border-collapse: collapse; text-align: left;">
					<thead>
						<tr style="background-color: var(--primary-color); color: #fff;">
							<th style="padding: 1rem; border-bottom: 2px solid var(--box-border);">Rank</th>
							<th style="padding: 1rem; border-bottom: 2px solid var(--box-border);">User</th>
							<th style="padding: 1rem; border-bottom: 2px solid var(--box-border);">Bracket</th>
							<th style="padding: 1rem; border-bottom: 2px solid var(--box-border); text-align: right;">Score</th>
							{#if canEdit}
								<th style="padding: 1rem; border-bottom: 2px solid var(--box-border); text-align: center;">Actions</th>
							{/if}
						</tr>
					</thead>
					<tbody>
						{#each data.scoreboard as b, i}
							<tr style="border-bottom: 1px solid var(--box-border); cursor: pointer; transition: background-color 0.2s;" class:highlight={viewingBracket && viewingBracket.uuid === b.uuid} on:click={() => viewScoreboardBracket(b)} on:mouseover={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.05)'} on:mouseout={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
								<td style="padding: 1rem; font-weight: bold;">#{i + 1}</td>
								<td style="padding: 1rem;">
									{#if b.userFName}
										<div style="display: flex; align-items: center; gap: 0.75rem;">
											<div style="width: 32px; height: 32px; border: 2px solid var(--primary-color); border-radius: 50%; overflow: hidden; background: #fff; display: flex; align-items: center; justify-content: center;">
												<CharacterIcon character={b.userCharacter} />
											</div>
											<span style="font-weight: 500;">{b.userFName} {b.userLName.charAt(0)}.</span>
										</div>
									{:else}
										<span style="color: #666; font-style: italic;">Unknown User</span>
									{/if}
								</td>
								<td style="padding: 1rem;">{b.title}</td>
								<td style="padding: 1rem; text-align: right; font-weight: bold; font-size: 1.2rem; color: var(--primary-color);">{b.score || 0}</td>
								{#if canEdit}
									<td style="padding: 1rem; text-align: center;">
										{#if (!userBracket || b.uuid !== userBracket.uuid)}
											<button class="pixel-button" style="background-color: #f44336; font-size: 0.6rem; padding: 0.25rem 0.5rem;" on:click|stopPropagation={() => performDeleteBracket(b.uuid, true)}>Kick</button>
										{/if}
									</td>
								{/if}
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{:else}
			<p style="text-align: center; color: #666; font-style: italic; margin: 2rem 0;">No brackets submitted yet.</p>
		{/if}
	</div>

	<div id="bracket-view-section" class="pixel-box">
		{#if viewingBracket}
			<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
				<div>
					<h3 style="margin: 0; font-size: 1.5rem;">
						{#if userBracket && viewingBracket.uuid === userBracket.uuid}
							Your Bracket: {viewingBracket.title}
						{:else}
							{viewingBracket.userFName}'s Bracket: {viewingBracket.title}
						{/if}
					</h3>
					{#if userBracket && viewingBracket.uuid !== userBracket.uuid}
						<button class="pixel-button" style="font-size: 0.7rem; padding: 0.25rem 0.5rem; margin-top: 0.5rem; background-color: #888;" on:click={() => viewScoreboardBracket(userBracket)}>View My Bracket</button>
					{/if}
				</div>
				<div style="font-size: 1.2rem; font-weight: bold; color: var(--primary-color); text-align: right;">
					Score: {viewingBracket.score || 0}
					{#if userBracket && viewingBracket.uuid === userBracket.uuid && isDirty}
						<div style="margin-top: 0.5rem; display: flex; gap: 0.5rem; justify-content: flex-end;">
							<button class="pixel-button" style="background-color: #888; font-size: 0.8rem; padding: 0.5rem 1rem;" on:click={resetBracket} disabled={saving}>Cancel</button>
							<button class="pixel-button" style="background-color: #ff4500; font-size: 0.8rem; padding: 0.5rem 1rem;" on:click={saveBracket} disabled={saving}>{saving ? 'Saving...' : 'Save Changes'}</button>
						</div>
					{/if}
				</div>
			</div>
			
			{#if isTournamentLocked}
				<div style="background-color: #ffd700; color: #000; padding: 0.5rem; text-align: center; font-weight: bold; margin-bottom: 1rem; border-radius: 4px;">
					Tournament has started! Picks are locked.
				</div>
			{/if}

			<div style="margin-bottom: 2rem;">
				{#if userBracket && viewingBracket.uuid === userBracket.uuid}
					<BracketView choices={editChoices} goldenBracket={data.goldenBracket} editing={!isTournamentLocked} onSelect={handleSelect} />
				{:else}
					<BracketView choices={viewingBracket.choices} goldenBracket={data.goldenBracket} editing={false} />
				{/if}
			</div>
		{:else if !userBracket}
			<div style="text-align: center; padding: 2rem;">
				<h3 style="margin-top: 0; margin-bottom: 1rem;">You haven't joined yet!</h3>
				<button class="pixel-button" style="font-size: 1.5rem; padding: 1rem 3rem;" on:click={() => goto(`/join?code=${tournament.joinCode}`)}>Create Bracket</button>
			</div>
		{/if}
	</div>

	<div class="pixel-box" style="margin-top: 2rem; padding: 1.5rem;">
		<h3 style="margin-top: 0; font-size: 1.2rem; margin-bottom: 1rem;">How Scoring Works</h3>
		<p style="margin-bottom: 0.5rem; font-size: 0.9rem;">Points are awarded for correctly predicting the winner of each match. The point value doubles each round to reward long-term predictions:</p>
		<ul style="margin: 0; padding-left: 1.5rem; font-size: 0.9rem; display: flex; flex-direction: column; gap: 0.5rem;">
			<li><strong>Round 1 (8 matches):</strong> 1 point per correct pick <em>(8 points max)</em></li>
			<li><strong>Quarter-Finals (4 matches):</strong> 2 points per correct pick <em>(8 points max)</em></li>
			<li><strong>Semi-Finals (2 matches):</strong> 4 points per correct pick <em>(8 points max)</em></li>
			<li><strong>Final Champion (1 match):</strong> 8 points for correct pick <em>(8 points max)</em></li>
		</ul>
		<p style="margin-top: 1rem; margin-bottom: 0; font-weight: bold; text-align: right; color: var(--primary-color);">Total Possible Points: 32</p>
	</div>
</div>

<ConfirmModal
	bind:open={showConfirmModal}
	title={confirmModalTitle}
	onAccept={confirmModalAction}
>
	<p style="margin: 0;">{confirmModalMessage}</p>
</ConfirmModal>

<style>
	tr.highlight {
		background-color: rgba(138, 90, 51, 0.15) !important;
		border-left: 4px solid var(--primary-color);
	}
</style>
