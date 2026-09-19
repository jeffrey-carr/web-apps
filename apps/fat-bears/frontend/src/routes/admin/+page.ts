import type { PageLoad } from './$types';
import { treeToMap } from '$lib/treeAdapter';

export const load: PageLoad = async ({ fetch }) => {
	const res = await fetch('/api/get-golden');
	let goldenBracket = null;
	if (res.ok) {
		const json = await res.json();
		goldenBracket = json?.data || json;
		if (goldenBracket && goldenBracket.choices) {
			goldenBracket.choices = treeToMap(goldenBracket.choices);
		}
	}
	return { goldenBracket };
};
