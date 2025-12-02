// src/routes/admin/+page.server.ts
import { AUTH_COOKIE_NAME, makeRequest, METHODS } from '@jeffrey-carr/frontend-common';
import type { PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ cookies, fetch }) => {

  const cookieValue = cookies.get(AUTH_COOKIE_NAME);

  if (!cookieValue) {
    throw redirect(302, '/');
  }

  const additionalHeaders = {
    Cookie: `${AUTH_COOKIE_NAME}=${cookieValue}`,
  };

  let response: Response;
  try {
    response = await makeRequest(
      {
        path: 'http://federation_backend:9999/api/auth/authed-user',
        method: METHODS.GET,
      },
      { additionalHeaders },
      fetch
    );
  } catch (e) {
    throw redirect(302, '/');
  }

  if (response.status !== 200) {
    throw redirect(302, '/');
  }

  let user: any;
  try {
    user = await response.json();
  } catch (e) {
    throw redirect(302, '/');
  }

  if (!user) {
    throw redirect(302, '/');
  }

  if (!user.isAdmin) {
    throw error(403, 'This page is for admins only');
  }

  return { user };
};
