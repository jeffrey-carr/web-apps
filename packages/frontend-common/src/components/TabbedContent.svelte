<script lang="ts">
  type TabItem = {
    title: string;
    content: () => any;
  };

  let { items }: { items: TabItem[] } = $props();
  let selected = $state(0);
</script>

<div class="container">
  <div class="tabs">
    {#each items as item, i}
      <button class={`tab ${selected === i ? 'selected' : ''}`} onclick={() => (selected = i)}>
        {item.title}
      </button>
    {/each}
  </div>
  <div class="content">
    {@render items[selected].content()}
  </div>
</div>

<style lang="scss">
  .container {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    width: 100%;
  }

  .tabs {
    display: flex;
    justify-content: center;

    width: 100%;
  }

  .tab {
    width: 13rem;
    height: 3.5rem;

    color: var(--theme-text-primary);

    background-color: transparent;

    &:hover {
      cursor: pointer;
    }

    &.selected {
      color: var(--theme-text-secondary);
      background-color: var(--theme-secondary);
    }
  }
</style>
