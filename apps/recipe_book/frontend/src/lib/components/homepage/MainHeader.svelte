<script lang="ts">
  import { page } from '$app/state';
  import { PUBLIC_ENVIRONMENT } from '$env/static/public';
  import { userState } from '$lib/globals/user.svelte';
  import { constructLoginURL } from '$lib/mappers/requests';
  import { Button, ReactiveIcon, Spinner } from '@jeffrey-carr/frontend-common';
  import UserProfileButton from './UserProfileButton.svelte';

  let loadingAuth = $state(false);
  let showSpinner = $derived(userState.isLoading || loadingAuth);
  let loginURL = $derived(constructLoginURL(PUBLIC_ENVIRONMENT, page));
</script>

<header class="container">
  <div class="content">
    <h1 class="title">Jean's Recipe Book</h1>
    <p class="subtext">A Jeffrey Carr jawn</p>
    {#if showSpinner}
      <Spinner size="1.5rem" />
    {:else if !userState.user}
      <Button class="auth" href={loginURL} animated={false}>
        <ReactiveIcon icon="enter-right" /> Sign in
      </Button>
    {:else}
      <UserProfileButton user={userState.user} />
    {/if}
  </div>

  <div class="footer">
    <ul class="links">
      <li>
        <a
          class="link-item"
          href="https://github.com/jeffrey-carr/web-apps/tree/main/apps/recipe_book"
          target="_blank"
        >
          <ReactiveIcon class="links-icon" icon="code" /> View Source
        </a>
      </li>
      <li>
        <a class="link-item" href="https://jeffreycarr.dev">
          <ReactiveIcon class="links-icon" icon="box" />More from Jeff
        </a>
      </li>
    </ul>
  </div>
</header>

<style lang="scss">
  .container {
    position: relative;
    width: 100%;

    background-color: var(--app-theme-primary);

    * {
      color: var(--app-theme-text-secondary);
    }
  }

  .content {
    display: grid;
    grid-template-columns: 1fr auto;
    grid-template-areas:
      'title auth'
      'subtext .';
    align-items: center;

    padding: 2rem 5rem;
    margin-bottom: 2rem;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      grid-template-areas:
        'title'
        'subtext'
        'auth';
      justify-items: center;
      text-align: center;
      padding: 1.5rem 1rem;
      gap: 0.5rem;
    }
  }

  .title {
    grid-area: title;
  }

  .subtext {
    grid-area: subtext;
    font-style: italic;

    @media (max-width: 768px) {
      margin-bottom: 1rem;
    }
  }

  .content :global(.auth) {
    --reactive-icon-size: 1.25rem;

    background-color: var(--app-theme-secondary);
    color: var(--app-theme-text-primary);

    &:hover {
      background-color: var(--app-theme-tertiary);
    }

    grid-area: auth;
  }

  .footer {
    position: absolute;
    left: 0;
    bottom: 0rem;

    width: 100%;
    border-top: 1px solid var(--app-theme-secondary);
  }

  .links {
    display: flex;
    align-items: center;
    font-size: 0.8rem;

    li {
      list-style: none;
      border-right: 1px solid var(--app-theme-secondary);
      padding: 0 0.5rem;

      &:last-of-type {
        border: none;
      }
    }

    :global(.links-icon) {
      --reactive-icon-size: 1rem;
    }
  }

  .link-item {
    display: flex;
    align-items: center;
    gap: 5px;
  }
</style>
