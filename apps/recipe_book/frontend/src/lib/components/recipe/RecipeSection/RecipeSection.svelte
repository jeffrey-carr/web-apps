<script lang="ts">
  import clsx from 'clsx';
  import type { Section } from '$lib/types/recipe';
  import { Button } from '@jeffrey-carr/frontend-common';
  import IngredientsTable from './IngredientsTable.svelte';
  import { SvelteSet } from 'svelte/reactivity';

  let {
    section,
    showTitle,
  }: {
    section: Section;
    showTitle: boolean;
  } = $props();
  let collapsed = $state(false);
  let completedSteps = new SvelteSet<number>();

  const toggleCollapse = () => {
    collapsed = !collapsed;
  };

  const toggleCompleted = (i: number) => {
    if (completedSteps.has(i)) {
      completedSteps.delete(i);
    } else {
      completedSteps.add(i);
    }
  };
</script>

{#snippet stepNumber(n: number)}
  <button class="step-number" onclick={() => toggleCompleted(n)}>
    <div class={clsx('inner', { completed: completedSteps.has(n) })}>
      <div class="face front">
        {n + 1}
      </div>

      <div class="face back">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
    </div>
  </button>
{/snippet}

<div class={clsx('container', { 'show-title': showTitle, collapsed })}>
  {#if showTitle}
    {#if !collapsed}
      <div>
        <div class="section-title">
          <h2>{section.title}</h2>
        </div>
      </div>
    {/if}
    <Button class="collapse-button" onclick={toggleCollapse} size="md" animated={false}>
      {#if collapsed}
        Expand
      {:else}
        Collapse
      {/if}
    </Button>
  {/if}

  {#if collapsed}
    <div class="collapsed-content">
      <h2>{section.title}</h2>
    </div>
  {:else}
    {#if section.ingredients.length > 0}
      <div class="ingredients">
        <h3 class="area-title">Ingredients</h3>
        <div class="divider"></div>
        <IngredientsTable ingredients={section.ingredients} />
      </div>
    {/if}

    <div class="directions">
      <h3>Directions</h3>
      {#each section.directions as direction, i (direction.uuid)}
        <div class={clsx('direction', { completed: completedSteps.has(i) })}>
          {@render stepNumber(i)}
          <p class="step">
            {direction.step}
          </p>
        </div>
      {/each}
    </div>
  {/if}
</div>

<style lang="scss">
  .container {
    position: relative;
    display: flex;
    gap: 10px;

    background-color: var(--bg-color-surface);
    border: 2px solid var(--app-theme-primary);
    border-radius: var(--app-theme-border-radius-m);

    @media (max-width: 768px) {
      flex-direction: column;
    }

    &.collapsed {
      height: 0;
      margin: 0;
      padding: 0;
    }

    &.show-title {
      --title-offset: 3rem;
      border: 2px solid var(--app-theme-primary);
      border-radius: 15px;
      margin-top: calc(var(--title-offset) + 2rem);
      padding: calc(var(--title-offset) + 1rem);

      @media (max-width: 768px) {
        padding: calc(var(--title-offset) + 0.5rem) 0.5rem 0.5rem 0.5rem;
      }
    }
  }

  .section-title {
    position: absolute;
    top: -1.35rem;
    left: 5rem;
    padding: 0.35rem 0.75rem;
    background-color: var(--app-theme-primary);
    border-radius: var(--app-theme-border-radius-s);

    h2 {
      color: var(--app-theme-text-secondary);
    }

    @media (max-width: 768px) {
      left: 1rem;
    }
  }

  .container :global(.collapse-button) {
    position: absolute;
    top: -1rem;
    right: 5rem;
    padding: 0.5rem 1rem;
    border: none;
    width: 5rem;
    color: var(--app-theme-text-secondary);
    background-color: var(--app-theme-primary);

    @media (max-width: 768px) {
      right: 1rem;
    }

    &:hover {
      cursor: pointer;
    }
  }

  .collapsed-content {
    display: flex;
    justify-content: center;
    align-items: center;

    height: 100%;
    width: 100%;
  }

  .area-title {
    margin-bottom: 0.5rem;
  }

  .spacer {
    height: 1rem;
  }

  .ingredients {
    position: sticky;
    top: 2rem;
    padding: 1rem;
    border-radius: 15px;

    height: 100%;
    min-height: 25rem;

    @media (max-width: 768px) {
      position: relative;
      top: 0;
      min-height: auto;
    }

    .divider {
      position: absolute;
      top: 0;
      right: -5px;
      height: 100%;
      width: 1px;
      border: 1px solid var(--app-theme-border-color);
      opacity: 0.45;
    }
  }

  .directions {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    padding: 1rem;
  }

  .direction {
    padding: 2rem 1rem 1rem;

    border-radius: 10px;

    transition:
      background-color var(--default-transition-ms) linear,
      color var(--default-transition-ms) linear;

    &.completed {
      color: var(--app-theme-gray-dark);
      background-color: var(--app-theme-gray-light);
      text-decoration: line-through;
    }
  }

  .step {
    color: inherit;
    padding-left: 0.75rem;
  }

  .step-number {
    width: 2.5rem;
    aspect-ratio: 1 / 1;

    padding: 0;
    margin-bottom: 1rem;

    background: transparent;
    border: none;
    cursor: pointer;

    perspective: 1000px;

    .inner {
      position: relative;
      width: 100%;
      height: 100%;

      transition: transform 600ms cubic-bezier(0.4, 0, 0.2, 1);
      transform-style: preserve-3d;

      &.completed {
        transform: rotateY(540deg);
      }
    }

    .face {
      position: absolute;
      top: 0;
      left: 0;

      display: flex;
      align-items: center;
      justify-content: center;

      width: 100%;
      height: 100%;
      border-radius: 100%;

      backface-visibility: hidden;
    }

    .front {
      color: var(--app-theme-text-secondary);
      background-color: var(--app-theme-primary);
      transition:
        color var(--default-transition-ms) linear,
        background-color var(--default-transition-ms) linear;
    }

    .back {
      background-color: var(--app-theme-success);
      color: white;

      transform: rotateY(540deg);
    }

    &:hover .front {
      color: var(--app-theme-text-primary);
      background-color: var(--app-theme-secondary);
    }
  }
</style>
