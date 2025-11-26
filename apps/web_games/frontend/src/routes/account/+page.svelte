<script lang="ts">
  import { CharacterIcon, TabbedContent } from '@jeffrey-carr/frontend-common';
  import type { CommonStats } from '$lib/types/stats';

  import { Spinner } from '@jeffrey-carr/frontend-common';
  import type { PageProps } from './$types';

  const loading = false;

  let { data }: PageProps = $props();
  let user = $derived(data.user);
  let stats = $derived(data.stats);
</script>

<main class="container">
  {#if loading}
    <div class="loading-container">
      <div class="spinner">
        <Spinner />
      </div>
      Loading your info...
    </div>
  {:else if !stats || !user}
    <h1>Oops!</h1>
    <p>Error getting stats. Maybe try refreshing?</p>
  {:else}
    <h1 class="title">Your Stats</h1>

    <div class="character-container">
      <CharacterIcon character={user.character} />
    </div>
    <h2 class="greeting">Hey, {user.fName}</h2>

    {#snippet commonStats(stats: CommonStats)}
      <li><b>Games played:</b> {stats.gamesPlayed}</li>
      <li><b>Games completed:</b> {stats.gamesCompleted}</li>
    {/snippet}
    {#snippet binoku()}
      <div class="stats-body">
        <ul class="stats-list">
          {@render commonStats(stats!.binoku)}
        </ul>
      </div>
    {/snippet}
    {#snippet wordChain()}
      <div class="stats-body">
        <ul class="stats-list">
          {@render commonStats(stats!.wordChain)}
        </ul>
      </div>
    {/snippet}
    <div class="stats-container">
      <TabbedContent
        items={[
          { title: 'Binoku', content: binoku },
          { title: 'Word Chain', content: wordChain },
        ]}
      />
    </div>
  {/if}
</main>

<style lang="scss">
  .title {
    margin: 1.2rem;
  }

  .container {
    box-sizing: border-box;

    padding-top: 1rem;

    height: 100%;
    width: 100%;

    text-align: center;
  }

  .loading-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;

    height: 100%;
    width: 100%;

    .spinner {
      --size: 2rem;
      height: var(--size);
      width: var(--size);
    }
  }

  .character-container {
    margin: auto;

    height: 12rem;
    width: 12rem;

    border-radius: 100%;
    border: 10px solid black;

    padding: 15px;
  }

  .greeting {
    font-family: var(--app-theme-readable-font);
    text-transform: capitalize;

    margin-top: 1rem;
  }

  .stats-container {
    margin-top: 2rem;
  }

  .stats-body {
  }

  .stats-list {
    font-size: 2rem;
  }
</style>
