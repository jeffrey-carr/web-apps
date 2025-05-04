<script lang="ts">
  import { Button } from '@jeffrey-carr/frontend-common';
  import { GameCard } from '$lib/components';
  import binokuIcon from '$lib/assets/binoku/game-icon.svg';
  import wordChainIcon from '$lib/assets/word-chain/game-icon.svg';

  type ServerResponse = {
    status: number;
    data: {
      message: string;
    };
  };

  let message = $state('');
  let timeout: NodeJS.Timeout | undefined = $state();

  const pingPong = async () => {
    const response = await fetch('http://localhost:8080/ping');
    const json: ServerResponse = await response.json();

    if (response.status !== 200) {
      console.error('Error!!!', response.status);
      return;
    }

    clearTimeout(timeout);
    message = json.data.message;
    timeout = setTimeout(() => {
      message = '';
    }, 5000);
  };
</script>

<main class="main">
  <div class="header">
    <h1>Jeff's Web Games</h1>
  </div>

  <div class="games">
    <GameCard
      slug="/binoku"
      name="Binoku"
      description="A two-toned sudoku game for the ages"
      icon={binokuIcon}
    />
    <GameCard
      slug="/word-chain"
      name="Word Chain"
      description="Can you climb the chain?"
      icon={wordChainIcon}
    />
  </div>

  <Button onclick={pingPong} size="medium" type="secondary">Ping!</Button>
  <p>{message}</p>
</main>

<style lang="scss">
  .header {
    width: 100%;

    padding: 1rem;

    text-align: center;
  }

  .games {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;

    height: 100%;
  }
</style>
