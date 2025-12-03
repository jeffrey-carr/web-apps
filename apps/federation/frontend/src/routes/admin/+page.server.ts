import { AUTH_COOKIE_NAME, makeRequest, METHODS, prodEnvironment, type User } from '@jeffrey-carr/frontend-common';
import type { PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';
import { PUBLIC_ENVIRONMENT } from '$env/static/public';

export const load: PageServerLoad = async ({ cookies, fetch }) => {

  const cookieValue = cookies.get(AUTH_COOKIE_NAME);

  if (!cookieValue) {
    throw redirect(302, '/');
  }

  const additionalHeaders = {
    Cookie: `${AUTH_COOKIE_NAME}=${cookieValue}`,
  };

  let path = "http://login.jeffreycarr.local";
  if (PUBLIC_ENVIRONMENT === prodEnvironment) {
    path = "http://federation_backend";
  }
  path = `${path}:9999/api/auth/authed-user`;
  const method = METHODS.GET;

  let user: User;
  try {
    user = await makeRequest(
      { path, method },
      { additionalHeaders },
      fetch,
    );
  } catch (e) {
    throw redirect(302, '/');
  }

  if (!user.isAdmin) {
    throw error(403, 'This page is for admins only');
  }

  return { user };
};
