<script lang="ts">
  import { RadialTimer } from '@jeffrey-carr/frontend-common';

  let {
    word,
    locked,
    correct = false,
    onUpdate,
    timedOutUntil,
  }: {
    word: string;
    locked: boolean;
    correct?: boolean;
    onUpdate?: (newWord: string) => void;
    timedOutUntil?: number;
  } = $props();

  const HIDDEN_LETTER = '?';
  const TIMED_OUT_CLASS = 'timed-out';

  let inputElement = $state<HTMLInputElement>();
  let timeoutID: NodeJS.Timeout | undefined;

  let revealedLetters = $derived(word.split('').filter(letter => letter !== HIDDEN_LETTER));
  let guess = $state('');
  let fullGuess = $derived(revealedLetters.join('') + guess);
  let displayGuess = $state(word.split(''));

  let activeClass = $derived(locked ? '' : 'active');
  let timeoutClass = $state('');
  let correctClass = $derived(correct ? 'correct' : '');

  $effect(() => {
    if (!locked && !timeoutClass) {
      inputElement?.focus();
    }
  });

  $effect(() => {
    if (timedOutUntil != null) {
      clearTimeout(timeoutID);

      const now = new Date();
      const end = new Date(timedOutUntil);

      if (isNaN(end.getTime())) {
        return;
      }

      const duration = Math.max(0, end.getTime() - now.getTime());
      if (duration === 0) {
        return;
      }

      timeoutClass = TIMED_OUT_CLASS;
      timeoutID = setTimeout(onTimeout, duration);
      guess = '';
      displayGuess = word.split('');
    }

    return () => clearTimeout(timeoutID);
  });

  const onTimeout = () => {
    timeoutClass = '';
    if (!locked) {
      inputElement?.focus();
    }
  };

  const onInputUpdate = () => {
    const newDisplayGuess: string[] = Array(word.length).fill('?');
    // Is this the weirdest and least efficient way to do this? Probably!
    displayGuess = fullGuess.split('').concat(newDisplayGuess).slice(0, word.length);

    onUpdate?.(fullGuess);
  };
</script>

<div class="container">
  <RadialTimer until={timedOutUntil} />
  <input
    bind:this={inputElement}
    class="input"
    type="text"
    bind:value={guess}
    disabled={locked || timeoutClass === TIMED_OUT_CLASS}
    maxlength={word.length}
    oninput={onInputUpdate}
  />
  <div class={`letters-container ${activeClass} ${timeoutClass}`}>
    {#each displayGuess as letter, i}
      <div
        class={`letter ${i < revealedLetters.length ? 'revealed' : ''} ${i === 0 ? 'left' : ''} ${i === word.length - 1 ? 'right' : ''} ${activeClass} ${correctClass}`}
      >
        {#if letter !== HIDDEN_LETTER}
          {letter}
        {/if}
      </div>
    {/each}
  </div>
</div>

<style lang="scss">
  .container {
    position: relative;
    display: flex;
    align-items: center;
    gap: 1rem;

    height: 100%;
    width: fit-content;
  }

  .input {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;

    height: 100%;
    width: 100%;

    opacity: 0;
  }

  .letters-container {
    position: relative;
    display: flex;

    height: 100%;
  }

  .letters-container.timed-out {
    opacity: 0.7;
  }

  .letters-container .timer-container {
    position: absolute;
    top: 50%;
    left: -2.5rem;

    transform: translateY(-50%);
  }

  .letter {
    --b-rad: 5px;
    --transition-ms: 100ms;

    display: flex;
    justify-content: center;
    align-items: center;

    height: 100%;
    aspect-ratio: 1 / 1;

    border: 1px solid var(--app-theme-primary);

    font-size: 1.4rem;
    text-transform: uppercase;

    transition:
      color linear var(--default-transition-ms),
      border-color linear var(--default-transition-ms);
  }

  .letter.active {
    border-color: var(--app-theme-secondary);
  }

  .letter.correct {
    animation: correct 500ms linear;
  }

  .letter.revealed {
    border-color: var(--app-theme-danger) !important;
    color: var(--app-theme-warning);
  }

  .timed-out .letter {
    border-color: var(--red);
  }

  .letter.left {
    border-top-left-radius: var(--b-rad);
    border-bottom-left-radius: var(--b-rad);
  }

  .letter.right {
    border-top-right-radius: var(--b-rad);
    border-bottom-right-radius: var(--b-rad);
  }

  @keyframes correct {
    0% {
    }

    10% {
      border-color: var(--app-theme-success);
    }

    100% {
      border-color: var(--app-theme-primary);
    }
  }
</style>
