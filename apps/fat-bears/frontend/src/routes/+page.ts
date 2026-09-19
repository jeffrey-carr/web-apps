import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent }) => {
	const data = await parent();
	if (data.tournaments && data.tournaments.length > 0) {
		throw redirect(302, `/tournament/${data.tournaments[0].joinCode}`);
	}
	throw redirect(302, '/tournaments');
};
