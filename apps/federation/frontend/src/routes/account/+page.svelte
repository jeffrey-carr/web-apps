<script lang="ts">
  import { goto } from '$app/navigation';
  import { makeRequest, METHODS, type User } from '@jeffrey-carr/frontend-common';
  import { onMount } from 'svelte';

  let user = $state<User | null>(null);
  let loading = $state(true);

  const loadUser = async () => {
    const response = await makeRequest(
      {
        path: '/api/auth/authed-user',
        method: METHODS.GET,
      },
      {
        credentials: true,
      }
    );
    loading = false;
    if (response.status !== 200) {
      goto('/?message="Error loading account"&level="error"');
      return;
    }

    user = await response.json();
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
      </tbody>
    </table>
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
