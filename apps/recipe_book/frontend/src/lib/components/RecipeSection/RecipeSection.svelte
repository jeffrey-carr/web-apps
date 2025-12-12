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
  import type { Direction, Ingredient } from '$lib/types/recipe';
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
    ingredients = $bindable([
      { uuid: generateUUID(), name: '', prep: '', amountStr: '0', unit: '' },
    ]),
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
    ingredients.push({ uuid: generateUUID(), name: '', prep: '', amountStr: '0', unit: '' });
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
    {#if editing}
      <div class={clsx(styles.topBorder, styles.leftBorder, styles.sectionTitle)}>
        <Input
          class={styles.titleInput}
          id="sectionTitle"
          bind:value={title}
          placeholder="Make the topping"
          label="Section Title"
        />
      </div>
    {:else}
      <div class={clsx(styles.topBorder, styles.leftBorder, styles.sectionText)}>
        <!-- <h3>{title}</h3> -->
        <h3>heeeey</h3>
      </div>
    {/if}
  {/if}

  {#if editing && showDelete}
    <div class={clsx(styles.topBorder, styles.sectionDelete)}>
      <Button type="button" variant="secondary" onclick={onDelete}>Delete Section</Button>
    </div>
  {/if}

  <div>
    <h4 class={styles.title}>Ingredients</h4>
    <div class={styles.ingredientInput}>
      {#snippet ingredientTemplate(_: Ingredient, i: number)}
        <div class={styles.ingredient}>
          <Input
            class={styles.nameInput}
            bind:value={ingredients[i].name}
            label={i === 0 ? 'Name' : ''}
          />
          <Input
            class={styles.prepInput}
            bind:value={ingredients[i].prep}
            label={i === 0 ? 'Prep' : ''}
          />
          <Input
            class={styles.amountInput}
            bind:value={ingredients[i].amountStr}
            label={i === 0 ? 'Amount' : ''}
          />
          <div class={{ [styles.itemWithoutLabel]: i > 0 }}>
            <Select
              class={styles.unitInput}
              bind:value={ingredients[i].unit}
              options={UNITS_OPTIONS.map(unit => ({ label: unit, value: unit }))}
            />
          </div>
          <button
            class={clsx(styles.deleteButton, { [styles.hidden]: i === 0 })}
            type="button"
            onclick={() => removeIngredient(i)}
          >
            <ReactiveIcon icon="trash" />
          </button>
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
    <Button class={styles.addButton} type="button" onclick={addIngredient} variant="secondary"
      >Add Ingredient</Button
    >
  </div>

  <div>
    <h4 class={styles.title}>Directions</h4>
    {#snippet directionsTemplate(_: Direction, index: number)}
      <div class={styles.direction}>
        <Textarea bind:value={directions[index].step} />
        <button
          type="button"
          class={clsx(styles.deleteButton, { [styles.hidden]: index === 0 })}
          onclick={() => removeDirection(index)}
        >
          <ReactiveIcon icon="trash" />
        </button>
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
    <Button class={styles.addButton} type="button" onclick={addDirection} variant="secondary"
      >Add Step</Button
    >
  </div>
</div>

<input type="hidden" {name} value={JSON.stringify({ uuid, title, ingredients, directions })} />
