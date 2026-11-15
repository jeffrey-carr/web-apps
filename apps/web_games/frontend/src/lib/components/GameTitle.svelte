<script lang="ts">
  let { title, color, textColor }: { title: string; color?: string; textColor?: string } = $props();
</script>

<div class="container" style:--custom-bg-color={color} style:--custom-text-color={textColor}>
  <h2 class="title">{title}</h2>
</div>

<style lang="scss">
  .container {
    --bg-color: var(--custom-bg-color, var(--yellow));
    --txt-color: var(--custom-text-color, black);

    width: 100%;
    padding: 1rem;

    text-align: center;

    background-color: var(--bg-color);
  }

  .title {
    color: var(--txt-color);
    font-family: var(--app-theme-font);
    font-size: 1.3rem;
  }
</style>
