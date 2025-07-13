<script lang="ts">
  import { CharacterToIcon } from '../../lib/assets/characters';
  import { CharacterToName, type Character } from '../../types';

  let { character }: { character: Character } = $props();

  let src = $derived(CharacterToIcon[character]);
  let alt = $derived(`${CharacterToName[character]} icon`);
</script>

<div class="container">
  <img class="icon" {src} {alt} />
</div>

<style lang="scss">
  .container {
    display: flex;
    align-items: center;
    justify-content: center;

    height: 100%;
    width: 100%;

    padding: 4px;
  }

  .icon {
    width: 100%;
    height: 100%;

    object-fit: contain;
  }
</style>
