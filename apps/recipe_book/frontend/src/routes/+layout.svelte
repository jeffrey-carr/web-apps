<script lang="ts">
  import './reset.css';
  import './globals.css';

  let { children }: { children?: () => any } = $props();
</script>

<svelte:head>
  <title>Recipe Book</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Atma:wght@300;400;500;600;700&family=Quicksand:wght@300..700&display=swap" rel="stylesheet">
</svelte:head>

<main class="container">
  <div class="child-container">
    {@render children?.()}
  </div>
</main>

<style lang="scss">
  .container {
    --navbar-height: 5rem;

    position: relative;
    height: 100vh;
    width: 100vw;

    margin: 0;

    background-color: var(--app-theme-background);
  }

  .child-container {
    padding: 1rem;
  }
</style>
