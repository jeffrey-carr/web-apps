<script lang="ts">
  import styles from './styles.module.scss';
  import {
    PLURALIZED_INGREDIENT_UNITS,
    type Ingredient,
    type IngredientUnit,
  } from '$lib/types/recipe';

  let { ingredients }: { ingredients: Ingredient[] } = $props();

  const stringifyIngredient = (ingredient: Ingredient): string => {
    let str = '';

    if (ingredient.amountStr) {
      str += ingredient.amountStr + ' ';
    }

    if (ingredient.unit) {
      if (strIsPlural(ingredient.amountStr)) {
        str += PLURALIZED_INGREDIENT_UNITS[ingredient.unit as IngredientUnit];
      } else {
        str += ingredient.unit;
      }
    }

    return str.trim();
  };

  const strIsPlural = (str: string): boolean => {
    return str !== '0' && str !== '1' && str.toLowerCase().trim() !== 'one';
  };
</script>

<table class={styles.ingredientTable}>
  <thead class={styles.tableHeader}>
    <tr>
      <td>Ingredient</td>
      <td>Amount</td>
    </tr>
  </thead>
  <tbody>
    {#each ingredients as ingredient (ingredient.uuid)}
      <tr class={styles.ingredientRow}>
        <td class={styles.name}>
          <div>{ingredient.name}</div>
          {#if ingredient.prep}
            <div class={styles.prep}><em>{ingredient.prep}</em></div>
          {/if}
        </td>
        <td class={styles.amount}>
          {#if ingredient.amountStr !== '0'}
            {`${stringifyIngredient(ingredient)}`}
          {/if}
        </td>
      </tr>
    {/each}
  </tbody>
</table>
