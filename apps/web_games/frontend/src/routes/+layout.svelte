<script lang="ts">
  import './reset.css';
  import './globals.css';

  let { children }: { children?: () => any } = $props();
</script>

<svelte:head>
  <link
    href="https://fonts.googleapis.com/css2?family=Comic+Relief:wght@400;700&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Raleway:ital,wght@0,100..900;1,100..900&family=Tagesschrift&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<main class="container">
  {@render children?.()}
</main>

<style lang="scss">
  .container {
    height: 100vh;
    width: 100vw;

    margin: 0;

    background-color: var(--app-theme-background);
  }
</style>
