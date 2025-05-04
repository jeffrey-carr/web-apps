<script lang="ts">
  import './binoku.css';

  let { children }: { children?: () => any } = $props();
</script>

<svelte:head>
  <link
    href="https://fonts.googleapis.com/css2?family=Doto:wght@100..900&display=swap"
    rel="stylesheet"
  />
</svelte:head>
{@render children?.()}
