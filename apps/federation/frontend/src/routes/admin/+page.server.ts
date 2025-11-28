import { AUTH_COOKIE_NAME } from '@jeffrey-carr/frontend-common';
import type { PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';
import { authRouteBackend } from '$lib/requests';

export const load: PageServerLoad = async ({ cookies, fetch }) => {
  const cookieValue = cookies.get(AUTH_COOKIE_NAME);
  if (!cookieValue) {
    console.log("no cookie, redirecting");
    throw redirect(302, '/');
  }

  const user = await authRouteBackend(cookieValue, fetch);
  if (user == null) {
    throw redirect(302, "/");
  }

  if (!user.isAdmin) {
    throw error(403, "This page is for admins only");
  }

  return { user };
};
