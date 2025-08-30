import { PUBLIC_ENVIRONMENT } from '$env/static/public';
import {
  App,
  AUTH_COOKIE_NAME,
  getAppURL,
  GlobalRoutes,
  type User,
} from '@jeffrey-carr/frontend-common';
import type { ServerLoadEvent } from '@sveltejs/kit';

export const load = async ({ cookies, fetch }: ServerLoadEvent) => {
  const sessionCookie = cookies.get(AUTH_COOKIE_NAME);

  if (!sessionCookie) {
    return { user: null };
  }

  let user: User | null = null;
  const authRouteInfo = GlobalRoutes.AUTH;
  const route = `${getAppURL(PUBLIC_ENVIRONMENT, App.Federation)}${authRouteInfo.path}`;
  try {
    const response = await fetch(route, {
      method: authRouteInfo.method,
      headers: {
        'Content-Type': 'application/json',
        'cookie': `${AUTH_COOKIE_NAME}=${sessionCookie}`,
      },
    });
    console.log(response);
    if (!response.ok) {
      console.error('error logging user in');
      return { user: null };
    }

    user = await response.json();
  } catch (e: unknown) {
    console.error('there was an error');
    console.error(e);
    return { user: null };
  }

  return { user };
};
