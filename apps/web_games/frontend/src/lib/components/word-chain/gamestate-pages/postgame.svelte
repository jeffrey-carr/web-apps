<script lang="ts">
  import { page } from '$app/state';
  import { userState } from '$lib/globals/user.svelte';
  import type { SSEGameWinIndividualUserData } from '$lib/types/word-chain';
  import {
    Button,
    CharacterIcon,
    Confetti,
    ReactiveIcon,
    type ServerResponse,
  } from '@jeffrey-carr/frontend-common';
  import { proposeRematch as doProposeRematch } from '$lib/requests/word-chain';
  import clsx from 'clsx';

  let {
    winner,
    chain,
    playerData,
    onProposeRematch,
    rematchProposedByOpponent = false,
    onOpenRematchModal,
  }: {
    winner: string;
    chain: string[];
    playerData: Record<string, SSEGameWinIndividualUserData>;
    onProposeRematch: () => void;
    rematchProposedByOpponent?: boolean;
    onOpenRematchModal?: () => void;
  } = $props();

  let currentUserUUID = $derived(userState.user?.uuid);
  let isCurrentUserWinner = $derived(Boolean(currentUserUUID && currentUserUUID === winner));
  let code = page.params.code.toLowerCase();
  let proposingRematch = $state(false);

  let winnerData = $derived(playerData?.[winner]);
  let otherPlayers = $derived(
    playerData
      ? Object.entries(playerData)
          .filter(([uuid]) => uuid !== winner)
          .sort(([, a], [, b]) => b.finalProgress - a.finalProgress)
      : []
  );

  // Use the winner's finalProgress (or fallback to 6) as the full chain target
  let goalProgress = $derived(Math.max(winnerData?.finalProgress ?? 6, 6));

  const getPlaceLabel = (place: number): string => {
    if (place === 1) return 'WINNER';
    return '2ND PLACE';
  };

  const proposeRematch = async () => {
    if (rematchProposedByOpponent && onOpenRematchModal) {
      onOpenRematchModal();
      return;
    }

    proposingRematch = true;

    try {
      await doProposeRematch(code);
    } catch (e) {
      const serverResponse = e as ServerResponse;
      console.error(`Error proposing rematch: ${serverResponse.data}`);
      proposingRematch = false;
      return;
    }

    onProposeRematch();
    proposingRematch = false;
  };
</script>

{#snippet userCard(uuid: string, userData: SSEGameWinIndividualUserData, place: number)}
  {@const isWinner = place === 1}
  {@const isYou = currentUserUUID === uuid}
  {@const clampedProgress = Math.max(0, Math.min(userData.finalProgress, goalProgress))}
  {@const progressPercent = Math.round((clampedProgress / goalProgress) * 100)}

  <div class={clsx('user-card', { winner: isWinner, runnerUp: !isWinner })}>
    <div class="place-header">
      <span class={clsx('place-badge', { winner: isWinner })}>
        {#if isWinner}
          {getPlaceLabel(place)}
        {:else}
          {getPlaceLabel(place)}
        {/if}
      </span>
      {#if userData.disconnectedAt}
        <span class="status-pill disconnected">Disconnected</span>
      {/if}
    </div>

    <div class="character-container">
      <CharacterIcon character={userData.character} />
    </div>

    <div class="name-row">
      <p class="user-name">{userData.name}</p>
      {#if isYou}
        <span class="you-badge">YOU</span>
      {/if}
    </div>

    <div class="progress-section">
      <div class="progress-header">
        <span class="progress-label">Chain Progress</span>
        <span class="progress-count">
          <strong>{clampedProgress}</strong> / {goalProgress} words
        </span>
      </div>

      <div
        class="chain-steps"
        role="progressbar"
        aria-valuenow={clampedProgress}
        aria-valuemin={0}
        aria-valuemax={goalProgress}
        aria-label={`${userData.name} made it ${clampedProgress} out of ${goalProgress} words`}
      >
        {#each Array(goalProgress) as _, stepIndex (stepIndex)}
          {@const completed = stepIndex < clampedProgress}
          {@const isCurrentStop = !isWinner && stepIndex === clampedProgress}
          <div
            class={clsx('chain-step', {
              completed,
              'winner-step': completed && isWinner,
              'stopped-step': isCurrentStop,
            })}
          >
            <span class="step-number">{stepIndex + 1}</span>
          </div>
          {#if stepIndex < goalProgress - 1}
            <div
              class={clsx('chain-connector', {
                'completed': stepIndex + 1 < clampedProgress,
                'winner-connector': stepIndex + 1 < clampedProgress && isWinner,
              })}
            ></div>
          {/if}
        {/each}
      </div>

      <p class="progress-summary">
        {#if isWinner}
          Completed the entire word chain! ({progressPercent}%)
        {:else}
          Made it to word {clampedProgress} of {goalProgress} ({progressPercent}%)
        {/if}
      </p>
    </div>
  </div>
{/snippet}

<div class="container">
  {#if isCurrentUserWinner}
    <Confetti />
  {/if}

  <div class="content">
    <header class="banner">
      <p class="banner-eyebrow">GAME OVER</p>
      <h2 class="banner-title">
        {#if isCurrentUserWinner}
          You Won!
        {:else if winnerData}
          {winnerData.name} Wins!
        {:else}
          Match Complete
        {/if}
      </h2>
    </header>

    <div class="chain-container">
      <h3 class="chain-title">Full Chain</h3>
      <div class="chain">
        {#each chain as word, i (word)}
          <p class="chain-word">{word}</p>
          {#if i !== chain.length - 1}
            <ReactiveIcon icon="right-arrow" />
          {/if}
        {/each}
      </div>
    </div>

    <div class="cards-container">
      {#if winnerData}
        {@render userCard(winner, winnerData, 1)}
      {/if}
      {#each otherPlayers as [uuid, data], idx (uuid)}
        {@render userCard(uuid, data, idx + 2)}
      {/each}
    </div>

    <div class="actions">
      <Button onclick={proposeRematch} size="lg" loading={proposingRematch}>
        {rematchProposedByOpponent ? 'Respond to Rematch' : 'Propose Rematch'}
      </Button>
      <Button href="/word-chain" size="lg" variant="secondary">Back to Word Chain</Button>
    </div>
  </div>
</div>

<style lang="scss">
  .container {
    position: relative;
    height: 100%;
    width: 100%;
    padding: 2rem 1rem;
  }

  .content {
    position: relative;
    z-index: 6;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2.5rem;

    max-width: 900px;
    margin: 0 auto;
  }

  .banner {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    text-align: center;

    .banner-eyebrow {
      font-family: var(--game-font);
      font-size: 0.85rem;
      letter-spacing: 0.12em;
      color: var(--yellow);
    }

    .banner-title {
      font-family: var(--app-theme-font);
      font-size: clamp(2rem, 4vw, 3rem);
      font-weight: 700;
      color: var(--app-theme-text-primary);
    }
  }

  .chain-container {
    width: 100%;
    text-align: center;

    .chain-title {
      font-family: var(--app-theme-font);
      margin-bottom: 1rem;
    }

    .chain {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      gap: 0.75rem 1rem;

      .chain-word {
        font-size: 1.2rem;
      }
    }
  }

  .cards-container {
    display: flex;
    justify-content: center;
    align-items: stretch;
    gap: 2rem;
    flex-wrap: wrap;
    width: 100%;
  }

  .user-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 1.25rem;

    width: 360px;
    max-width: 100%;
    padding: 1.5rem;

    background-color: var(--bg-color-light);
    border: 1px solid var(--app-theme-primary);
    border-radius: var(--border-radius-md);
    transition: transform var(--default-transition-ms) ease;

    &.winner {
      border: 2px solid var(--yellow);
      box-shadow: 0 0 24px rgba(229, 200, 144, 0.18);
    }
  }

  .place-header {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    flex-wrap: wrap;
    width: 100%;
  }

  .place-badge {
    font-family: var(--game-font);
    font-size: 0.9rem;
    padding: 0.45rem 0.75rem;
    border-radius: var(--border-radius-sm);
    background-color: rgba(131, 139, 167, 0.2);
    color: var(--app-theme-text-primary);

    &.winner {
      background-color: rgba(229, 200, 144, 0.2);
      color: var(--yellow);
    }
  }

  .status-pill {
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
    border-radius: var(--border-radius-sm);

    &.disconnected {
      background-color: rgba(231, 130, 132, 0.2);
      color: var(--red);
      border: 1px solid var(--red);
    }
  }

  .character-container {
    --size: 9.5rem;
    height: var(--size);
    width: var(--size);

    display: flex;
    align-items: center;
    justify-content: center;

    padding: 0.75rem;
    border-radius: 100%;
    background-color: rgba(255, 255, 255, 0.04);
  }

  .user-card.winner .character-container {
    background-color: rgba(229, 200, 144, 0.1);
    border: 1px solid rgba(229, 200, 144, 0.35);
  }

  .name-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }

  .user-name {
    font-size: 1.4rem;
    font-weight: 600;
    text-align: center;
  }

  .you-badge {
    font-family: var(--game-font);
    font-size: 0.6rem;
    padding: 0.25rem 0.45rem;
    border-radius: var(--border-radius-sm);
    background-color: var(--blue);
    color: var(--bg-color);
  }

  .progress-section {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    width: 100%;
    padding-top: 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }

  .progress-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.95rem;

    .progress-label {
      color: var(--gray);
    }

    .progress-count {
      color: var(--app-theme-text-primary);

      strong {
        color: var(--yellow);
      }
    }
  }

  .chain-steps {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  .chain-step {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 2rem;
    height: 2rem;
    border-radius: var(--border-radius-sm);
    border: 1px solid rgba(255, 255, 255, 0.2);
    background-color: rgba(255, 255, 255, 0.04);
    color: var(--gray);
    font-size: 0.85rem;
    font-weight: 600;
    flex-shrink: 0;

    &.completed {
      border-color: var(--blue);
      background-color: rgba(140, 170, 238, 0.22);
      color: var(--app-theme-text-primary);
    }

    &.winner-step {
      border-color: var(--green);
      background-color: rgba(166, 209, 137, 0.25);
      color: var(--green);
    }

    &.stopped-step {
      border-color: var(--red);
      background-color: rgba(231, 130, 132, 0.15);
      color: var(--red);
    }
  }

  .chain-connector {
    flex: 1;
    height: 2px;
    background-color: rgba(255, 255, 255, 0.15);

    &.completed {
      background-color: var(--blue);
    }

    &.winner-connector {
      background-color: var(--green);
    }
  }

  .progress-summary {
    font-size: 0.85rem;
    color: var(--gray);
    text-align: center;
  }

  .actions {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 0.5rem;
  }
</style>
