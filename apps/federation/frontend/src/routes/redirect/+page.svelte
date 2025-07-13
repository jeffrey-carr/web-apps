<script lang="ts">
  import type { makeRequestParams, RouteInformation, User } from '@jeffrey-carr/frontend-common';
  import { makeRequest } from '@jeffrey-carr/frontend-common';
  import { onMount } from 'svelte';

  let user = $state<User>();

  onMount(async () => {
    const u = await getUser();
    user = await getUser();
  });

  const getUser = async (): Promise<User> => {
    const response = await makeRequest(
      {
        path: '/api/auth/validate-cookie',
      } as RouteInformation,
      { credentials: true } as makeRequestParams
    );

    return await response.json();
  };
</script>

<main class="container">
  <h1>Redirecting You...</h1>
  {#if user}
    <ul class="user-information">
      {#snippet item(field: string, value: string)}
        <li class="user-info"><strong>{field}</strong>: {value}</li>
      {/snippet}
      {@render item('UUID', user.uuid)}
      {@render item('Email', user.email)}
      {@render item('First name', user.fName)}
      {@render item('Last name', user.lName)}
    </ul>
  {/if}
</main>

<style lang="scss">
  .container {
    text-align: center;
  }
</style>
