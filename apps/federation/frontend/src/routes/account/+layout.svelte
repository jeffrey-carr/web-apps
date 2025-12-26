<script lang="ts">
  import { goto } from '$app/navigation';
  import { userState } from '$lib/globals/user.svelte';
  import { Spinner } from '@jeffrey-carr/frontend-common';

  let { children }: { children: () => any } = $props();

  $effect(() => {
    if (userState.isLoading) return;
    if (userState.user == null) {
      goto('/?goto=/account');
    }
  });
</script>

<main class="container">
  {#if userState.user}
    {@render children()}
  {:else}
    <div class="loading-container">
      <Spinner label="Loading your account..." />
    </div>
  {/if}
</main>

<style lang="scss">
  .container {
    height: 100vh;
    width: 100vw;

    margin: 0;

    background-color: var(--app-theme-background);
  }

  .loading-container {
    height: 4rem;
    margin: auto;
    margin-top: 5rem;
  }
</style>
