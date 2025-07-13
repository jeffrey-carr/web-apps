<script lang="ts">
  import type { Character } from '@jeffrey-carr/frontend-common';
  import Card from './Card.svelte';
  import CreateAccountCard from './CreateAccountCard.svelte';
  import LoginCard from './LoginCard.svelte';

  let {
    login,
    createAccount,
  }: {
    login: (email: string, password: string) => Promise<boolean>;
    createAccount: (
      email: string,
      password: string,
      fName: string,
      lName: string,
      character: Character
    ) => Promise<boolean>;
  } = $props();

  let showCreate = $state(false);
  let pop = $state(false);
  let containerClass = $derived(`container ${pop ? 'pop' : ''}`);

  const toggleCreate = () => {
    showCreate = !showCreate;
    pop = true;
    setTimeout(() => {
      pop = false;
    }, 201);
  };
</script>

<div class={containerClass}>
  <Card>
    {#if showCreate}
      <CreateAccountCard {createAccount} backToLogin={toggleCreate} />
    {:else}
      <LoginCard {login} switchToCreate={toggleCreate} />
    {/if}
  </Card>
</div>

<style lang="scss">
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
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
