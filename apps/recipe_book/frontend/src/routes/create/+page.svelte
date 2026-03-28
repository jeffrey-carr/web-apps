<script lang="ts">
  import { createRecipe, getAllTags } from '$lib/requests/recipe';
  import {
    AutocompleteInput,
    Button,
    Checkbox,
    generateUUID,
    Input,
    ServerError,
    Textarea,
  } from '@jeffrey-carr/frontend-common';
  import { goto } from '$app/navigation';
  import styles from './page.module.scss';
  import { RecipeSection } from '$lib/components';
  import type { Direction, Ingredient, RecipeCreateRequest, Section, Tag } from '$lib/types/recipe';
  import { recipeInputsToCreateRecipeRequest } from '$lib/mappers/recipe';
  import clsx from 'clsx';
  import { notificationQueue } from '$lib/globals/notifications.svelte';
  import { onMount } from 'svelte';

  let loadingTags = $state(false);
  let tags = $state<Tag[]>([]);
  let tagNames = $derived(tags.map(tag => tag.name));

  onMount(() => {
    if (loadingTags) return;

    const loadTags = async () => {
      console.log('loading tags...');
      const response = await getAllTags();
      if (response instanceof ServerError) {
        notificationQueue.push({
          level: 'error',
          title: 'Error getting categories',
          message: response.message,
        });

        loadingTags = false;
        return;
      }

      tags = response;
      loadingTags = false;
    };

    loadingTags = true;
    loadTags();
  });

  const createEmptySection = (): Section => {
    return {
      uuid: generateUUID(),
      title: '',
      ingredients: [createEmptyIngredient()],
      directions: [createEmptyDirection()],
    };
  };

  const createEmptyIngredient = (): Ingredient => {
    return { uuid: generateUUID(), name: '', prep: '', amountStr: '', amount: 0, unit: '' };
  };

  const createEmptyDirection = (): Direction => {
    return { uuid: generateUUID(), step: '' };
  };

  let recipeName = $state('');
  let recipeDescription = $state('');
  let recipeSections = $state<Section[]>([createEmptySection()]);
  let cookTimeHoursStr = $state('');
  let cookTimeHours = $derived(Number(cookTimeHoursStr));
  let cookTimeMinutesStr = $state('');
  let cookTimeMinutes = $derived(Number(cookTimeMinutesStr));
  let tag = $state('');
  let importURL = $state('');
  let publish = $state(true);

  let loadingCreate = $state(false);

  // reset is called when the form is reset
  const reset = () => {
    recipeDescription = '';
    recipeSections = [createEmptySection()];
    publish = true;
  };

  const create = async (e: SubmitEvent) => {
    e.preventDefault();
    loadingCreate = true;

    const cleanedTag = tag.trim();
    let createRequest: RecipeCreateRequest;
    try {
      createRequest = recipeInputsToCreateRecipeRequest(
        recipeName,
        recipeDescription,
        cookTimeHours,
        cookTimeMinutes,
        [cleanedTag],
        recipeSections,
        importURL,
        publish
      );
    } catch (e) {
      loadingCreate = false;
      notificationQueue.push({
        level: 'error',
        title: 'Invalid recipe',
        message: e as string,
      });
      return;
    }

    let response: string | ServerError = await createRecipe(createRequest);
    if (response instanceof ServerError) {
      notificationQueue.push({
        level: 'error',
        title: 'Error creating recipe',
        message: response.message,
      });
      loadingCreate = false;
      return;
    }

    if (response == null || response === '') {
      goto('/');
      return;
    }

    goto(`/recipe/${response}`);
    loadingCreate = false;
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

    <div class={styles.cookTimeAndTagAndImportURL}>
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

      <!-- Tag -->
      <!-- TODO: support multiple tags -->
      <div class={clsx(styles.formItem, styles.tag)}>
        <h3>Category</h3>
        <AutocompleteInput
          class={styles.tagInput}
          bind:value={tag}
          options={tagNames}
          maxlength={20}
          loading={loadingTags}
        />
      </div>

      <!-- Import URL -->
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
    <Button class={styles.addSectionButton} onclick={addSection} variant="secondary" type="button"
      >Add a section</Button
    >

    <div class={clsx(styles.formItem, styles.publishSection)}>
      <Checkbox label="Publish" bind:checked={publish} defaultChecked={true} />
    </div>

    <div class={styles.buttons}>
      <Button type="submit" size="md" loading={loadingCreate}>Create</Button>
      <Button type="reset" size="md" variant="plain">Clear</Button>
      <Button href="/" size="md" class={styles.cancelButton} variant="secondary">Cancel</Button>
    </div>
  </form>
</div>
