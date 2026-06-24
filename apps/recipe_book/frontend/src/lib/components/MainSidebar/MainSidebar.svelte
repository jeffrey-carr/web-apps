<script lang="ts">
  import { goto } from '$app/navigation';
  import {
    Button,
    Checkbox,
    Input,
    ReactiveIcon,
    Spinner,
    type User,
  } from '@jeffrey-carr/frontend-common';
  import styles from './styles.module.scss';
  import clsx from 'clsx';
  import type { Tag, SearchOptions } from '$lib/types/recipe';
  import { userState } from '$lib/globals/user.svelte';
  import UserProfileButton from '../UserProfileButton/UserProfileButton.svelte';
  import { greetUser } from '$lib/mappers/greeting';
  import TagSelector from './TagSelector/TagSelector.svelte';

  let {
    user,
    onApplyFilters,
    tags = [],
    loadingTags = false,
    nameValue = $bindable(''),
    selectedTags = $bindable([]),
    inverseTags = $bindable([]),
    favoritesOnlyValue = $bindable(false),
    includeDraftsValue = $bindable(false),
    loginURL = '',
  }: {
    user?: User | null;
    onApplyFilters?: (opts: SearchOptions) => Promise<void>;
    tags?: Tag[];
    loadingTags?: boolean;
    nameValue?: string;
    selectedTags?: Tag[];
    inverseTags?: Tag[];
    favoritesOnlyValue?: boolean;
    includeDraftsValue?: boolean;
    loginURL?: string;
  } = $props();

  let selected = $state('filters');
  let loadingCreate = $state(false);

  let loadingApply = $state(false);

  const openSection = (section: string) => {
    if (section === 'create') {
      loadingCreate = true;
      goto('/create');
      return;
    }

    selected = section;
  };

  const applyFilters = async () => {
    loadingApply = true;
    const filters: SearchOptions = {
      recipeName: nameValue,
      favoritesOnly: favoritesOnlyValue,
      includeDrafts: includeDraftsValue,
      selectedTagUUIDs: selectedTags.map(t => t.uuid),
      inverseTagUUIDs: inverseTags.map(t => t.uuid),
    };

    await onApplyFilters?.(filters);
    loadingApply = false;
  };

  const clearFilters = () => {
    nameValue = '';
    favoritesOnlyValue = false;
    includeDraftsValue = false;
    selectedTags = [];
    inverseTags = [];
    applyFilters();
  };

  const handleEnter = (e: KeyboardEvent) => {
    if (e.key !== 'Enter') return;
    e.preventDefault();
    applyFilters();
  };
</script>

<div class={styles.container}>
  <div class={styles.mobileUserContainer}>
    {#if userState.isLoading}
      <Spinner class={styles.userLoadingSpinner} />
    {:else if userState.user != null}
      <UserProfileButton user={userState.user} />
      <p>{greetUser(userState.user.fName)}</p>
    {:else}
      <Button size="sm" variant="secondary" shape="round" href={loginURL}>Log in</Button>
    {/if}
  </div>

  <div class={styles.header}>
    {#if user}
      <button class={styles.item} onclick={() => openSection('create')}>
        {#if loadingCreate}
          <Spinner size="1.5rem" />
        {:else}
          <ReactiveIcon icon="plus" />
          <span class={styles.itemLabel}>New Recipe</span>
        {/if}
      </button>
    {/if}
    <button
      class={clsx(styles.item, { [styles.selected]: selected === 'filters' })}
      onclick={() => openSection('filters')}
    >
      <ReactiveIcon icon={selected === 'filters' ? 'funnel-fill' : 'funnel'} />
      <span class={styles.itemLabel}>Filters</span>
    </button>
    <!-- TODO - timers -->
  </div>
  <div class={styles.body}>
    <Input
      class={styles.search}
      bind:value={nameValue}
      label="Search"
      placeholder="Search recipes..."
      onkeydown={handleEnter}
    />
    {#if user}
      <Checkbox label="Favorites only" bind:checked={favoritesOnlyValue} />
      <Checkbox label="Show drafts" bind:checked={includeDraftsValue} />
    {/if}
    <TagSelector {tags} bind:selected={selectedTags} bind:inverse={inverseTags} {loadingTags} />

    <!-- TODO: author search -->
    <!-- <Select -->
    <!--   label="Author" -->
    <!--   class={styles.search} -->
    <!--   options={[ -->
    <!--     { label: 'All', value: '' }, -->
    <!--     { label: 'Jeff', value: 'jeff' }, -->
    <!--     { label: 'Sara', value: 'sara' }, -->
    <!--   ]} -->
    <!-- /> -->

    <Button onclick={applyFilters} loading={loadingApply}>Apply filters</Button>
    <Button variant="secondary" onclick={clearFilters}>Clear filters</Button>
  </div>
</div>
