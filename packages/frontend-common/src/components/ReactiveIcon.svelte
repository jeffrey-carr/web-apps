<script lang="ts">
  let { icon }: { icon: 'left-arrow' | 'right-arrow' } = $props();
</script>

<svg class="container" fill="currentColor" viewBox="0 0 16 16">
  {#if icon === 'left-arrow'}
    <path
      fill-rule="evenodd"
      d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
    />
  {:else if icon === 'right-arrow'}
    <path
      fill-rule="evenodd"
      d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
    />
  {/if}
</svg>

<style lang="scss">
  .container {
    flex-shrink: 0;

    margin: var(--reactive-icon-margin, 0);
    padding: 0;

    fill: var(--reactive-icon-fill, 'currentColor');

    height: var(--reactive-icon-height, 1.5rem);
    width: var(--reactive-icon-width, 1.5rem);
  }
</style>
