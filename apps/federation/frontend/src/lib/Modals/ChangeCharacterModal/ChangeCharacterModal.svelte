<script lang="ts">
  import {
    Button,
    CharacterIcon,
    CHARACTERS,
    Modal,
    type Character,
  } from '@jeffrey-carr/frontend-common';
  import styles from './styles.module.scss';
  import clsx from 'clsx';

  let {
    open = $bindable(false),
    initialCharacter,
    onChangeCharacter,
  }: {
    initialCharacter?: Character;
    open?: boolean;
    onChangeCharacter?: (newCharacter: Character) => Promise<boolean>;
  } = $props();
  let currentCharacter = $state(initialCharacter ?? '???');
  let loadingSubmitCharacter = $state(false);

  const submitChangeCharacter = async () => {
    loadingSubmitCharacter = true;
    const success = await onChangeCharacter?.(currentCharacter);
    loadingSubmitCharacter = false;
    if (success) {
      open = false;
    }
  };
</script>

<Modal class={styles.container} bind:open>
  <h1 class={styles.title}>Change Character</h1>
  <div class={styles.characterPicker}>
    <div class={styles.preview}>
      <div class={styles.character}>
        <CharacterIcon character={currentCharacter} />
      </div>
    </div>
    <div class={styles.selector}>
      {#each CHARACTERS as character}
        <button
          class={clsx(styles.characterButton, styles.character)}
          onclick={() => (currentCharacter = character)}
        >
          <CharacterIcon {character} />
        </button>
      {/each}
    </div>
  </div>
  <div class={styles.buttons}>
    <Button
      onclick={submitChangeCharacter}
      disabled={onChangeCharacter == null}
      loading={loadingSubmitCharacter}
    >
      Update Character
    </Button>
    <Button onclick={() => (open = false)} variant="secondary">Cancel</Button>
  </div>
</Modal>
