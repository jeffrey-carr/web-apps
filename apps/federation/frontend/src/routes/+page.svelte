<script lang="ts">
  import { PUBLIC_ENVIRONMENT } from '$env/static/public';
  import { AccountCard } from '$lib/components';
  import { buildAppURL, isValidEmail, isValidName, isValidPassword } from '$lib/utils';
  import { Apps, makeRequest, METHODS, Notification } from '@jeffrey-carr/frontend-common';
  import type {
    AuthRequest,
    RouteQuery,
    User,
    makeRequestParams,
    RouteInformation,
    Character,
  } from '@jeffrey-carr/frontend-common';

  let { data }: { data: RouteQuery } = $props();

  let errorNotif = $state<{ title?: string; message: string }>();

  const closeNotif = () => {
    errorNotif = undefined;
  };

  const authRoute: RouteInformation = {
    path: '/api/auth/login',
    method: METHODS.POST,
  };
  const login = async (email: string, password: string): Promise<boolean> => {
    email = email.trim();
    const emailErr = isValidEmail(email);
    if (emailErr.length > 0) {
      errorNotif = { title: 'Error', message: 'Email or password is incorrect' };
      return false;
    }

    password = password.trim();
    const passwordErr = isValidPassword(password);
    if (passwordErr.length > 0) {
      errorNotif = { title: 'Error', message: 'Email or password is incorrect' };
      return false;
    }

    const response = await makeRequest(authRoute, {
      body: {
        email,
        password,
      } as AuthRequest,
      credentials: true,
    } as makeRequestParams);
    if (response.status >= 500) {
      errorNotif = { title: 'Error', message: 'Error contacting server.' };
      return false;
    }
    if (response.status !== 200) {
      const errorMessage = await response.text();
      errorNotif = { title: 'Error', message: errorMessage };
      return false;
    }

    const user = await response.json();

    window.location.assign(buildRerouteURL());
    return true;
  };

  const createRoute: RouteInformation = {
    path: '/api/auth/create',
    method: METHODS.POST,
  };
  const create = async (
    email: string,
    password: string,
    fName: string,
    lName: string,
    character: Character
  ): Promise<boolean> => {
    email = email.trim();
    const emailErr = isValidEmail(email);
    if (emailErr.length > 0) {
      console.error(emailErr);
      return false;
    }

    password = password.trim();
    const passwordErr = isValidPassword(password);
    if (passwordErr.length > 0) {
      console.error(passwordErr);
      return false;
    }

    fName = fName.trim();
    const fNameErr = isValidName(fName);
    if (fNameErr.length > 0) {
      console.error(fNameErr);
      return false;
    }

    lName = lName.trim();
    const lNameErr = isValidName(lName);
    if (lNameErr.length > 0) {
      console.error(lNameErr);
      return false;
    }

    const response = await makeRequest(createRoute, {
      body: { email, password, fName, lName, character },
      credentials: true,
    } as makeRequestParams);

    if (response.status !== 200) {
      console.error('error creating user', response);
      return false;
    }

    const user: User = await response.json();

    window.location.assign(buildRerouteURL());
    return true;
  };

  const buildRerouteURL = (): string => {
    let route = buildAppURL(PUBLIC_ENVIRONMENT, Apps[data.app]);
    let path = `/${data.path ?? ''}`;
    if (path.length > 1) {
      route = `${route}${path}`;
    }

    return route;
  };
</script>

<main class="main">
  <AccountCard {login} createAccount={create} />

  {#if errorNotif}
    <Notification
      level="error"
      title={errorNotif?.title}
      message={errorNotif.message}
      close={closeNotif}
    />
  {/if}
</main>

<style lang="scss">
  .main {
    display: flex;
    justify-content: center;
    align-items: center;

    height: 100vh;
  }
</style>
