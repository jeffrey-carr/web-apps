<script lang="ts">
  import { Button, Input, ReactiveIcon } from '@jeffrey-carr/frontend-common';
  import SelectButton from './SelectButton.svelte';
  import type { SearchOptions, Tag } from '$lib/types/recipe';
  import { userState } from '$lib/globals/user.svelte';
  import TagSelector from './TagSelector.svelte';
  import { untrack } from 'svelte';

  let {
    tags,
    loadingTags = false,
    onUpdateFilters,
    startingOpts,
  }: {
    tags?: Tag[];
    loadingTags?: boolean;
    onUpdateFilters?: (opts: SearchOptions) => Promise<void>;
    startingOpts?: SearchOptions;
  } = $props();

  const initialOpts = untrack(() => startingOpts ?? {});
  let recipeName = $state(initialOpts.recipeName ?? '');
  let favoritesOnly = $state(initialOpts.favoritesOnly ?? false);
  let includeDrafts = $state(initialOpts.includeDrafts ?? false);
  let selectedTagUUIDs = $state(initialOpts.selectedTagUUIDs ?? []);
  let inverseTagUUIDs = $state(initialOpts.inverseTagUUIDs ?? []);

  const buildOpts = (): SearchOptions => {
    return {
      recipeName,
      favoritesOnly,
      includeDrafts,
      selectedTagUUIDs: selectedTagUUIDs,
      inverseTagUUIDs: inverseTagUUIDs,
    };
  };

  const applyFilters = () => {
    onUpdateFilters?.(buildOpts());
  };

  const clearFilters = () => {
    recipeName = '';
    favoritesOnly = false;
    includeDrafts = false;
    selectedTagUUIDs = [];
    inverseTagUUIDs = [];

    onUpdateFilters?.(buildOpts());
  };
</script>

<div class="container">
  <Input
    class="search-input-container"
    inputClass="searchInput"
    placeholder="Search for recipes..."
    bind:value={recipeName}
  />

  <div class="buttons-container">
    {#if userState.user}
      <SelectButton icon="heart" bgColor="#FFE2E2" textColor="#C10008" bind:active={favoritesOnly}
        >Favorites</SelectButton
      >
      <SelectButton icon="pencil" bgColor="#FFF9C2" textColor="#3C2B1F" bind:active={includeDrafts}
        >Drafts</SelectButton
      >
    {/if}
    {#if tags}
      <TagSelector
        {tags}
        {loadingTags}
        bind:selectedUUIDs={selectedTagUUIDs}
        bind:inverseUUIDs={inverseTagUUIDs}
      />
    {/if}
    {#if userState.user || tags}
      <div class="separator"></div>
    {/if}
    <Button class="action-button" onclick={applyFilters}>
      Search <ReactiveIcon class="search-icon" icon="arrow-bar-right" />
    </Button>
    <Button class="action-button" variant="plain" onclick={clearFilters}>Clear Filters</Button>
  </div>
</div>

<style lang="scss">
  .container {
    display: flex;
    flex-direction: column;

    width: 100%;
    max-width: 800px;
    box-sizing: border-box;

    margin: 0.5rem 0.5rem 1rem;
    padding: 1rem;

    // border: 1px solid var(--app-theme-primary);
    border-radius: var(--app-theme-border-radius-m);
    box-shadow: 0px 5px 15px 15px var(--app-theme-gray);

    @media (max-width: 768px) {
      margin: 0.5rem auto 1rem;
      width: calc(100% - 2rem);
    }
  }

  .container :global(.search-input-container) {
    width: 100%;

    :global(.searchInput) {
      background-color: var(--bg-color-surface);
      border-radius: var(--app-theme-border-radius-l);
      padding: 0.5rem 1.5rem;
    }
  }

  .buttons-container {
    display: flex;
    gap: 0.35rem;
    align-items: center;

    @media (max-width: 768px) {
      flex-wrap: wrap;
      justify-content: center;
      gap: 0.5rem;
      margin-top: 0.5rem;
    }
  }

  .separator {
    height: 100%;
    width: 1px;

    border-left: 1px solid var(--app-theme-border-color);
    margin: 0 0.5rem;

    opacity: 0.5;

    @media (max-width: 768px) {
      display: none;
    }
  }

  .container :global(.action-button) {
    flex-shrink: 0;
  }
  .container :global(.search-icon) {
    --reactive-icon-size: 1.2rem;
  }
</style>
