<script lang="ts">
  import styles from './styles.module.scss';
  import type { Ingredient } from '$lib/types/recipe';
  import IngredientsTable from './IngredientsTable.svelte';
  import { Modal } from '@jeffrey-carr/frontend-common';

  let {
    ingredients,
    open = $bindable(false),
  }: {
    ingredients: Ingredient[];
    open: boolean;
  } = $props();
</script>

<Modal bind:open>
  <div class={styles.ingredientsModal}>
    <h1>All Ingredients</h1>
    <div class={styles.ingredientsTable}>
      <IngredientsTable {ingredients} />
    </div>
  </div>
</Modal>
