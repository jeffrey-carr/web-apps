import type { LayoutLoad } from './$types';
import { browser } from '$app/environment';
import { PUBLIC_ENVIRONMENT } from '$env/static/public';
import { App, getAppURL, GlobalRoutes, type User } from '@jeffrey-carr/frontend-common';

export const prerender = true;

export const load: LayoutLoad = async ({ fetch }) => {
  if (!browser) return { user: null };

  const authRouteInfo = GlobalRoutes.AUTH; // should point to your JSON "whoami" endpoint
  const route = `${getAppURL(PUBLIC_ENVIRONMENT, App.Federation)}${authRouteInfo.path}`;

  try {
    const res = await fetch(route, {
      method: authRouteInfo.method,
      credentials: 'include', 
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!res.ok) {
      return { user: null };
    }

    const user = (await res.json()) as User;
    return { user };
  } catch (e) {
    return { user: null };
  }
};

