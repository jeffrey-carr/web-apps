<script lang="ts">
  import { CharacterIcon, ReactiveIcon, type Character } from '@jeffrey-carr/frontend-common';
  import styles from './styles.module.scss';

  let { character, onclick }: { character: Character; onclick?: () => void } = $props();
</script>

<button class={styles.container} {onclick}>
  <div class={styles.editOverlay}>
    <ReactiveIcon icon="pencil" />
  </div>
  <CharacterIcon {character} />
</button>
