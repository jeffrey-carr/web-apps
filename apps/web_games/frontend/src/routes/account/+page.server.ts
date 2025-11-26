import { makeRequest, METHODS, type RouteInformation, type User } from '@jeffrey-carr/frontend-common';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types.js';
import type { GetUserResponse } from '$lib/types/index.js';
import type { UserStats } from '$lib/types/stats.js';

const meRouteInfo: RouteInformation = {
  path: '/api/user/me',
  method: METHODS.GET,
  credentials: 'required',
};

export const load: PageServerLoad = async ({ fetch }): Promise<{ user: User; stats: UserStats}>  => {
  const userDataRawResponse = await makeRequest(meRouteInfo, undefined, fetch);
  if (userDataRawResponse.status >= 300 && userDataRawResponse.status < 400) {
    // FIXME: this ain't right, but I don't feel like fixing it
    redirect(userDataRawResponse.status, '/');
  }
  if (userDataRawResponse.status === 400) {
    redirect(401, '/');
  }
  if (userDataRawResponse.status !== 200) {
    error(userDataRawResponse.status, '/');
  }

  const response: GetUserResponse = await userDataRawResponse.json();
  return { user: response.user, stats: response.stats };
};
