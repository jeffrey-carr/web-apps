<script lang="ts">
  import { goto } from '$app/navigation';
  import { Button, ExpandButton } from '@jeffrey-carr/frontend-common';

  let board = $state();
  let showTutorial = $state(false);

  const toggleTutorial = () => {
    showTutorial = !showTutorial;
  };

  const fetchGame = async () => {};

  const back = () => {
    goto('/');
  };

  const newGame = () => {
    console.log('Not implemented!');
  };
</script>

<main class="container">
  <div class="back-button-container">
    <ExpandButton onclick={back}>Back to main</ExpandButton>
  </div>
  <h1>Binoku</h1>
  <div class="buttons-container">
    <Button size="large" onclick={newGame}>New Game</Button>
    <Button size="medium" onclick={toggleTutorial} type="secondary">How to play</Button>
  </div>
</main>

<style lang="scss">
  .back-button-container {
    position: absolute;
    top: 1rem;
    left: 1rem;
  }

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;

    height: 100vh;
    width: 100vw;

    padding: 1rem;

    h1 {
      font-size: 5rem;
    }
  }

  .buttons-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
</style>
