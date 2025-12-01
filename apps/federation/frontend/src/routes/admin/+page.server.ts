import { App, AUTH_COOKIE_NAME, backendGetUser, makeRequest, METHODS } from '@jeffrey-carr/frontend-common';
import type { PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';
import { PUBLIC_ENVIRONMENT } from '$env/static/public';

export const load: PageServerLoad = async ({ cookies, fetch }) => {
  const cookieValue = cookies.get(AUTH_COOKIE_NAME);
  if (!cookieValue) {
    console.log("no cookie, redirecting");
    throw redirect(302, '/');
  }

  // TODO - don't hardcode this
  const additionalHeaders = {
      cookie: `${AUTH_COOKIE_NAME}=${cookieValue}`,
  }
  const response = await makeRequest({
    path: 'http://federation_backend:9999/api/auth/authed-user',
    method: METHODS.GET,
  }, { additionalHeaders }, fetch);
  if (response.status !== 200) {
    console.error(response);
    throw redirect(302, "/");
  }

  const user = await response.json();
  // const user = await backendGetUser(PUBLIC_ENVIRONMENT, App.Federation, cookieValue, fetch);
  if (user == null) {
    throw redirect(302, "/");
  }

  if (!user.isAdmin) {
    throw error(403, "This page is for admins only");
  }

  return { user };
};
