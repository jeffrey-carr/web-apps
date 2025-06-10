<script lang="ts">
  import { GameButton } from '$lib/components';
  import { Icon as BinokuIcon } from '$lib/components/binoku';
  import { Icon as WordChainIcon } from '$lib/components/word-chain';
  // import bg from '$lib/assets/bg.png';
</script>

<main class="main">
  <h1 class="title">Jeff's Web Games</h1>
  <div class="games-container">
    <GameButton icon={BinokuIcon} name="Binoku" slug="/binoku" />
    <GameButton icon={WordChainIcon} name="Word Chain" slug="/word-chain" />
  </div>
</main>

<style lang="scss">
  .main {
    height: 100vh;

    background-image: url('../lib/assets/bg.png');

    overflow-x: hidden;
  }

  .title {
    margin: 2rem 1rem 1rem 1rem;
    margin-bottom: 1.5rem;

    color: var(--rosewater);
    text-align: center;
  }

  .games-container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 2rem;
  }
</style>
