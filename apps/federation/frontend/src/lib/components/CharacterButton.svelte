<script lang="ts">
  import { CharacterIcon, type Character } from '@jeffrey-carr/frontend-common';

  let {
    character,
    choose,
    chosen = false,
  }: {
    character: Character;
    choose: (ch: Character) => void;
    chosen?: boolean;
  } = $props();
  let containerClassStr = $derived(`container ${chosen ? 'chosen' : ''}`);

  const onclick = () => {
    choose(character);
  };
</script>

<button class={containerClassStr} {onclick}>
  <CharacterIcon {character} />
</button>

<style lang="scss">
  .container {
    position: relative;

    --size: 5rem;
    height: var(--size);
    width: var(--size);

    text-align: center;

    border: 3px solid var(--app-theme-primary);
    border-radius: 100%;

    transition: background-color 200ms linear;

    &:hover {
      cursor: pointer;

      animation: flashBorder 1s linear infinite;
    }

    &.chosen {
      background-color: var(--app-theme-primary);

      &:hover {
        animation: none;
      }
    }
  }

  @keyframes flashBorder {
    0% {
      border-color: var(--app-theme-primary);
    }
    50% {
      border-color: var(--app-theme-secondary);
    }
    75% {
      border-color: var(--app-theme-secondary);
    }
    100% {
      border-color: var(--app-theme-primary);
    }
  }
</style>
