<script lang="ts">
    import { goto } from '$app/navigation';
  import { PUBLIC_ENVIRONMENT } from '$env/static/public';
  import { CreateAccountCard, LoginCard } from '$lib/components';
  import { buildAppURL, isValidEmail, isValidName, isValidPassword } from '$lib/utils';
  import { Apps, makeRequest, METHODS, Notification } from '@jeffrey-carr/frontend-common';
  import type {
    AuthRequest,
    RouteQuery,
    makeRequestParams,
    RouteInformation,
    Character,
  } from '@jeffrey-carr/frontend-common';

  let { data }: { data: RouteQuery } = $props();

  let errorNotif = $state<{ title?: string; message: string }>();
  let showCreate = $state(false);
  let pop = $state(false);
  let containerClass = $derived(`container ${pop ? 'pop' : ''}`);

  $effect(() => {
    if (data.app == null) {
      goto('/choose-app');
      return;
    }
  });

  const toggleCreate = () => {
    showCreate = !showCreate;
    pop = true;
    setTimeout(() => {
      pop = false;
    }, 201); // hacky
  };

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

    await response.json();
    const url = await buildRerouteURL();
    window.location.assign(url);
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

    await response.json();
    const url = await buildRerouteURL(); 
    window.location.assign(url);
    return true;
  };

  const buildRerouteURL = async (): Promise<string> => {
    if (!data.app) return "";

    let route = buildAppURL(PUBLIC_ENVIRONMENT, Apps[data.app]);
    
    console.log(PUBLIC_ENVIRONMENT);
    console.log(route);
    await new Promise((resolve, _) => setTimeout(resolve, 5000));

    let path = `/${data.path ?? ''}`;
    if (path.length > 1) {
      route = `${route}${path}`;
    }

    return route;
  };
</script>

<main class="main">
  <div class={containerClass}>
    {#if showCreate}
      <CreateAccountCard createAccount={create} backToLogin={toggleCreate} />
    {:else}
      <LoginCard {login} switchToCreate={toggleCreate} />
    {/if}
  </div>

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

    height: 100%;
  }

  .container {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    position: relative;

    border: 1px solid var(--app-theme-primary);
    border-radius: 5px;

    padding: 2rem;
  }

  .pop {
    animation: pop 200ms linear;
  }

  @keyframes pop {
    0% {
      transform: scale(1);
    }
    33% {
      transform: scale(0.9);
    }
    66% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
</style>
