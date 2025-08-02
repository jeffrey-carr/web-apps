import { AUTH_COOKIE_NAME, getAppURL, type User } from '@jeffrey-carr/frontend-common'

export const load = async ({ cookies, fetch }) => {
  const sessionCookie = cookies.get(AUTH_COOKIE_NAME);
  
  if (!sessionCookie) {
    return { user: null };
  }
  
  let user: User | null = null;
  try {
    const response = await fetch('http://login.jeffreycarr.dev:5175/api/auth', { credentials: 'include'});
    if (!response.ok) {
      throw Error("not logged in");
    }
    
    user = await response.json();
  } catch {
    user = null;
  }

    return { user };
}