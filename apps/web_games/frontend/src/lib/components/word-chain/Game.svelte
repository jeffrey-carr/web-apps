<script lang="ts">
  import type { PlayerData, SSEProgressUpdateData } from '$lib/types/word-chain';
  import { RadialTimer, Spinner } from '@jeffrey-carr/frontend-common';
  import { onMount, tick } from 'svelte';
  import OpponentProgress from './OpponentProgress.svelte';

  const getRevealedLetters = (word: string): string => {
    const firstMissing = word.indexOf('?');
    if (firstMissing < 0) return word;
    return word.substring(0, firstMissing);
  };

  let {
    chain = $bindable(),
    progress,
    timedOutUntil = $bindable(),
    onMakeGuess,
    opponent,
    opponentUpdate,
  }: {
    chain: string[];
    progress: number;
    timedOutUntil?: number;
    onMakeGuess: (guess: string) => Promise<void>;
    opponent?: PlayerData;
    opponentUpdate?: SSEProgressUpdateData;
  } = $props();

  let revealedLetters = $derived(chain[progress] ? getRevealedLetters(chain[progress]) : '');
  let maxWordLength = $derived(Math.max(...chain.map(w => w.length), 1));
  let wordInput = $state('');
  let makingGuess = $state(false);
  let isInputLocked = $derived(
    makingGuess || timedOutUntil != undefined || progress >= chain.length
  );

  let inputElement = $state<HTMLInputElement>();
  let wordRowElements = $state<HTMLDivElement[]>([]);
  let activeInputTop = $state(0);
  let activeInputHeight = $state(80);
  let keyboardInset = $state(0);

  const updateActiveInputPosition = () => {
    const activeRow = wordRowElements[progress];
    if (!activeRow) return;
    activeInputTop = activeRow.offsetTop;
    activeInputHeight = activeRow.offsetHeight;
  };

  const scrollActiveWordIntoView = (smooth = true) => {
    if (typeof window === 'undefined') return;
    const activeRow = wordRowElements[progress];
    if (!activeRow) return;

    const clueRow = wordRowElements[Math.max(0, progress - 1)] ?? activeRow;
    const clueRect = clueRow.getBoundingClientRect();
    const activeRect = activeRow.getBoundingClientRect();

    const vv = window.visualViewport;
    const vvTop = vv ? vv.offsetTop : 0;
    const vvHeight = vv ? vv.height : window.innerHeight;
    const isMobileView = window.innerWidth <= 768 || vvHeight < 550;

    const topOffset = isMobileView && opponent ? 64 : 16;
    const usableTop = vvTop + topOffset;
    const usableBottom = vvTop + vvHeight - 16;

    if (!isMobileView && clueRect.top >= usableTop && activeRect.bottom <= usableBottom) {
      return;
    }

    const pairCenterY = (clueRect.top + activeRect.bottom) / 2;
    const targetCenterY = usableTop + (usableBottom - usableTop) * 0.45;
    const deltaY = pairCenterY - targetCenterY;

    if (Math.abs(deltaY) > 6) {
      window.scrollBy({
        top: deltaY,
        behavior: smooth ? 'smooth' : 'instant',
      });
    }
  };

  const focusInputElement = () => {
    if (!inputElement || progress >= chain.length) return;
    inputElement.focus({ preventScroll: true });
    scrollActiveWordIntoView(true);
  };

  const makeGuess = async (guess: string) => {
    makingGuess = true;
    try {
      await onMakeGuess(guess);
    } finally {
      wordInput = '';
      if (inputElement) {
        inputElement.value = '';
      }
      makingGuess = false;
      await tick();
      updateActiveInputPosition();
      focusInputElement();
    }
  };

  const handleBeforeInput = (e: InputEvent) => {
    if (isInputLocked) {
      e.preventDefault();
    }
  };

  const handleInput = (e: Event) => {
    const target = e.currentTarget as HTMLInputElement;
    if (isInputLocked) {
      target.value = makingGuess ? wordInput : '';
      if (!makingGuess) {
        wordInput = '';
      }
      return;
    }

    const currentWord = chain[progress] ?? '';
    const remainingLetters = Math.max(0, currentWord.length - revealedLetters.length);
    const cleaned = target.value.replace(/[^a-zA-Z]/g, '').slice(0, remainingLetters);
    wordInput = cleaned;
    if (target.value !== cleaned) {
      target.value = cleaned;
    }
  };

  $effect(() => {
    if (chain) {
      wordInput = '';
      if (inputElement) {
        inputElement.value = '';
      }
    }
  });

  $effect(() => {
    // Track progress changes to reposition the input and keep active + clue rows in view
    const _currentProgress = progress;
    tick().then(() => {
      updateActiveInputPosition();
      if (!makingGuess && timedOutUntil == undefined) {
        focusInputElement();
      } else {
        scrollActiveWordIntoView(true);
      }
    });
  });

  $effect(() => {
    if (makingGuess || timedOutUntil != undefined || progress >= chain.length) return;
    const currentWord = chain[progress];
    const remainingLetters = currentWord.length - revealedLetters.length;
    if (remainingLetters > 0 && wordInput.length >= remainingLetters) {
      makeGuess(revealedLetters + wordInput);
    }
  });

  onMount(() => {
    updateActiveInputPosition();
    focusInputElement();

    const vv = window.visualViewport;
    const handleViewportChange = () => {
      updateActiveInputPosition();
      if (vv) {
        keyboardInset = Math.max(0, window.innerHeight - vv.height - vv.offsetTop);
      }
      if (document.activeElement === inputElement) {
        scrollActiveWordIntoView(false);
      }
    };

    vv?.addEventListener('resize', handleViewportChange);
    window.addEventListener('resize', handleViewportChange);

    return () => {
      vv?.removeEventListener('resize', handleViewportChange);
      window.removeEventListener('resize', handleViewportChange);
    };
  });

  const handleEndTimeout = () => {
    timedOutUntil = undefined;
    wordInput = '';
    if (inputElement) {
      inputElement.value = '';
    }
    focusInputElement();
  };
</script>

{#snippet word(i: number, inFocus: boolean)}
  <div class="word-container" bind:this={wordRowElements[i]}>
    <div class="side-column">
      {#if inFocus}
        {#if makingGuess}
          <Spinner size="1.2rem" />
        {:else if timedOutUntil}
          <RadialTimer until={timedOutUntil} onComplete={handleEndTimeout} />
        {/if}
      {/if}
    </div>
    <div
      class="word"
      class:in-focus={inFocus}
      class:timed-out={inFocus && timedOutUntil != undefined}
    >
      {#each chain[i].split('') as letter, j (j)}
        <div class="word-cell">
          {#if inFocus}
            {#if j < revealedLetters.length}
              <p class="letter">{revealedLetters[j]}</p>
            {:else if j - revealedLetters.length < wordInput.length}
              <p class="letter">{wordInput[j - revealedLetters.length]}</p>
            {:else if letter !== '?'}
              <p class="letter">{letter}</p>
            {/if}
          {:else if letter !== '?'}
            <p class="letter">{letter}</p>
          {/if}
        </div>
      {/each}
    </div>
  </div>
{/snippet}

<div
  class="container"
  style:--keyboard-inset={`${keyboardInset}px`}
  style:--max-word-len={maxWordLength}
>
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="all-words-list" onclick={focusInputElement}>
    <input
      class="word-input"
      type="text"
      inputmode="text"
      autocomplete="off"
      autocorrect="off"
      autocapitalize="characters"
      spellcheck="false"
      enterkeyhint="done"
      aria-label="Word guess input"
      bind:this={inputElement}
      value={wordInput}
      onbeforeinput={handleBeforeInput}
      oninput={handleInput}
      onfocus={() => scrollActiveWordIntoView(true)}
      style:top={`${activeInputTop}px`}
      style:height={`${activeInputHeight}px`}
    />
    {#each chain as _, i}
      {@render word(i, i === progress)}
    {/each}
  </div>

  {#if opponent}
    <div class="opponent-wrapper">
      <OpponentProgress {chain} {opponent} latestUpdate={opponentUpdate} />
    </div>
  {/if}
</div>

<style lang="scss">
  .container {
    display: flex;
    justify-content: center;
    gap: 1.5rem;

    height: 100%;
    width: 100%;

    padding: 2rem 0;
  }

  .opponent-wrapper {
    display: contents;
  }

  .all-words-list {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  }

  .word-container {
    display: flex;
    gap: 0.5rem;
  }

  .side-column {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 1.5rem;
  }

  .word {
    position: relative;
    display: flex;

    &.in-focus .word-cell {
      border-color: var(--app-theme-secondary);
    }

    &.timed-out {
      opacity: 0.75;

      .word-cell {
        border-color: var(--app-theme-danger);
      }
    }
  }

  .word-input {
    position: absolute;
    left: 0;
    z-index: 2;

    width: 100%;

    opacity: 0;
    font-size: 16px;
    caret-color: transparent;

    &:hover {
      cursor: inherit;
    }
  }

  .word-cell {
    display: flex;
    justify-content: center;
    align-items: center;

    --size: 5rem;
    height: var(--size);
    width: var(--size);

    border: 1px solid var(--app-theme-primary);
    transition: border-color 150ms ease;

    &:first-of-type {
      border-top-left-radius: var(--border-radius-sm);
      border-bottom-left-radius: var(--border-radius-sm);
    }
    &:last-of-type {
      border-top-right-radius: var(--border-radius-sm);
      border-bottom-right-radius: var(--border-radius-sm);
    }
  }

  .letter {
    font-size: 2rem;
    text-transform: uppercase;
  }

  @media (max-width: 768px) {
    .container {
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      gap: 0.75rem;

      padding: 0.75rem 0.5rem calc(var(--keyboard-inset, 0px) + 45dvh);
    }

    .opponent-wrapper {
      display: block;
      order: -1;
      position: sticky;
      top: 0.4rem;
      z-index: 10;
      width: 100%;
      max-width: 26rem;
      padding: 0 0.5rem;
    }

    .all-words-list {
      gap: 0.6rem;
    }

    .word-cell {
      --size: clamp(2.35rem, min(11.5vw, calc((100vw - 3.5rem) / var(--max-word-len, 6))), 3.1rem);
    }

    .letter {
      font-size: clamp(1.25rem, 4.5vw, 1.6rem);
    }
  }
</style>
