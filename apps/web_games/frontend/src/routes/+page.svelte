<script lang="ts">
  import { GameButton } from '$lib/components';
  import { Icon as BinokuIcon } from '$lib/components/binoku';
  import { Icon as WordChainIcon } from '$lib/components/word-chain';
</script>

<main class="main">
  <div class="games-container">
    <GameButton icon={BinokuIcon} name="Binoku" slug="/binoku" />
    <GameButton icon={WordChainIcon} name="Word Chain" slug="/word-chain" />
  </div>
</main>

<style lang="scss">
  .main {
    height: 100%;

    background-image: url('../lib/assets/bg.png');

    overflow-x: hidden;
  }

  .games-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 2rem;

    height: 100%;
  }
</style>
