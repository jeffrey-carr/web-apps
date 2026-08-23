import {
  makeRequest,
  METHODS,
  type RouteInformation,
  type User,
} from '@jeffrey-carr/frontend-common';
import { redirect } from '@sveltejs/kit';
import type { UserStats } from '$lib/types/stats.js';
import type { PageLoad } from './$types';

type LoadData = {
  user: User;
  stats: UserStats;
};

const meRouteInfo: RouteInformation = {
  path: '/api/user/me',
  method: METHODS.GET,
  credentials: 'required',
};

export const load: PageLoad = async ({ fetch }): Promise<LoadData> => {
  let userDataRawResponse: LoadData;
  try {
    userDataRawResponse = await makeRequest(meRouteInfo, undefined, fetch);
  } catch (e) {
    redirect(302, '/');
  }

  return userDataRawResponse;
};
