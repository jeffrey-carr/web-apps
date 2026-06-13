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
      <Spinner label="Loading your account..." size="2rem" />
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
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
</style>
