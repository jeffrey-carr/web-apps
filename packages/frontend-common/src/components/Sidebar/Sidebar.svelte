<script lang="ts">
  let {
    open = $bindable(),
    children,
  }: {
    title?: string;
    open: boolean;
    children: () => any;
  } = $props();
  let openClassStr = $derived(open ? 'open' : '');

  const close = () => {
    open = false;
  };
</script>

<div class="sidebar-container">
  <div class={`sidebar ${openClassStr}`}>
    {@render children()}
  </div>
</div>
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class={`overlay ${openClassStr}`} onclick={close} aria-label="Close sidebar"></div>

<style lang="scss">
  .sidebar-container {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1001;

    max-width: 450px;
    min-width: 350px;
    height: 100vh;

    pointer-events: none;

    overflow: hidden;
  }

  .sidebar {
    position: relative;
    top: 0;
    right: -100%;

    pointer-events: all;

    width: 100%;
    height: 100%;

    transition: right 200ms linear;

    &.open {
      right: 0;
    }
  }

  .overlay {
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: 1000;

    opacity: 0;

    background-color: black;

    transition: opacity 200ms linear;

    pointer-events: none;

    &.open {
      opacity: 0.7;

      pointer-events: all;
    }
  }
</style>
