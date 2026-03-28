<script lang="ts">
  import styles from './styles.module.scss';
  import type { Ingredient } from '$lib/types/recipe';

  let { ingredients }: { ingredients: Ingredient[] } = $props();
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
          {ingredient.name}
        </td>
        <td class={styles.amount}
          >{`${ingredient.amountStr ?? ''} ${ingredient.unit}${(ingredient.amount ?? 0 > 1) ? 's' : ''}`.trim()}</td
        >
      </tr>
    {/each}
  </tbody>
</table>
