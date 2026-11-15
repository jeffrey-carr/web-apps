<script lang="ts">
  import type { PlayerData, SSEProgressUpdateData } from '$lib/types/word-chain';
  import { RadialTimer, Spinner } from '@jeffrey-carr/frontend-common';
  import OpponentProgress from './OpponentProgress.svelte';

  const getRevealedLetters = (word: string): string => {
    const firstMissing = word.indexOf('?');
    if (firstMissing < 0) return word;
    return word.substring(0, firstMissing);
  };

  let {
    chain = $bindable(),
    progress,
    timedOutUntil,
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
  let wordInput = $state('');
  let makingGuess = $state(false);
  let inputElements = $state<HTMLInputElement[]>([]);

  const makeGuess = async (guess: string) => {
    makingGuess = true;
    try {
      await onMakeGuess(guess);
    } finally {
      wordInput = '';
      makingGuess = false;
    }
  };

  $effect(() => {
    if (chain) {
      wordInput = '';
    }
  });

  $effect(() => {
    if (!makingGuess && timedOutUntil == undefined) {
      focusInputElement(progress);
    }
  });

  $effect(() => {
    if (makingGuess || progress >= chain.length) return;
    const currentWord = chain[progress];
    const remainingLetters = currentWord.length - revealedLetters.length;
    if (remainingLetters > 0 && wordInput.length >= remainingLetters) {
      makeGuess(revealedLetters + wordInput);
    }
  });

  const focusInputElement = (i: number) => {
    const input = inputElements[i];
    if (!input) return;

    input.focus();
  };

  const handleEndTimeout = () => {
    timedOutUntil = undefined;
  };
</script>

{#snippet word(i: number, inFocus: boolean)}
  <div class="word-container">
    <div class="side-column">
      {#if inFocus}
        {#if makingGuess}
          <Spinner size="1.2rem" />
        {:else if timedOutUntil}
          <RadialTimer until={timedOutUntil} onComplete={handleEndTimeout} />
        {/if}
      {/if}
    </div>
    <div class="word">
      <input
        class="word-input"
        bind:this={inputElements[i]}
        disabled={makingGuess || timedOutUntil != undefined || !inFocus}
        bind:value={wordInput}
      />
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

<div class="container">
  <div class="all-words-list">
    {#each chain as _, i}
      {@render word(i, i === progress)}
    {/each}
  </div>
  {#if opponent}
    <OpponentProgress {chain} {opponent} latestUpdate={opponentUpdate} />
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
  .all-words-list {
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
  }

  .word-input {
    position: absolute;
    top: 0;
    left: 0;

    height: 100%;
    width: 100%;

    opacity: 0;

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
  }
</style>
