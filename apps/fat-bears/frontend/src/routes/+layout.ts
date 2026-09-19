import type { LayoutLoad } from './$types';

export const ssr = false;
export const prerender = false;

export const load: LayoutLoad = async ({ fetch }) => {
	const tournamentsRes = await fetch('/api/user/tournaments');
	let tournaments = [];
	if (tournamentsRes.ok) {
		const json = await tournamentsRes.json();
		tournaments = json?.data || json || [];
	}

	const bracketsRes = await fetch('/api/user/brackets');
	let brackets = [];
	if (bracketsRes.ok) {
		const json = await bracketsRes.json();
		brackets = json?.data || json || [];
	}

	return {
		tournaments,
		brackets
	};
};
