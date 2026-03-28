<script lang="ts">
  import clsx from 'clsx';
  import styles from './styles.module.scss';
  import type { Section } from '$lib/types/recipe';
  import RecipeSectionNumber from './RecipeSectionNumber.svelte';
  import { Button } from '@jeffrey-carr/frontend-common';
  import IngredientsTable from './IngredientsTable.svelte';

  let {
    section,
    showTitle,
  }: {
    section: Section;
    showTitle: boolean;
  } = $props();
  let collapsed = $state(false);
  let completedSteps = $state(new Array(section.directions.length).fill(false));

  const toggleCollapse = () => {
    collapsed = !collapsed;
  };

  const toggleCompleted = (i: number) => {
    completedSteps[i] = !completedSteps[i];
    completedSteps = [...completedSteps];
  };
</script>

<div
  class={clsx(styles.container, {
    [styles.showTitle]: showTitle,
    [styles.collapsed]: collapsed,
  })}
>
  {#if showTitle}
    {#if !collapsed}
      <div class={styles.title}>
        <div class={clsx(styles.topBorder, styles.leftBorder, styles.sectionTitle)}>
          <h2>{section.title}</h2>
        </div>
      </div>
    {/if}
    <Button class={styles.collapseButton} onclick={toggleCollapse} size="md" animated={false}>
      {#if collapsed}
        Expand
      {:else}
        Collapse
      {/if}
    </Button>
  {/if}

  {#if collapsed}
    <div class={styles.collapsedContent}>
      <h2>{section.title}</h2>
    </div>
  {:else}
    <div class={styles.ingredients}>
      <h3 class={styles.areaTitle}>Ingredients</h3>
      <IngredientsTable ingredients={section.ingredients} />
    </div>

    <div class={styles.directions}>
      <h3>Directions</h3>
      {#each section.directions as direction, i (direction.uuid)}
        <div class={clsx(styles.direction, { [styles.completed]: completedSteps[i] })}>
          <RecipeSectionNumber stepNumber={i + 1} onclick={() => toggleCompleted(i)} />
          <p class={styles.step}>
            {direction.step}
          </p>
        </div>
      {/each}
    </div>
  {/if}
</div>
