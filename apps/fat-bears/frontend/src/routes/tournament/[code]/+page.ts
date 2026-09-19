import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import { treeToMap } from '$lib/treeAdapter';

export const load: PageLoad = async ({ fetch, params }) => {
	const code = params.code;

	const res = await fetch(`/api/tournament/${code}`);
	if (!res.ok) {
		throw error(404, 'Tournament not found');
	}
	const json = await res.json();
	const tournament = json?.data || json;

	// Check if the user already has a bracket for this tournament
	const bracketsRes = await fetch('/api/user/brackets');
	let userBracket = null;
	if (bracketsRes.ok) {
		const bracketsJson = await bracketsRes.json();
		const brackets = bracketsJson?.data || bracketsJson || [];
		userBracket = brackets.find((b: any) => b.tournamentUUID === code);
		if (userBracket && userBracket.choices) {
			userBracket.choices = treeToMap(userBracket.choices);
		}
	}

	const allBracketsRes = await fetch(`/api/tournament/${code}/brackets`);
	let scoreboard = [];
	if (allBracketsRes.ok) {
		const scoreboardJson = await allBracketsRes.json();
		scoreboard = scoreboardJson?.data || scoreboardJson || [];
		scoreboard.forEach((b: any) => {
			if (b.choices) {
				b.choices = treeToMap(b.choices);
			}
		});
		scoreboard.sort((a: any, b: any) => (b.score || 0) - (a.score || 0));
	}

	const goldenRes = await fetch('/api/get-golden');
	let goldenBracket = null;
	if (goldenRes.ok) {
		const goldenJson = await goldenRes.json();
		goldenBracket = goldenJson?.data || goldenJson;
		if (goldenBracket && goldenBracket.choices) {
			goldenBracket.choices = treeToMap(goldenBracket.choices);
		}
	}

	return {
		tournament,
		userBracket,
		scoreboard,
		goldenBracket
	};
};
