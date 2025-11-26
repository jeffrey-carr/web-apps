import { App, AUTH_COOKIE_NAME, backendGetUser } from '@jeffrey-carr/frontend-common';
import type { PageServerLoad } from './$types';
import { PUBLIC_ENVIRONMENT } from '$env/static/public';
import { error, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ cookies, fetch }) => {
  const cookieValue = cookies.get(AUTH_COOKIE_NAME);
  if (!cookieValue) {
    console.log("no cookie, redirecting");
    throw redirect(302, '/');
  }

  const user = await backendGetUser(PUBLIC_ENVIRONMENT, App.Federation, cookieValue, fetch);
  if (user == null) {
    throw redirect(302, "/");
  }

  if (!user.isAdmin) {
    throw error(403, "This page is for admins only");
  }

  return { user };
};
