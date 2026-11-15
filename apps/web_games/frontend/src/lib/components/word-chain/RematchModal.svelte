<script lang="ts">
  import type { PlayerData } from '$lib/types/word-chain';
  import { Button, CharacterIcon, Modal } from '@jeffrey-carr/frontend-common';
  import gsap from 'gsap';
  import { onDestroy, tick } from 'svelte';

  let {
    open = $bindable(false),
    opponent,
    onAccept,
    onDecline,
  }: {
    open: boolean;
    opponent?: PlayerData;
    onAccept: () => Promise<void>;
    onDecline: () => Promise<void>;
  } = $props();

  let accepting = $state(false);
  let declining = $state(false);
  let boardElement = $state<HTMLDivElement>();
  let leftRopeElement = $state<HTMLDivElement>();
  let rightRopeElement = $state<HTMLDivElement>();
  let avatarFrameElement = $state<HTMLDivElement>();
  let wasOpen = false;

  let opponentName = $derived(opponent?.name ?? 'Your opponent');

  const getModalShell = (): HTMLElement | null => {
    return boardElement?.parentElement ?? null;
  };

  const playDropAnimation = async () => {
    await tick();
    const modalShell = getModalShell();
    if (!modalShell) return;

    gsap.killTweensOf([modalShell, leftRopeElement, rightRopeElement, avatarFrameElement]);

    const tl = gsap.timeline();

    tl.set(modalShell, {
      xPercent: -50,
      yPercent: -50,
      y: '-88vh',
      rotation: -4.5,
    });

    if (leftRopeElement && rightRopeElement) {
      tl.set([leftRopeElement, rightRopeElement], {
        scaleY: 1,
        transformOrigin: 'top center',
      });
    }

    if (avatarFrameElement) {
      tl.set(avatarFrameElement, {
        scale: 0.78,
      });
    }

    // Drop down from the ceiling on ropes with elastic bounce
    tl.to(modalShell, {
      y: 0,
      duration: 0.95,
      ease: 'elastic.out(1, 0.55)',
    });

    // Subtle rope tension stretch when the sign catches at the bottom
    if (leftRopeElement && rightRopeElement) {
      tl.to(
        [leftRopeElement, rightRopeElement],
        {
          keyframes: [
            { scaleY: 1.045, duration: 0.22, ease: 'power2.out' },
            { scaleY: 0.985, duration: 0.2, ease: 'sine.inOut' },
            { scaleY: 1, duration: 0.25, ease: 'sine.out' },
          ],
        },
        0.18
      );
    }

    // Pendulum swing as the sign settles on the two ropes
    tl.to(
      modalShell,
      {
        keyframes: [
          { rotation: 3.2, duration: 0.28, ease: 'sine.inOut' },
          { rotation: -1.8, duration: 0.28, ease: 'sine.inOut' },
          { rotation: 0.85, duration: 0.24, ease: 'sine.inOut' },
          { rotation: 0, duration: 0.22, ease: 'sine.out' },
        ],
      },
      0.16
    );

    if (avatarFrameElement) {
      tl.to(
        avatarFrameElement,
        {
          scale: 1,
          duration: 0.45,
          ease: 'back.out(1.8)',
        },
        0.22
      );
    }
  };

  const playHoistAnimation = async () => {
    const modalShell = getModalShell();
    if (!modalShell) return;

    gsap.killTweensOf([modalShell, leftRopeElement, rightRopeElement]);

    await gsap.to(modalShell, {
      y: '-88vh',
      rotation: 2.5,
      duration: 0.32,
      ease: 'back.in(1.3)',
    });
  };

  $effect(() => {
    if (open && !wasOpen) {
      wasOpen = true;
      playDropAnimation();
    } else if (!open && wasOpen) {
      wasOpen = false;
    }
  });

  onDestroy(() => {
    const modalShell = getModalShell();
    if (modalShell) gsap.killTweensOf(modalShell);
    if (leftRopeElement) gsap.killTweensOf(leftRopeElement);
    if (rightRopeElement) gsap.killTweensOf(rightRopeElement);
    if (avatarFrameElement) gsap.killTweensOf(avatarFrameElement);
  });

  const handleAccept = async () => {
    if (accepting || declining) return;
    accepting = true;
    try {
      await onAccept();
      await playHoistAnimation();
      open = false;
    } finally {
      accepting = false;
    }
  };

  const handleDecline = async () => {
    if (accepting || declining) return;
    declining = true;
    try {
      await onDecline();
      await playHoistAnimation();
      open = false;
    } finally {
      declining = false;
    }
  };
</script>

<Modal bind:open class="rematch-modal-shell">
  <div class="rematch-board" bind:this={boardElement}>
    <div class="rope-assembly left" aria-hidden="true">
      <div class="rope-strand" bind:this={leftRopeElement}></div>
      <div class="rope-ring"></div>
      <div class="rope-bracket"></div>
    </div>

    <div class="rope-assembly right" aria-hidden="true">
      <div class="rope-strand" bind:this={rightRopeElement}></div>
      <div class="rope-ring"></div>
      <div class="rope-bracket"></div>
    </div>

    <div class="board-header">
      <span class="eyebrow">CHALLENGE INCOMING</span>
      <h2 class="title">Rematch?</h2>
    </div>

    <div class="challenger-section">
      {#if opponent}
        <div class="avatar-frame" bind:this={avatarFrameElement}>
          <CharacterIcon character={opponent.character} />
        </div>
      {/if}
      <p class="challenge-message">
        <strong>{opponentName}</strong> wants to run it back for another round!
      </p>
    </div>

    <div class="actions">
      <Button onclick={handleAccept} loading={accepting} disabled={declining} size="lg">
        Accept Rematch
      </Button>
      <Button
        onclick={handleDecline}
        loading={declining}
        disabled={accepting}
        variant="secondary"
        size="lg"
      >
        Decline
      </Button>
    </div>
  </div>
</Modal>

<style lang="scss">
  :global(.rematch-modal-shell) {
    background-color: var(--bg-color-light) !important;
    border: 2px solid var(--app-theme-primary) !important;
    border-radius: var(--border-radius-lg) !important;
    box-shadow:
      0 24px 60px rgba(0, 0, 0, 0.58),
      0 0 32px rgba(242, 213, 207, 0.14);
    color: var(--app-theme-text-primary) !important;
    overflow: visible !important;
    transform-origin: 50% -35vh;
  }

  .rematch-board {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;

    width: min(440px, 88vw);
    max-width: calc(100dvw - 2rem);
    padding: 2.25rem 2rem 2rem;
    text-align: center;
  }

  @media (max-width: 768px) {
    .rematch-board {
      gap: 1rem;
      padding: 1.5rem 1.25rem 1.25rem;
    }

    .rope-assembly {
      &.left {
        left: 2rem;
      }

      &.right {
        right: 2rem;
      }
    }

    .challenger-section {
      padding: 1rem;
      gap: 0.75rem;

      .avatar-frame {
        --size: 4.75rem;
      }

      .challenge-message {
        font-size: 1rem;
      }
    }
  }

  .rope-assembly {
    position: absolute;
    bottom: calc(100% - 6px);
    display: flex;
    flex-direction: column;
    align-items: center;
    pointer-events: none;
    z-index: -1;

    &.left {
      left: 3.25rem;
    }

    &.right {
      right: 3.25rem;
    }
  }

  .rope-strand {
    width: 8px;
    height: 100vh;
    border-radius: 4px;
    background: repeating-linear-gradient(
      38deg,
      var(--app-theme-tertiary) 0px,
      var(--app-theme-tertiary) 6px,
      var(--bg-color-light) 6px,
      var(--bg-color-light) 9px,
      var(--app-theme-primary) 9px,
      var(--app-theme-primary) 13px
    );
    border-left: 1px solid rgba(255, 255, 255, 0.25);
    border-right: 1px solid rgba(0, 0, 0, 0.5);
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.45);
  }

  .rope-ring {
    width: 20px;
    height: 20px;
    margin-top: -4px;
    border-radius: 50%;
    border: 4px solid var(--app-theme-tertiary);
    background-color: var(--bg-color);
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.45);
  }

  .rope-bracket {
    width: 26px;
    height: 10px;
    margin-top: -5px;
    border-radius: var(--border-radius-sm) var(--border-radius-sm) 0 0;
    background-color: var(--app-theme-primary);
    border: 1px solid var(--bg-color-light);
  }

  .board-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.65rem;

    .eyebrow {
      font-family: var(--game-font);
      font-size: 0.72rem;
      letter-spacing: 0.1em;
      padding: 0.35rem 0.65rem;
      border-radius: var(--border-radius-sm);
      background-color: rgba(229, 200, 144, 0.16);
      border: 1px solid rgba(229, 200, 144, 0.4);
      color: var(--app-theme-tertiary);
    }

    .title {
      font-family: var(--app-theme-font);
      font-size: clamp(1.9rem, 3.5vw, 2.5rem);
      font-weight: 700;
      color: var(--app-theme-text-primary);
    }
  }

  .challenger-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    width: 100%;
    padding: 1.25rem;
    border-radius: var(--border-radius-md);
    background-color: rgba(48, 52, 70, 0.65);
    border: 1px solid rgba(198, 208, 245, 0.14);

    .avatar-frame {
      --size: 6.5rem;
      width: var(--size);
      height: var(--size);
      padding: 0.55rem;
      border-radius: 50%;
      background-color: rgba(229, 200, 144, 0.12);
      border: 2px solid var(--app-theme-tertiary);
      box-shadow: 0 0 20px rgba(229, 200, 144, 0.2);
    }

    .challenge-message {
      font-size: 1.15rem;
      line-height: 1.45;
      color: var(--app-theme-text-primary);

      strong {
        color: var(--app-theme-tertiary);
        font-weight: 700;
      }
    }
  }

  .actions {
    display: flex;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
    width: 100%;
  }
</style>
