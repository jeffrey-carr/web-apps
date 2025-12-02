// src/routes/admin/+page.server.ts
import { AUTH_COOKIE_NAME, makeRequest, METHODS } from '@jeffrey-carr/frontend-common';
import type { PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ cookies, fetch }) => {
  console.log('=== [ADMIN] SERVER LOAD HIT ===');

  const cookieValue = cookies.get(AUTH_COOKIE_NAME);
  console.log('[ADMIN] cookie value:', cookieValue);

  if (!cookieValue) {
    console.log('[ADMIN] no cookie, redirecting to /');
    throw redirect(302, '/');
  }

  const additionalHeaders = {
    Cookie: `${AUTH_COOKIE_NAME}=${cookieValue}`,
  };

  console.log('[ADMIN] calling federation_backend /api/auth/authed-user');

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
    console.error('[ADMIN] error calling authed-user:', e);
    throw redirect(302, '/');
  }

  console.log('[ADMIN] authed-user status:', (response as any)?.status);

  if (response.status !== 200) {
    console.error('[ADMIN] Non-200 from authed-user:', response.status);
    const responseJSON = await response.json();
    console.log(responseJSON);
    throw redirect(302, '/');
  }

  let user: any;
  try {
    user = await response.json();
  } catch (e) {
    console.error('[ADMIN] error parsing user JSON:', e);
    throw redirect(302, '/');
  }

  console.log('[ADMIN] user from backend:', user);

  if (!user) {
    console.log('[ADMIN] user is null, redirecting to /');
    throw redirect(302, '/');
  }

  if (!user.isAdmin) {
    console.log('[ADMIN] user is not admin, throwing 403');
    throw error(403, 'This page is for admins only');
  }

  console.log('[ADMIN] load success, returning user');
  return { user };
};
