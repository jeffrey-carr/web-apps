<script lang="ts">
  import { RadialTimer } from '@jeffrey-carr/frontend-common';
  let {
    word = '',
    targetWord,
    locked = false,
    correct = false,
    onUpdate,
    timedOutUntil,
    revealedLetters = 1, // Start with just the first letter revealed
  }: {
    word: string;
    targetWord: string;
    locked?: boolean;
    correct?: boolean;
    onUpdate?: (newWord: string) => void;
    timedOutUntil?: number;
    revealedLetters?: number; // Number of letters revealed as hints
  } = $props();

  const TIMED_OUT_CLASS = 'timed-out';

  let guessedLetters = $derived(word.split(''));
  let letters = $derived(targetWord.split(''));

  let activeClass = $derived(locked ? '' : 'active');
  let timeoutClass = $state('');
  let correctClass = $derived(correct ? 'correct' : '');

  let inputElement = $state<HTMLInputElement>();
  let timeoutID: NodeJS.Timeout | undefined;

  $effect(() => {
    if (!locked && !timeoutClass) {
      inputElement?.focus();

      // When focusing, ensure cursor is after the last revealed letter
      if (inputElement && inputElement.value.length > 0) {
        setTimeout(() => {
          const cursorPosition = Math.max(revealedLetters, inputElement?.value.length ?? 1);
          inputElement?.setSelectionRange(cursorPosition, cursorPosition);
        }, 0);
      }
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
    }

    return () => clearTimeout(timeoutID);
  });

  const onTimeout = () => {
    // Refresh the component when timeout is complete
    timeoutClass = '';
    if (!locked) {
      inputElement?.focus();
    }
  };

  const onInputUpdate = (e: Event) => {
    // Skip input handling if we're in a timeout period
    if (timeoutClass === TIMED_OUT_CLASS) return;

    const input = e.currentTarget as HTMLInputElement;
    const value = input.value;
    const cursorPosition = input.selectionStart || 0;

    // Ensure all revealed letters are present and correct
    let newValue = '';
    let shouldReposition = false;

    // Always ensure revealed letters are preserved
    for (let i = 0; i < Math.max(value.length, revealedLetters); i++) {
      if (i < revealedLetters) {
        // This is a revealed letter, must use target word's value
        newValue += targetWord[i];
      } else if (i < value.length) {
        // This is a user-entered letter
        newValue += value[i];
      }
    }

    // If the value changed, update the input and reposition the cursor
    if (newValue !== value) {
      input.value = newValue;
      shouldReposition = true;
    }

    // Reposition cursor if needed
    if (shouldReposition) {
      const newPosition = Math.max(revealedLetters, cursorPosition);
      setTimeout(() => {
        input.setSelectionRange(newPosition, newPosition);
      }, 0);
    }

    onUpdate?.(input.value);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    const input = e.currentTarget as HTMLInputElement;
    const cursorPosition = input.selectionStart || 0;
    const selectionEnd = input.selectionEnd || 0;

    // Prevent any action that would delete revealed letters
    if (
      (e.key === 'Backspace' &&
        cursorPosition <= revealedLetters &&
        selectionEnd <= revealedLetters) ||
      (e.key === 'Delete' && cursorPosition < revealedLetters && selectionEnd < revealedLetters) ||
      (selectionEnd > 0 &&
        cursorPosition < revealedLetters &&
        (e.key === 'Backspace' || e.key === 'Delete' || e.key.length === 1))
    ) {
      e.preventDefault();

      // If it's a typing event with selection that includes revealed letters
      if (
        e.key.length === 1 &&
        cursorPosition < revealedLetters &&
        selectionEnd > revealedLetters - 1
      ) {
        // Replace selection except revealed letters
        let newValue = '';
        for (let i = 0; i < revealedLetters; i++) {
          newValue += targetWord[i];
        }
        newValue += e.key;
        if (selectionEnd < input.value.length) {
          newValue += input.value.substring(selectionEnd);
        }
        input.value = newValue;

        setTimeout(() => {
          input.setSelectionRange(revealedLetters + 1, revealedLetters + 1);
        }, 0);

        onUpdate?.(newValue);
      }
    }

    if (e.key === 'Home') {
      e.preventDefault();
      setTimeout(() => {
        input.setSelectionRange(revealedLetters, revealedLetters);
      }, 0);
    }

    if (e.key === 'ArrowLeft' && cursorPosition <= revealedLetters) {
      e.preventDefault();
      setTimeout(() => {
        input.setSelectionRange(revealedLetters, revealedLetters);
      }, 0);
    }
  };

  const onClick = (e: MouseEvent) => {
    const input = e.currentTarget as HTMLInputElement;
    setTimeout(() => {
      if ((input.selectionStart || 0) < revealedLetters) {
        input.setSelectionRange(revealedLetters, revealedLetters);
      }
    }, 0);
  };

  const onSelect = (e: Event) => {
    const input = e.currentTarget as HTMLInputElement;
    const start = input.selectionStart ?? 0;
    const end = input.selectionEnd ?? 0;

    if (start < revealedLetters) {
      setTimeout(() => {
        // If selection starts before revealedLetters, adjust it
        input.setSelectionRange(revealedLetters, end);
      }, 0);
    }
  };
</script>

<div class="container">
  <input
    bind:this={inputElement}
    class="input"
    type="text"
    value={word}
    disabled={locked || timeoutClass === TIMED_OUT_CLASS}
    maxlength={letters.length}
    oninput={onInputUpdate}
    onkeydown={onKeyDown}
    onclick={onClick}
    onselect={onSelect}
  />
  <div class={`letters-container ${activeClass} ${timeoutClass}`}>
    {#if timedOutUntil && timedOutUntil > new Date().getTime()}
      <div class="timer-container">
        <RadialTimer until={timedOutUntil} />
      </div>
    {/if}
    {#each letters as _, i}
      <div
        class={`letter ${i === 0 ? 'left' : ''} ${i === letters.length - 1 ? 'right' : ''} ${activeClass} ${correctClass} ${i < revealedLetters ? 'revealed' : ''}`}
      >
        {#if i < guessedLetters.length}
          {guessedLetters[i]}
        {/if}
      </div>
    {/each}
  </div>
</div>

<style>
  .container {
    position: relative;
    display: flex;

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
