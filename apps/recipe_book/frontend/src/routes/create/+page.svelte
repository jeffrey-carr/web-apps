<script lang="ts">
  import { createRecipe } from '$lib/requests/recipe';
  import { Button, generateUUID, Input, Textarea } from '@jeffrey-carr/frontend-common';
  import { goto } from '$app/navigation';
  import styles from './page.module.scss';
  import { RecipeSection } from '$lib/components';
  import type { Direction, Ingredient, RecipeCreateRequest, Section } from '$lib/types/recipe';
  import { recipeInputsToCreateRecipeRequest } from '$lib/mappers/recipe';
  import clsx from 'clsx';

  const createEmptySection = (): Section => {
    return {
      uuid: generateUUID(),
      title: '',
      ingredients: [createEmptyIngredient()],
      directions: [createEmptyDirection()],
    };
  };

  const createEmptyIngredient = (): Ingredient => {
    return { uuid: generateUUID(), name: '', amountStr: '0', unit: '' };
  };

  const createEmptyDirection = (): Direction => {
    return { uuid: generateUUID(), step: '' };
  };

  let recipeName = $state('');
  let recipeDescription = $state('');
  let recipeSections = $state<Section[]>([createEmptySection()]);
  let cookTimeHoursStr = $state('0');
  let cookTimeHours = $derived(Number(cookTimeHoursStr));
  let cookTimeMinutesStr = $state('0');
  let cookTimeMinutes = $derived(Number(cookTimeMinutesStr));
  let importURL = $state('');
  let publish = $state(true);

  let loadingCreate = $state(false);

  // reset is called when the form is reset
  const reset = () => {
    recipeSections = [createEmptySection()];
  };

  const create = async (e: SubmitEvent) => {
    e.preventDefault();
    loadingCreate = true;

    let createRequest: RecipeCreateRequest;
    try {
      createRequest = recipeInputsToCreateRecipeRequest(
        recipeName,
        recipeDescription,
        cookTimeHours,
        cookTimeMinutes,
        importURL,
        recipeSections,
        publish
      );
    } catch (e) {
      loadingCreate = false;
      return;
    }

    console.log(createRequest);

    const errorMsg = await createRecipe(createRequest);
    loadingCreate = false;

    if (errorMsg == null) {
      goto('/');
      return;
    }

    console.error(errorMsg);
  };

  const addSection = () => {
    recipeSections.push(createEmptySection());
  };

  const deleteSection = (index: number) => {
    if (index < 0 || index > recipeSections.length) return;
    recipeSections.splice(index, 1);
  };
</script>

<div class={styles.container}>
  <h1>Create New Recipe</h1>

  <form class={styles.form} onsubmit={create} onreset={reset}>
    <div class={styles.formItem}>
      <h3>Name:</h3>
      <Input
        type="text"
        id="name"
        bind:value={recipeName}
        placeholder="Chicken, Broccoli, Ziti"
        required
      />
    </div>

    <div class={styles.formItem}>
      <h3>Description:</h3>
      <Textarea rich={true} bind:value={recipeDescription} />
    </div>

    <div class={styles.cookTimeAndImportURL}>
      <!-- Cook time -->
      <div class={clsx(styles.formItem, styles.cookTime)}>
        <h3>Cook Time</h3>
        <div class={styles.cookTimeInputs}>
          <div class={styles.cookTimeItem}>
            <Input type="number" bind:value={cookTimeHoursStr} /> Hours
          </div>
          <div class={styles.cookTimeItem}>
            <Input type="number" bind:value={cookTimeMinutesStr} /> Minutes
          </div>
        </div>
      </div>

      <div class={clsx(styles.formItem, styles.importURL)}>
        <h3>Import URL</h3>
        <Input bind:value={importURL} />
      </div>
    </div>

    {#each recipeSections as section, i (section.uuid)}
      <RecipeSection
        class={styles.formItem}
        bind:title={recipeSections[i].title}
        bind:ingredients={recipeSections[i].ingredients}
        bind:directions={recipeSections[i].directions}
        showTitle={recipeSections.length > 1}
        showDelete={i > 0}
        onDelete={() => deleteSection(i)}
        editing
      />
    {/each}

    <Button onclick={addSection}>Add a section</Button>

    <label for="publishInput">Publish</label>
    <input id="publishInput" type="checkbox" bind:checked={publish} />

    <div class={styles.buttons}>
      <Button type="submit" size="md" loading={loadingCreate}>Create</Button>
      <Button type="reset" size="md" variant="outline">Clear</Button>
      <Button href="/" size="md" class={styles.cancelButton}>Cancel</Button>
    </div>
  </form>
</div>
