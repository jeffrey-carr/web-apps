<script lang="ts">
  let { class: className, icon }: { class?: string; icon: 'left-arrow' | 'right-arrow' } = $props();

  let containerClass = $derived(className ? `container ${className}` : 'container');
  // $inspect(icon);
  // $inspect(containerClass);
</script>

<svg class={containerClass} fill="currentColor" viewBox="0 0 16 16">
  {#if icon === 'left-arrow'}
    hello
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
    // max-height: 100%;
    // max-width: 100%;
  }
</style>
