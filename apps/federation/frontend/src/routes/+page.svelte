<script lang="ts">
  import { goto } from '$app/navigation';
  import { PUBLIC_ENVIRONMENT } from '$env/static/public';
  import { CreateAccountCard, LoginCard } from '$lib/components';
  import { buildAppURL } from '$lib/utils';
  import { Apps, Notification } from '@jeffrey-carr/frontend-common';
  import type { RouteQuery, Character } from '@jeffrey-carr/frontend-common';
  import styles from './page.module.scss';
  import clsx from 'clsx';
  import { createAccount, loginRequest } from '$lib/requests';

  let { data }: { data: RouteQuery } = $props();

  let errorNotif = $state<{ title?: string; message: string }>();
  let showCreate = $state(false);
  let pop = $state(false);

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

  const login = async (email: string, password: string): Promise<boolean> => {
    const err = await loginRequest({ email, password });
    if (err.length !== 0) {
      errorNotif = { title: 'Error logging in', message: err };
      return false;
    }

    window.location.assign(buildRerouteURL());
    return true;
  };

  const create = async (
    email: string,
    password: string,
    fName: string,
    lName: string,
    character: Character
  ): Promise<boolean> => {
    const err = await createAccount({ email, password, fName, lName, character });
    if (err.length !== 0) {
      errorNotif = { title: 'Error creating account', message: err };
      return false;
    }

    window.location.assign(buildRerouteURL());
    return true;
  };

  const buildRerouteURL = (): string => {
    if (!data.app) return '';

    let route = buildAppURL(PUBLIC_ENVIRONMENT, Apps[data.app]);

    let path = `/${data.path ?? ''}`;
    if (path.length > 1) {
      route = `${route}${path}`;
    }

    return route;
  };
</script>

<main class={styles.main}>
  <div class={clsx(styles.container, { [styles.pop]: pop })}>
    {#if showCreate}
      <CreateAccountCard query={data} createAccount={create} backToLogin={toggleCreate} />
    {:else}
      <LoginCard query={data} {login} switchToCreate={toggleCreate} />
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
