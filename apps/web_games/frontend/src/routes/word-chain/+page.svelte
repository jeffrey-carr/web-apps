<script lang="ts">
  import { userState } from '$lib/globals/user.svelte';
  import type { CreateLobbyResponse } from '$lib/types/word-chain';
  import {
    App,
    APP_QUERY_PARAM,
    PATH_QUERY_PARAM,
    Button,
    Input,
    getAppURL,
  } from '@jeffrey-carr/frontend-common';
  import clsx from 'clsx';
  import { PUBLIC_ENVIRONMENT } from '$env/static/public';
  import { createLobby } from '$lib/requests/word-chain';
  import { goto } from '$app/navigation';

  let blockMultiplayer = $state(true);
  const signInURL = `${getAppURL(PUBLIC_ENVIRONMENT, App.Federation)}?${APP_QUERY_PARAM}=${App.WebGames}&${PATH_QUERY_PARAM}=word-chain`;

  let creatingLobby = $state(false);
  let joiningLobby = $state(false);
  let joinCode = $state<string>();

  $effect(() => {
    if (userState.user) {
      blockMultiplayer = false;
    }
  });

  const newLobby = async () => {
    if (creatingLobby) return;
    creatingLobby = true;

    let response: CreateLobbyResponse;
    try {
      response = await createLobby();
    } catch (err) {
      // TODO: notification
      creatingLobby = false;
      return;
    }

    await goto(`/word-chain/lobby/${response.code}`);
    creatingLobby = false;
  };

  const joinLobby = async () => {
    if (!joinCode) return;
    const code = joinCode.trim().toLowerCase();
    if (code === '') return;

    joiningLobby = true;
    await goto(`/word-chain/lobby/${code}`);
    return;
  };
</script>

<div class="container">
  <div class="action-area">
    <div class="area">
      <h2 class="mode-header">Singleplayer</h2>
      <Button size="lg" href="/word-chain/game">New Game</Button>
    </div>

    <div class="separator"></div>
    <div class="area">
      <h2 class="mode-header">Multiplayer</h2>
      <div class="multiplayer-area-wrapper">
        <div class={clsx('multiplayer-block', { enabled: blockMultiplayer })}>
          <h3 class="multiplayer-block-header">You need to be logged in to play multiplayer</h3>
          <Button size="md" href={signInURL} loading={userState.isLoading}>Sign in</Button>
        </div>
        <div class="multiplayer-area">
          <Button size="lg" onclick={newLobby} loading={creatingLobby}>Start New Lobby</Button>
          <span class="or-text">or</span>
          <div class="join-area">
            <Input placeholder="Enter join code" bind:value={joinCode} />
            <Button size="lg" variant="secondary" onclick={joinLobby} disabled={joiningLobby}>
              Join Lobby
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  .container {
    position: relative;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 1rem;
    gap: 2rem;
  }

  .action-area {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4rem;

    height: 100%;
    width: 100%;

    @media (max-width: 960px) {
      flex-direction: column;
      gap: 2rem;
    }
  }

  .mode-header {
    font-size: clamp(1.8rem, 3.5vw, 3.3rem);
    text-align: center;
  }

  .area {
    position: relative;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;

    height: 100%;
  }

  .separator {
    height: 18rem;
    width: 1px;

    background-color: white;

    @media (max-width: 960px) {
      height: 1px;
      width: 18rem;
      max-width: 80%;
    }
  }

  .multiplayer-area-wrapper {
    position: relative;
  }

  .multiplayer-block {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;

    height: 100%;
    width: 100%;

    border-radius: 10px;

    padding: 2rem;

    pointer-events: none;
    opacity: 0;

    background-color: rgba(0, 0, 0, 0.4);
    --blur-px: 15px;
    backdrop-filter: blur(var(--blur-px));
    -webkit-backdrop-filter: blur(var(--blur-px));

    .multiplayer-block-header {
      font-family: var(--app-theme-font);
      text-align: center;
    }

    &.enabled {
      pointer-events: all;
      opacity: 1;
    }
  }

  .multiplayer-area {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    padding: 2rem;
    padding-top: 0;
  }

  .join-area {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .or-text {
    display: flex;
    align-items: center;
    width: 100%;
    gap: 1rem;

    text-transform: uppercase;
    font-size: 0.9rem;
    color: #ccc;

    &::before,
    &::after {
      content: '';
      flex: 1;
      height: 1px;
      background-color: white;
    }
  }
</style>
