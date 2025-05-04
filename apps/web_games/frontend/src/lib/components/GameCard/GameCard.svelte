<script lang="ts">
  import { goto } from '$app/navigation';

  let {
    slug,
    name,
    description,
    icon,
    iconAlt,
  }: {
    slug: string;
    name: string;
    description: string;
    icon: string;
    iconAlt?: string;
  } = $props();

  const navigate = () => {
    goto(slug);
  };
</script>

<button class="container" onclick={navigate}>
  <div class="left-container">
    <img class="game-icon" src={icon} alt={iconAlt ?? `${name} icon`} />
  </div>
  <div class="right-container">
    <div class="header">
      <h2>{name}</h2>
    </div>
    <div class="body">
      <p>{description}</p>
    </div>
  </div>
</button>

<style lang="scss">
  .container {
    display: flex;

    border: 1px solid var(--app-theme-secondary);
    border-radius: 8px;

    background-color: transparent;

    width: 50%;
    min-width: 250px;

    transition:
      background-color var(--default-transition-ms) linear,
      color var(--default-transition-ms) linear;

    &:hover {
      cursor: pointer;

      color: var(--app-theme-secondary);
      background-color: var(--bg-color-overlay);
    }
  }

  .left-container {
    flex: 1;

    display: flex;
    justify-content: center;
    align-items: center;

    padding: 0.5rem;
  }

  .right-container {
    flex: 5;

    width: 100%;

    border-left: 1px solid var(--app-theme-subtle);

    text-align: left;
  }

  .header {
    width: 100%;

    border-bottom: 1px solid var(--app-theme-subtle);

    margin: 0.4rem;
    margin-left: 0;
    padding: 0.2rem 0.5rem;
  }

  .body {
    margin: 0.4rem;
    margin-left: 0;
    padding: 0.2rem 0.5rem;
  }
</style>
