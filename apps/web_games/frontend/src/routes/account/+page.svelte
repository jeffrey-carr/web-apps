<script lang="ts">
  import { ArcadeMachine } from '$lib/components';
  import type { GetUserResponse, UserStats } from '$lib/types';
  import {
    makeRequest,
    METHODS,
    type RouteInformation,
    type User,
  } from '@jeffrey-carr/frontend-common';
  import { onMount } from 'svelte';

  let user = $state<User | null>(null);
  let stats = $state<UserStats | null>(null);
  let loading = $state(true);
  $inspect(loading);

  const loadUser = async () => {
    const getUserInfo: RouteInformation = {
      path: '/api/user/me',
      method: METHODS.GET,
    };
    const rawResponse = await makeRequest(getUserInfo, { credentials: true });

    if (rawResponse.status !== 200) {
      console.error('error retrieving user', rawResponse);
      return;
    }

    const response: GetUserResponse = await rawResponse.json();
    console.log('Got response', response);
    user = response.user;
    stats = response.stats;
    loading = false;
  };

  onMount(loadUser);
</script>

<main class="container">
  {#if loading}
    Loading user info...
  {:else}
    <table class="user-info">
      <tbody>
        <tr>
          <th class="section-title">User Info</th>
        </tr>
        <tr>
          <td>UUID</td>
          <td>{user?.uuid}</td>
        </tr>
        <tr>
          <td>Email</td>
          <td>{user?.email}</td>
        </tr>
        <tr>
          <td>First Name</td>
          <td>{user?.fName}</td>
        </tr>
        <tr>
          <td>Last name</td>
          <td>{user?.lName}</td>
        </tr>
        <tr>
          <th class="section-title">Binoku Stats</th>
        </tr>
        <tr>
          <td>Games Played</td>
          <td>{stats?.binoku?.gamesPlayed ?? '?'}</td>
        </tr>
        <tr>
          <td>Games Completed</td>
          <td>{stats?.binoku.gamesCompleted}</td>
        </tr>
        <tr>
          <th class="section-title">Word Chain Stats</th>
        </tr>
        <tr>
          <td>Games Played</td>
          <td>{stats?.wordChain.gamesPlayed ?? '?'}</td>
        </tr>
      </tbody>
    </table>

    <ArcadeMachine gameName="Binoku" score={42} />
  {/if}
</main>

<style lang="scss">
  .container {
    box-sizing: border-box;

    display: flex;
    justify-content: center;
    align-items: center;

    height: 100vh;
    width: 100vw;
  }

  .user-info {
    td {
      padding: 0.5rem;
    }
  }
</style>
