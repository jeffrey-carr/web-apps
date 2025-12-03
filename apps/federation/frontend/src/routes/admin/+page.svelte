<script lang="ts">
  import {
    Button,
    Input,
    Modal,
    Notification,
    ServerError,
    Spinner,
    type NotificationLevel,
    type User,
  } from '@jeffrey-carr/frontend-common';
  import { onMount } from 'svelte';
  import type { APIKey } from '$lib/types/apiKey';
  import { createAPIKey, getAllAPIKeys, revokeAPIKey } from '$lib/requests/apiKeys';

  import styles from './page.module.scss';
  import { logout } from '$lib/requests';
  import { goto } from '$app/navigation';

  let { data }: { data: { user: User } } = $props();
  let keys = $state<APIKey[]>([]);

  let hasLoadedKeys = false;
  let loadingKeys = $state(false);
  let activeKeys = $derived(keys.filter(key => key.isActive));
  let inactiveKeys = $derived(keys.filter(key => !key.isActive));

  let notif = $state<{ title?: string; message: string; level: NotificationLevel }>();

  let showModal = $state(false);
  let newAppName = $state('');
  let loadingCreate = $state(false);
  let loadingRevoke = $state<boolean[]>([]);

  onMount(() => {
    if (loadingKeys || hasLoadedKeys) return;

    const loadKeys = async () => {
      keys = await getAllAPIKeys();
      loadingKeys = false;
      hasLoadedKeys = true;
    };

    loadingKeys = true;
    loadKeys();
  });

  $effect(() => {
    if (loadingRevoke.length !== inactiveKeys.length) {
      loadingRevoke = Array(inactiveKeys.length).fill(false);
    }
  });

  const validateNewAppName = (name: string): string => {
    name = name.trim();
    if (activeKeys.some(key => key.app === name.toLowerCase())) {
      return 'This app already has a key';
    }

    return '';
  };

  const addKey = async () => {
    if (validateNewAppName(newAppName).length !== 0) return;

    loadingCreate = true;
    let newKey: APIKey;
    try {
      newKey = await createAPIKey(newAppName);
    } catch (e) {
      const errMessage = e as string;
      notif = { title: 'Error creating key', message: errMessage, level: 'error' };
      loadingCreate = false;
      return;
    }

    keys.push(newKey);
    loadingCreate = false;
    notif = {
      title: 'Key created',
      message: 'Successfully created key',
      level: 'success',
    };
    showModal = false;
    newAppName = '';
  };

  const revokeKey = async (key: APIKey, idx: number) => {
    loadingRevoke[idx] = true;
    let updatedKey;
    try {
      updatedKey = await revokeAPIKey(key);
    } catch (e) {
      const err = e as ServerError;
      loadingRevoke[idx] = false;
      notif = {
        title: 'Error revoking key',
        message: err.message,
        level: 'error',
      };
      return;
    }

    const keyIndex = keys.findIndex(currentKey => currentKey.key === key.key);
    if (keyIndex < 0) return;

    keys[keyIndex] = updatedKey;
  };

  const logoutUser = async () => {
    try {
      await logout();
    } catch (e) {
      const serverResponse = e as ServerError;
      notif = {
        title: 'Error logging out',
        message: serverResponse.message,
        level: 'error',
      };
      return;
    }

    goto('/choose-app');
  };

  const closeModal = () => {
    showModal = false;
    newAppName = '';
  };
  const closeNotif = () => {
    notif = undefined;
  };
</script>

{#snippet keyTable(keys: APIKey[], activeTable: boolean)}
  <table class={styles.table}>
    <thead class={styles.header}>
      <tr>
        <td>App</td>
        <td>Key</td>
        <td>Granted On</td>
        {#if !activeTable}
          <td>Revoked On</td>
        {/if}
        <td>Last Seen At</td>
        {#if activeTable}
          <td></td>
        {/if}
      </tr>
    </thead>
    <tbody>
      {#each keys as key, idx (key.key)}
        <tr>
          <td>{key.app}</td>
          <td>
            {key.key}
          </td>
          <td>{new Date(key.grantedAt).toDateString()}</td>
          {#if !activeTable}
            <td>{new Date(key.revokedAt ?? '').toDateString()}</td>
          {/if}
          <td>{new Date(key.lastSeenAt).toString()}</td>
          {#if activeTable}
            <td
              ><Button
                onclick={() => {
                  revokeKey(key, idx);
                }}
                variant="secondary"
                loading={loadingRevoke[idx]}>Revoke</Button
              ></td
            >
          {/if}
        </tr>
      {/each}
    </tbody>
  </table>
{/snippet}

<Modal bind:open={showModal}>
  <div class={styles.createModal}>
    <h1>New API Key</h1>
    <Input
      label="App name"
      placeholder="Fancy schmancy web app"
      bind:value={newAppName}
      validator={validateNewAppName}
    />
    <div class={styles.buttons}>
      <Button onclick={addKey} loading={loadingCreate}>Create key</Button>
      <Button onclick={closeModal} variant="secondary">Cancel</Button>
    </div>
  </div>
</Modal>

{#if notif}
  <Notification
    level={notif.level}
    title={notif.title}
    message={notif.message}
    close={closeNotif}
  />
{/if}

<main class={styles.container}>
  <h1>Admin panel</h1>
  <p class={styles.greeting}>Hello, {data.user.fName}</p>
  <button class={styles.logoutButton} onclick={logoutUser}>Logout</button>

  {#if loadingKeys}
    <div class={styles.loading}>
      <div class={styles.spinner}>
        <Spinner />
      </div>
      <span class={styles.loadingText}>Loading keys...</span>
    </div>
  {:else}
    <h2>Active keys</h2>
    {#if activeKeys.length === 0}
      <p class={styles.noEntries}>No active keys</p>
    {:else}
      {@render keyTable(activeKeys, true)}
    {/if}
    <div class={styles.addKeyButton}>
      <Button onclick={() => (showModal = true)}>New Key</Button>
    </div>

    <h2>Revoked keys</h2>
    {#if inactiveKeys.length === 0}
      <p class={styles.noEntries}>No revoked keys</p>
    {:else}
      {@render keyTable(inactiveKeys, false)}
    {/if}
  {/if}
</main>
