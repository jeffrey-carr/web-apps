<script lang="ts">
  import {
    Button,
    generateUUID,
    Input,
    ReactiveIcon,
    RearrangeableList,
    Select,
    Textarea,
  } from '@jeffrey-carr/frontend-common';
  import { INGREDIENT_UNITS } from '$lib/types/recipe';
  import type { Direction, Ingredient, Section } from '$lib/types/recipe';
  import styles from './RecipeSection.module.scss';
  import clsx from 'clsx';

  const UNITS_OPTIONS = INGREDIENT_UNITS.toSorted((a, b) => {
    if (a === '') return -1;
    if (b === '') return 1;
    return a.localeCompare(b);
  });

  let {
    name = '',
    uuid = generateUUID(),
    title = $bindable(''),
    ingredients = $bindable([{ uuid: generateUUID(), name: '', amountStr: '0', unit: '' }]),
    directions = $bindable([{ uuid: generateUUID(), step: '' }]),
    editing = false,
    class: className = '',
    showTitle = true,
    showDelete = true,
    onDelete,
  }: {
    name?: string;
    uuid?: string;
    title?: string;
    ingredients?: Ingredient[];
    directions?: Direction[];
    editing?: boolean;
    class?: string;
    showTitle?: boolean;
    showDelete?: boolean;
    onDelete?: () => void;
  } = $props();

  const addIngredient = () => {
    ingredients.push({ uuid: generateUUID(), name: '', amountStr: '0', unit: '' });
  };

  const removeIngredient = (i: number) => {
    if (i < 0 || i >= ingredients.length) return;

    ingredients.splice(i, 1);
  };

  const addDirection = () => {
    directions.push({ uuid: generateUUID(), step: '' });
  };

  const removeDirection = (i: number) => {
    if (i < 0 || i >= directions.length) return;

    directions.splice(i, 1);
  };

  const reorderList = <T,>(list: T[], from: number, to: number) => {
    const toMove = list.splice(from, 1);
    list.splice(to, 0, toMove[0]);
  };
  const reorderIngredients = (from: number, to: number) => {
    reorderList(ingredients, from, to);
  };
  const reorderDirections = (from: number, to: number) => {
    reorderList(directions, from, to);
  };
</script>

<div class={clsx(styles.container, className)}>
  {#if showTitle}
    <div class={clsx(styles.topBorder, styles.sectionTitle)}>
      {#if editing}
        <Input
          id="sectionTitle"
          bind:value={title}
          placeholder="Make the topping"
          label="Section Title"
        />
      {:else}
        <h3>{title}</h3>
      {/if}
    </div>
  {/if}

  {#if editing && showDelete}
    <div class={clsx(styles.topBorder, styles.sectionDelete)}>
      <Button variant="outline" onclick={onDelete}>
        Delete Section <ReactiveIcon icon="trash" />
      </Button>
    </div>
  {/if}

  <div>
    <h3 class={styles.title}>Ingredients</h3>
    <div class={styles.ingredientInput}>
      {#snippet ingredientTemplate(_: Ingredient, i: number)}
        <div class={styles.ingredient}>
          <Input bind:value={ingredients[i].name} label={i === 0 ? 'Name' : ''} />
          <Input bind:value={ingredients[i].amountStr} label={i === 0 ? 'Amount' : ''} />
          <div class={styles.itemWithoutLabel}>
            <Select
              bind:value={ingredients[i].unit}
              options={UNITS_OPTIONS.map(unit => ({ label: unit, value: unit }))}
            />
          </div>
          {#if i > 0}
            <button class={styles.deleteButton} onclick={() => removeIngredient(i)}>
              <ReactiveIcon icon="trash" />
            </button>
          {/if}
        </div>
      {/snippet}
      <RearrangeableList
        items={ingredients}
        getKey={(item, _) => item.uuid}
        template={ingredientTemplate}
        onUpdateOrder={reorderIngredients}
        minItems={1}
      />
    </div>
    <Button onclick={addIngredient} variant="outline" depth="flat">Add Ingredient</Button>
  </div>

  <div>
    <h3 class={styles.title}>Directions</h3>
    {#snippet directionsTemplate(_: Direction, index: number)}
      <div class={styles.direction}>
        <Textarea bind:value={directions[index].step} />
        {#if index > 0}
          <button class={styles.deleteButton} onclick={() => removeDirection(index)}>
            <ReactiveIcon icon="trash" />
          </button>
        {/if}
      </div>
    {/snippet}
    <RearrangeableList
      items={directions}
      getKey={(item, _) => item.uuid}
      template={directionsTemplate}
      interaction="numbers"
      onUpdateOrder={reorderDirections}
      minItems={1}
    />
    <Button onclick={addDirection} variant="outline" depth="flat">Add Step</Button>
  </div>
</div>

<input type="hidden" {name} value={JSON.stringify({ uuid, title, ingredients, directions })} />
