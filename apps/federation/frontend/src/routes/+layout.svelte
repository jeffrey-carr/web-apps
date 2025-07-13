<script lang="ts">
  import './reset.css';
  import './globals.css';

  let { children }: { children?: () => any } = $props();
</script>

<svelte:head>
  <title>Central Fed</title>
  <link
    href="https://fonts.googleapis.com/css2?family=Dosis:wght@200..800&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Raleway:ital,wght@0,100..900;1,100..900&display=swap"
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
