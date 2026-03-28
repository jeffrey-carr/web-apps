<script lang="ts">
  import { goto } from '$app/navigation';
  import {
    Button,
    Checkbox,
    Input,
    ReactiveIcon,
    Select,
    Spinner,
    type User,
  } from '@jeffrey-carr/frontend-common';
  import styles from './styles.module.scss';
  import clsx from 'clsx';
  import type { Tag, SearchOptions } from '$lib/types/recipe';

  let {
    user,
    onApplyFilters,
    tags = [],
    loadingTags = false,
  }: {
    user?: User | null;
    onApplyFilters?: (opts: SearchOptions) => Promise<void>;
    tags?: Tag[];
    loadingTags?: boolean;
  } = $props();
  let tagOptions = $derived([
    { label: 'All', value: '' },
    ...tags.map(tag => ({
      label: tag.name,
      value: tag.uuid,
    })),
  ]);

  let selected = $state('filters');
  let loadingCreate = $state(false);

  let nameValue = $state('');
  let favoritesOnlyValue = $state(false);
  let tagUUIDValue = $state('');
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
    let tags: string[] | undefined;
    if (tagUUIDValue) {
      tags = [tagUUIDValue];
    }
    const filters: SearchOptions = {
      recipeName: nameValue,
      favoritesOnly: favoritesOnlyValue,
      tagUUIDs: tags,
    };
    if (nameValue || favoritesOnlyValue || tags) {
      // TODO: don't hardcode this
      filters.limit = 10;
    }

    await onApplyFilters?.(filters);
    loadingApply = false;
  };

  const clearFilters = () => {
    nameValue = '';
    favoritesOnlyValue = false;
    tagUUIDValue = '';
    applyFilters();
  };
</script>

<div class={styles.container}>
  <div class={styles.header}>
    {#if user}
      <button class={styles.item} onclick={() => openSection('create')}>
        {#if loadingCreate}
          <Spinner />
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
    />
    {#if user}
      <Checkbox label="Favorites only" bind:checked={favoritesOnlyValue} />
    {/if}
    <Select
      label="Tag"
      class={styles.search}
      options={tagOptions}
      loadingOptions={loadingTags}
      bind:value={tagUUIDValue}
    />
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
