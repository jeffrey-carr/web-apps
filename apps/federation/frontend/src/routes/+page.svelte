<script lang="ts">
  import { CreateAccountCard, LoginCard } from '$lib/components';
  import { buildRerouteURL } from '$lib/utils';
  import { Notification, ServerError } from '@jeffrey-carr/frontend-common';
  import type { RouteQuery, Character } from '@jeffrey-carr/frontend-common';
  import styles from './page.module.scss';
  import clsx from 'clsx';
  import { createAccount, loginRequest } from '$lib/requests';
  import { goto } from '$app/navigation';
  import { notificationQueue } from '$lib/globals/notifications.svelte';
  import { userState } from '$lib/globals/user.svelte';

  let { data }: { data: RouteQuery } = $props();

  let errorNotif = $state<{ title?: string; message: string }>();
  let showCreate = $state(false);
  let pop = $state(false);

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
    const response = await loginRequest({ email, password });
    if (response instanceof ServerError) {
      notificationQueue.push({
        title: 'Error logging in',
        message: response.message,
        level: 'error',
      });
      return false;
    }

    userState.user = response;

    if (data.goto) {
      await goto(data.goto);
    }

    if (data.app) {
      window.location.assign(buildRerouteURL(data.app, data.path));
    }

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

    await goto(`/awaiting-verification?email=${email}`);
    return true;
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
