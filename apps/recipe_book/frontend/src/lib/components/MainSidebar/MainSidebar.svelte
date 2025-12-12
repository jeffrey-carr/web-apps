<script lang="ts">
  import { goto } from '$app/navigation';
  import {
    Button,
    Checkbox,
    Input,
    ReactiveIcon,
    Select,
    Spinner,
  } from '@jeffrey-carr/frontend-common';
  import styles from './styles.module.scss';
  import clsx from 'clsx';

  let { onApplyFilters }: { onApplyFilters?: () => void } = $props();

  let selected = $state('filters');
  let loadingCreate = $state(false);

  const openSection = (section: string) => {
    if (section === 'create') {
      loadingCreate = true;
      goto('/create');
      return;
    }

    selected = section;
  };

  const applyFilters = () => {
    console.log('Applying filters!');
    onApplyFilters?.();
  };

  const clearFilters = () => {
    console.log('Clearing filters!');
  };
</script>

<div class={styles.container}>
  <div class={styles.header}>
    <button class={styles.item} onclick={() => openSection('create')}>
      {#if loadingCreate}
        <Spinner />
      {:else}
        <ReactiveIcon icon="plus" />
        <span class={styles.itemLabel}>New Recipe</span>
      {/if}
    </button>
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
    <Input class={styles.search} label="Search" placeholder="Search recipes or ingredients..." />
    <Checkbox label="Favorites only" />
    <Select
      label="Category"
      class={styles.search}
      options={[
        { label: 'All', value: '' },
        { label: 'Beef', value: 'beef' },
        { label: 'Chicken', value: 'chicken' },
      ]}
    />
    <Select
      label="Author"
      class={styles.search}
      options={[
        { label: 'All', value: '' },
        { label: 'Jeff', value: 'jeff' },
        { label: 'Sara', value: 'sara' },
      ]}
    />

    <Button onclick={applyFilters}>Apply filters</Button>
    <Button variant="secondary" onclick={clearFilters}>Clear filters</Button>
  </div>
</div>
