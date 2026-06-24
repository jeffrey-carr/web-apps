<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/state';
  import { PUBLIC_ENVIRONMENT } from '$env/static/public';
  import { constructLoginURL } from '$lib/mappers/requests';
  import { Button } from '@jeffrey-carr/frontend-common';

  let signInURL = $derived(constructLoginURL(PUBLIC_ENVIRONMENT, page));
  let loadingSignIn = $state(false);
  let loadingGoHome = $state(false);

  const goHome = async () => {
    loadingGoHome = true;
    await goto('/');
    loadingGoHome = false;
  };
</script>

{#snippet goHomeButton()}
  <Button variant="secondary" onclick={goHome} loading={loadingGoHome}>Back to home</Button>
{/snippet}

<div class="container">
  {#if page.status === 401}
    <h1>Hey!</h1>
    <p>You need to be signed in to view this page</p>
    <div class="buttons">
      <Button href={signInURL} loading={loadingSignIn}>Sign in or create account</Button>
      {@render goHomeButton()}
    </div>
  {:else if page.status === 403}
    <h1>Yikes</h1>
    <p>You're not allowed here. Why not check out all the cool recipes on the home page?</p>
    {@render goHomeButton()}
  {:else if page.status === 500}
    <h1>Oops!</h1>
    <p>
      Sorry, we're having some problems. You can try reloading the page, or maybe something's
      broken.
    </p>
    {@render goHomeButton()}
  {/if}
</div>

<style lang="scss">
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;

    margin-top: 5rem;
  }
</style>
