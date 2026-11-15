<script lang="ts">
  import { page } from '$app/state';
  import type { PlayerData } from '$lib/types/word-chain';
  import { Button, CharacterIcon, Spinner, type User } from '@jeffrey-carr/frontend-common';

  const getOpponent = (players: Map<string, PlayerData>): PlayerData | undefined => {
    const otherPlayers = Array.from(players.entries())
      .filter(([uuid, _]) => uuid !== user.uuid)
      .map(([_, data]) => data);

    if (otherPlayers.length === 0) {
      return;
    }
    if (otherPlayers.length > 1) {
      console.error(
        `Unexpected number of players: ${otherPlayers.length} (expected 1)`,
        otherPlayers
      );
    }

    return otherPlayers[0];
  };

  let {
    user,
    players,
    onStartLobby,
    waitingForRematch = false,
    rematchDeclined = false,
  }: {
    user: User;
    players: Map<string, PlayerData>;
    onStartLobby: () => Promise<void>;
    waitingForRematch?: boolean;
    rematchDeclined?: boolean;
  } = $props();
  let userInfo = $derived(players.get(user.uuid));
  let opponent = $derived(getOpponent(players));
  let loadingStart = $state(false);
  let code = page.params.code.toLowerCase();
  let canCopyClipboard = $state(navigator.clipboard && window.isSecureContext);
  let copyingCodeToClipboard = $state(false);

  const handleStartLobby = async () => {
    loadingStart = true;
    await onStartLobby();
    loadingStart = false;
  };

  const copyCode = async () => {
    // clipboard is only available in an HTTPs context, so
    if (!canCopyClipboard) return;

    copyingCodeToClipboard = true;
    // TODO: notify
    await navigator.clipboard.writeText(code);
    copyingCodeToClipboard = false;
  };
</script>

{#snippet userArea(
  title: string,
  player: PlayerData,
  pendingRematch = false,
  declinedRematch = false
)}
  <div
    class="user-container"
    class:pending-rematch={pendingRematch}
    class:declined-rematch={declinedRematch}
  >
    <div class="user-header">
      <h3 class="user-title">{title}</h3>
      {#if pendingRematch}
        <span class="rematch-badge">Rematch Pending</span>
      {:else if declinedRematch}
        <span class="rematch-badge declined">Rematch Declined</span>
      {/if}
    </div>
    <div class="character-container" class:dimmed={pendingRematch || declinedRematch}>
      <CharacterIcon character={player.character} />
    </div>
    <p class="player-name">{player.name}</p>
    {#if pendingRematch}
      <div class="pending-note">
        <Spinner size="1rem" />
        <span>Hasn't accepted rematch yet...</span>
      </div>
    {:else if declinedRematch}
      <div class="pending-note declined">
        <span>Declined the rematch proposal</span>
      </div>
    {/if}
  </div>
{/snippet}
{#snippet loadingUserArea(title: string, label: string)}
  <div class="user-container">
    <h3 class="user-title">{title}</h3>
    <div class="spinner-container">
      <Spinner {label} size="2rem" />
    </div>
  </div>
{/snippet}

<div class="container">
  <div class="code-container">
    <h2 class="code-container-header">Lobby Code: {code}</h2>
    {#if canCopyClipboard}
      <Button size="sm" onclick={copyCode} variant="plain" loading={copyingCodeToClipboard}>
        Copy
      </Button>
    {/if}
  </div>
  <div class="users-container">
    {#if userInfo}
      {@render userArea('You', userInfo)}
    {:else}
      {@render loadingUserArea('You', 'Loading...')}
    {/if}

    {#if opponent}
      {@render userArea('Opponent', opponent, waitingForRematch, rematchDeclined)}
    {:else}
      {@render loadingUserArea('Opponent', 'Waiting for opponent...')}
    {/if}
  </div>
  {#if userInfo?.isHost}
    <div class="start-container">
      <Button
        disabled={!opponent || waitingForRematch || rematchDeclined}
        loading={loadingStart}
        onclick={handleStartLobby}
      >
        Start Game
      </Button>
      {#if waitingForRematch && opponent}
        <p class="rematch-waiting-hint">
          Waiting for {opponent.name} to accept your rematch proposal...
        </p>
      {:else if rematchDeclined && opponent}
        <p class="rematch-waiting-hint declined">
          {opponent.name} declined the rematch proposal.
        </p>
      {/if}
    </div>
  {:else if waitingForRematch && opponent}
    <p class="waiting-container">
      Waiting for {opponent.name} to accept your rematch proposal...
    </p>
  {:else if rematchDeclined && opponent}
    <p class="waiting-container">
      {opponent.name} declined the rematch proposal.
    </p>
  {:else}
    <p class="waiting-container">Waiting for host to start the game...</p>
  {/if}
</div>

<style lang="scss">
  .container {
    height: 100%;
  }
  .users-container {
    display: flex;
    gap: 1rem;
    justify-content: space-evenly;

    margin-top: 2rem;
  }
  .user-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;

    border: 1px solid var(--app-theme-primary);
    padding: 1rem;
    border-radius: var(--border-radius-md);
    transition:
      border-color var(--default-transition-ms) ease,
      box-shadow var(--default-transition-ms) ease;

    --size: 350px;
    height: var(--size);
    width: var(--size);

    &.pending-rematch {
      border-style: dashed;
      border-color: var(--app-theme-tertiary);
      background-color: rgba(35, 38, 52, 0.55);
    }

    &.declined-rematch {
      border-style: dashed;
      border-color: var(--app-theme-danger);
      background-color: rgba(35, 38, 52, 0.55);
    }

    .user-header {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.4rem;
    }

    .user-title {
      font-family: var(--game-font);
    }

    .rematch-badge {
      font-family: var(--game-font);
      font-size: 0.6rem;
      padding: 0.25rem 0.5rem;
      border-radius: var(--border-radius-sm);
      background-color: rgba(229, 200, 144, 0.16);
      border: 1px solid rgba(229, 200, 144, 0.45);
      color: var(--app-theme-tertiary);
      text-transform: uppercase;

      &.declined {
        background-color: rgba(231, 130, 132, 0.16);
        border-color: rgba(231, 130, 132, 0.45);
        color: var(--app-theme-danger);
      }
    }

    .character-container {
      height: 70%;
      width: 70%;
      border-radius: 1;
      transition:
        opacity 200ms ease,
        filter 200ms ease;

      &.dimmed {
        opacity: 0.45;
        filter: grayscale(0.55);
      }
    }

    .player-name {
      font-size: 1.2rem;
    }

    .pending-note {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.9rem;
      color: var(--app-theme-tertiary);

      &.declined {
        color: var(--app-theme-danger);
      }
    }

    .spinner-container {
      display: flex;
      justify-content: center;
      align-items: center;

      height: 100%;
      width: 100%;
    }
  }

  .start-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    width: 100%;

    margin: 3rem 0;

    .rematch-waiting-hint {
      font-size: 1.1rem;
      color: var(--app-theme-tertiary);
      text-align: center;

      &.declined {
        color: var(--app-theme-danger);
      }
    }
  }

  .waiting-container {
    margin: 4rem;
    display: block;
    text-align: center;
    font-size: 2rem;
  }

  .code-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    margin: 1rem 0;

    .code-container-header {
      font-family: var(--game-font);
      font-size: 1.5rem;
    }
  }
</style>
