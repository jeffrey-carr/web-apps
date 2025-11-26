<script lang="ts">
  import { CharacterIcon, type Character } from '@jeffrey-carr/frontend-common';
  import styles from './styles.module.scss';
  import clsx from 'clsx';

  let {
    character,
    choose,
    chosen = false,
  }: {
    character: Character;
    choose: (ch: Character) => void;
    chosen?: boolean;
  } = $props();

  const onclick = () => {
    choose(character);
  };
</script>

<button class={clsx(styles.container, { [styles.chosen]: chosen })} {onclick}>
  <CharacterIcon {character} />
</button>
