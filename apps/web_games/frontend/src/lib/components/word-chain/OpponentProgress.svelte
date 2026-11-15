<script lang="ts">
  import type { PlayerData, SSEProgressUpdateData } from '$lib/types/word-chain';
  import { CharacterIcon, RadialTimer } from '@jeffrey-carr/frontend-common';
  import clsx from 'clsx';
  import gsap from 'gsap';
  import { onMount, tick } from 'svelte';

  let {
    chain,
    opponent,
    latestUpdate,
    initialProgress = 1,
  }: {
    chain: string[];
    opponent: PlayerData;
    latestUpdate?: SSEProgressUpdateData;
    initialProgress?: number;
  } = $props();

  let currentProgress = $state(1);
  let revealedLetters = $state(1);
  let timedOutUntil = $state<number | undefined>(undefined);
  let flashState = $state<'correct' | 'incorrect' | null>(null);

  let slotElements = $state<HTMLDivElement[]>([]);
  let stepNodeElements = $state<HTMLDivElement[]>([]);
  let connectorFillElements = $state<HTMLDivElement[]>([]);
  let pipElements = $state<HTMLSpanElement[]>([]);
  let markerElement = $state<HTMLDivElement>();
  let markerCardElement = $state<HTMLDivElement>();

  let lastProcessedUpdate: SSEProgressUpdateData | undefined;

  let activeWordLength = $derived(chain[currentProgress]?.length ?? 0);

  const getRowOffset = (rowIndex: number): number => {
    const clampedIndex = Math.max(0, Math.min(rowIndex, chain.length - 1));
    const slot = slotElements[clampedIndex];
    if (slot) {
      return slot.offsetTop;
    }
    // Fallback matching 5rem height (80px) + 1.2rem gap (19.2px)
    return clampedIndex * 99.2;
  };

  onMount(() => {
    currentProgress = initialProgress;
    if (markerElement) {
      gsap.set(markerElement, { y: getRowOffset(currentProgress) });
    }
    if (markerCardElement) {
      gsap.fromTo(
        markerCardElement,
        { scale: 0.85, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.6)' }
      );
    }

    return () => {
      if (markerElement) gsap.killTweensOf(markerElement);
      if (markerCardElement) gsap.killTweensOf(markerCardElement);
      stepNodeElements.forEach(el => el && gsap.killTweensOf(el));
      connectorFillElements.forEach(el => el && gsap.killTweensOf(el));
      pipElements.forEach(el => el && gsap.killTweensOf(el));
    };
  });

  $effect(() => {
    if (!latestUpdate || latestUpdate === lastProcessedUpdate) return;
    if (latestUpdate.playerUUID && latestUpdate.playerUUID !== opponent.uuid) return;

    lastProcessedUpdate = latestUpdate;

    if (latestUpdate.correct) {
      const previousProgress = currentProgress;
      currentProgress = Math.min(latestUpdate.progress, chain.length - 1);
      revealedLetters = Math.max(1, latestUpdate.revealedLetters || 1);
      timedOutUntil = undefined;
      animateCorrectProgress(previousProgress, currentProgress);
    } else {
      currentProgress = Math.min(latestUpdate.progress, chain.length - 1);
      revealedLetters = Math.max(1, latestUpdate.revealedLetters || revealedLetters);
      if (latestUpdate.penaltyInSeconds && latestUpdate.penaltyInSeconds > 0) {
        timedOutUntil = Date.now() + latestUpdate.penaltyInSeconds * 1000;
      }
      animateIncorrectGuess(revealedLetters - 1);
    }
  });

  const animateCorrectProgress = async (fromIndex: number, toIndex: number) => {
    flashState = 'correct';
    await tick();

    // Pop the newly completed step node
    const completedNode = stepNodeElements[fromIndex];
    if (completedNode) {
      gsap.killTweensOf(completedNode);
      gsap.fromTo(completedNode, { scale: 1.35 }, { scale: 1, duration: 0.4, ease: 'back.out(2)' });
    }

    // Animate connector fill downward
    const connectorFill = connectorFillElements[fromIndex];
    if (connectorFill) {
      gsap.killTweensOf(connectorFill);
      gsap.fromTo(
        connectorFill,
        { scaleY: 0, transformOrigin: 'top center' },
        { scaleY: 1, duration: 0.35, ease: 'power2.out' }
      );
    }

    // Slide the floating opponent marker to the new word row
    if (markerElement) {
      gsap.killTweensOf(markerElement);
      gsap.to(markerElement, {
        y: getRowOffset(toIndex),
        duration: 0.5,
        ease: 'back.out(1.4)',
      });
    }

    // Celebratory pop on the marker card
    if (markerCardElement) {
      gsap.killTweensOf(markerCardElement);
      gsap.fromTo(
        markerCardElement,
        { x: 0, scale: 1 },
        {
          keyframes: [
            { scale: 1.08, duration: 0.18, ease: 'power2.out' },
            { scale: 1, duration: 0.28, ease: 'back.out(1.6)' },
          ],
          onComplete: () => {
            flashState = null;
          },
        }
      );
    }
  };

  const animateIncorrectGuess = async (newPipIndex: number) => {
    flashState = 'incorrect';
    await tick();

    if (markerCardElement) {
      gsap.killTweensOf(markerCardElement);
      gsap.fromTo(
        markerCardElement,
        { x: 0, scale: 1 },
        {
          keyframes: [
            { x: -7, duration: 0.06 },
            { x: 7, duration: 0.06 },
            { x: -5, duration: 0.06 },
            { x: 5, duration: 0.06 },
            { x: -3, duration: 0.06 },
            { x: 3, duration: 0.06 },
            { x: 0, duration: 0.08 },
          ],
          ease: 'power1.inOut',
          onComplete: () => {
            flashState = null;
          },
        }
      );
    }

    const activeNode = stepNodeElements[currentProgress];
    if (activeNode) {
      gsap.killTweensOf(activeNode);
      gsap.fromTo(
        activeNode,
        { x: 0 },
        {
          keyframes: [
            { x: -4, duration: 0.06 },
            { x: 4, duration: 0.06 },
            { x: -3, duration: 0.06 },
            { x: 3, duration: 0.06 },
            { x: 0, duration: 0.08 },
          ],
        }
      );
    }

    const pip = pipElements[newPipIndex];
    if (pip && newPipIndex > 0) {
      gsap.killTweensOf(pip);
      gsap.fromTo(pip, { scale: 1.6 }, { scale: 1, duration: 0.35, ease: 'back.out(2)' });
    }
  };

  const handleEndTimeout = () => {
    timedOutUntil = undefined;
  };
</script>

<div class="opponent-progress" aria-label={`${opponent.name}'s progress`}>
  <div class="track-column">
    {#each chain as _, i (i)}
      {@const isCompleted = i < currentProgress}
      {@const isCurrent = i === currentProgress}
      <div class="row-slot" bind:this={slotElements[i]}>
        <div
          class={clsx('step-node', {
            completed: isCompleted,
            current: isCurrent,
            danger: isCurrent && (flashState === 'incorrect' || timedOutUntil != undefined),
          })}
          bind:this={stepNodeElements[i]}
        >
          {#if isCompleted}
            <span class="check-icon">✓</span>
          {:else}
            <span class="step-index">{i + 1}</span>
          {/if}
        </div>

        {#if i < chain.length - 1}
          <div class="step-connector">
            <div
              class={clsx('step-connector-fill', { filled: i < currentProgress })}
              bind:this={connectorFillElements[i]}
            ></div>
          </div>
        {/if}
      </div>
    {/each}
  </div>

  <div class="marker-lane">
    <div class="marker-wrapper" bind:this={markerElement}>
      <div
        class={clsx('marker-card', {
          'flash-correct': flashState === 'correct',
          'flash-incorrect': flashState === 'incorrect',
          'timed-out': timedOutUntil != undefined,
        })}
        bind:this={markerCardElement}
      >
        <div class="avatar-wrapper">
          <CharacterIcon character={opponent.character} />
        </div>

        <div class="opponent-details">
          <div class="name-row">
            <span class="opponent-name">{opponent.name}</span>
            {#if timedOutUntil}
              <div class="timer-badge" title="Penalty cooldown">
                <RadialTimer until={timedOutUntil} onComplete={handleEndTimeout} />
              </div>
            {/if}
          </div>

          <div
            class="hint-pips"
            title={`${revealedLetters} of ${activeWordLength} letters revealed`}
          >
            {#each Array(activeWordLength) as _, pipIdx (pipIdx)}
              {@const isStarterLetter = pipIdx === 0}
              {@const isPenaltyRevealed = pipIdx > 0 && pipIdx < revealedLetters}
              <span
                class={clsx('pip', {
                  starter: isStarterLetter,
                  revealed: isPenaltyRevealed,
                })}
                bind:this={pipElements[pipIdx]}
              ></span>
            {/each}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  .opponent-progress {
    position: relative;
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;

    padding-left: 0.5rem;
    user-select: none;
  }

  @media (max-width: 768px) {
    .opponent-progress {
      align-items: center;
      justify-content: space-between;
      gap: 0.6rem;

      width: 100%;
      padding: 0.4rem 0.65rem;
      border-radius: var(--border-radius-md);
      background-color: color-mix(in srgb, var(--bg-color-light) 92%, transparent);
      backdrop-filter: blur(6px);
      border: 1px solid var(--app-theme-subtle);
      box-shadow: 0 4px 12px color-mix(in srgb, var(--bg-color-light) 75%, transparent);
    }

    .track-column {
      flex-direction: row !important;
      align-items: center;
      gap: 0.25rem !important;
      order: 2;
    }

    .row-slot {
      height: auto !important;
      width: auto !important;
    }

    .step-node {
      width: 1.3rem !important;
      height: 1.3rem !important;
      font-size: 0.65rem !important;
    }

    .step-connector {
      display: none;
    }

    .marker-lane {
      min-width: 0 !important;
      height: auto !important;
      order: 1;
    }

    .marker-wrapper {
      position: static !important;
      height: auto !important;
      transform: none !important;
    }

    .marker-card {
      padding: 0.25rem 0.5rem !important;
      gap: 0.45rem !important;
      border-width: 1px !important;
      box-shadow: none !important;
    }

    .avatar-wrapper {
      width: 2rem !important;
      height: 2rem !important;
    }

    .opponent-name {
      font-size: 0.8rem !important;
      max-width: 5.5rem !important;
    }
  }

  .track-column {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  }

  .row-slot {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    height: 5rem;
    width: 2rem;
  }

  .step-node {
    position: relative;
    z-index: 2;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 1.75rem;
    height: 1.75rem;
    border-radius: 50%;

    background-color: var(--bg-color-light);
    border: 2px solid var(--app-theme-subtle);
    color: var(--app-theme-gray);
    font-size: 0.8rem;
    font-weight: 600;

    transition:
      border-color 200ms ease,
      background-color 200ms ease,
      color 200ms ease,
      box-shadow 200ms ease;

    &.completed {
      border-color: var(--app-theme-success);
      background-color: var(--bg-color-light);
      color: var(--app-theme-success);
    }

    &.current {
      border-color: var(--app-theme-secondary);
      background-color: var(--bg-color-light);
      color: var(--app-theme-text-primary);
      box-shadow: 0 0 10px color-mix(in srgb, var(--app-theme-secondary) 45%, transparent);
    }

    &.danger {
      border-color: var(--app-theme-danger);
      color: var(--app-theme-danger);
      box-shadow: 0 0 10px color-mix(in srgb, var(--app-theme-danger) 50%, transparent);
    }
  }

  .check-icon {
    font-size: 0.85rem;
    line-height: 1;
  }

  .step-index {
    font-size: 0.75rem;
    line-height: 1;
  }

  .step-connector {
    position: absolute;
    top: calc(50% + 0.875rem);
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;

    width: 2px;
    height: calc(5rem + 1.2rem - 1.75rem);
    background-color: color-mix(in srgb, var(--app-theme-subtle) 40%, transparent);
    overflow: hidden;
  }

  .step-connector-fill {
    width: 100%;
    height: 100%;
    background-color: var(--app-theme-success);
    transform: scaleY(0);
    transform-origin: top center;

    &.filled {
      transform: scaleY(1);
    }
  }

  .marker-lane {
    position: relative;
    height: 100%;
    min-width: 11rem;
  }

  .marker-wrapper {
    position: absolute;
    top: 0;
    left: 0;

    display: flex;
    align-items: center;
    height: 5rem;
    will-change: transform;
  }

  .marker-card {
    display: flex;
    align-items: center;
    gap: 0.65rem;

    padding: 0.5rem 0.75rem;
    border-radius: var(--border-radius-md);
    background-color: var(--bg-color-light);
    border: 1.5px solid var(--app-theme-secondary);
    box-shadow: 0 4px 14px color-mix(in srgb, var(--bg-color-light) 70%, transparent);

    transition:
      border-color 200ms ease,
      box-shadow 200ms ease,
      opacity 200ms ease;

    &.flash-correct {
      border-color: var(--app-theme-success);
      box-shadow: 0 0 18px color-mix(in srgb, var(--app-theme-success) 55%, transparent);
    }

    &.flash-incorrect {
      border-color: var(--app-theme-danger);
      box-shadow: 0 0 18px color-mix(in srgb, var(--app-theme-danger) 60%, transparent);
    }

    &.timed-out {
      border-color: var(--app-theme-danger);

      .avatar-wrapper {
        opacity: 0.75;
        border-color: var(--app-theme-danger);
      }
    }
  }

  .avatar-wrapper {
    flex-shrink: 0;
    width: 2.75rem;
    height: 2.75rem;
    border-radius: 50%;
    border: 1.5px solid var(--app-theme-primary);
    background-color: var(--bg-color);
    overflow: hidden;

    transition:
      opacity 200ms ease,
      border-color 200ms ease;
  }

  .opponent-details {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    min-width: 0;
  }

  .name-row {
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }

  .opponent-name {
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--app-theme-text-primary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 7.5rem;
  }

  .timer-badge {
    display: flex;
    align-items: center;
    justify-content: center;
    transform: scale(0.65);
    transform-origin: center;
    width: 1.3rem;
    height: 1.3rem;
  }

  .hint-pips {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  .pip {
    width: 0.45rem;
    height: 0.45rem;
    border-radius: 2px;
    background-color: color-mix(in srgb, var(--app-theme-subtle) 35%, transparent);
    border: 1px solid var(--app-theme-subtle);

    transition:
      background-color 150ms ease,
      border-color 150ms ease;

    &.starter {
      background-color: var(--app-theme-secondary);
      border-color: var(--app-theme-secondary);
    }

    &.revealed {
      background-color: var(--app-theme-warning);
      border-color: var(--app-theme-danger);
    }
  }
</style>
