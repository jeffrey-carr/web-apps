<script lang="ts">
  import { onMount } from 'svelte';
  import { getAllTags } from '$lib/requests/recipe';
  import {
    AutocompleteInput,
    Button,
    Checkbox,
    Input,
    generateUUID,
    ReactiveIcon,
    ServerError,
    Textarea,
  } from '@jeffrey-carr/frontend-common';
  import { ImageUploader } from '$lib/components';
  import RecipeSection from '../create/RecipeSection/RecipeSection.svelte';
  import { notificationQueue } from '$lib/globals/notifications.svelte';
  import type { Direction, Ingredient, Section, Tag } from '$lib/types/recipe';

  import styles from './styles.module.scss';
  import clsx from 'clsx';
  import type { RecipeFormData } from '$lib/types/recipe_form';

  let {
    onSubmit,
    initialData,
    backHref = '/',
  }: {
    onSubmit: (formData: RecipeFormData) => Promise<void>;
    initialData?: RecipeFormData;
    backHref?: string;
  } = $props();

  let loadingTags = $state(false);
  let tags = $state<Tag[]>([]);
  let tagNames = $derived(tags.map(tag => tag.name));

  // FIXME: You know it's not very good to have so much logic in a component...
  // you should really be passing data into the component
  onMount(() => {
    if (loadingTags) return;

    const loadTags = async () => {
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

  let loadingSubmit = $state(false);
  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    loadingSubmit = true;
    const finalTags = selectedTags.map(t => t.trim?.()).filter(Boolean);

    await onSubmit({
      recipeName,
      recipeDescription,
      cookTimeHours,
      cookTimeMinutes,
      selectedTags: finalTags,
      recipeSections,
      importURL,
      publish,
      image,
    });

    loadingSubmit = false;
  };

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
  let image = $state<File | null>(null);

  let selectedTags = $state<string[]>([]);
  let tagInput = $state('');
  let tagErr = $state<string>();
  let tagTimer: number | undefined = undefined;
  const setTagErr = (err: string) => {
    clearTimeout(tagTimer);
    tagErr = err;
    tagTimer = window.setTimeout(resetTagErr, 10000);
  };
  const resetTagErr = () => {
    tagErr = undefined;
  };

  let importURL = $state('');
  let publish = $state(true);

  $effect(() => {
    if (initialData) {
      recipeName = initialData.recipeName ?? '';
      recipeDescription = initialData.recipeDescription ?? '';
      recipeSections = initialData.recipeSections ?? [createEmptySection()];
      cookTimeHoursStr = initialData.cookTimeHours?.toString() ?? '';
      cookTimeMinutesStr = initialData.cookTimeMinutes?.toString() ?? '';

      selectedTags = initialData.selectedTags ?? [];

      importURL = initialData.importURL ?? '';
      publish = initialData.publish ?? true;
      image = initialData.image ?? null;
    }
  });

  // reset is called when the form is reset
  const reset = () => {
    recipeName = initialData?.recipeName ?? '';
    recipeDescription = initialData?.recipeDescription ?? '';
    recipeSections = initialData?.recipeSections
      ? structuredClone(initialData.recipeSections)
      : [createEmptySection()];
    cookTimeHoursStr = initialData?.cookTimeHours?.toString() ?? '';
    cookTimeMinutesStr = initialData?.cookTimeMinutes?.toString() ?? '';
    selectedTags = initialData?.selectedTags ? [...initialData.selectedTags] : [];
    importURL = initialData?.importURL ?? '';
    publish = initialData?.publish ?? true;
    image = initialData?.image ?? null;
    resetTagErr();
  };

  const addTag = () => {
    if (selectedTags.length === 10) {
      setTagErr('You can only add a maximum of 10 tags');
      return;
    }

    const trimmed = tagInput.trim();
    if (trimmed && !selectedTags.includes(trimmed)) {
      selectedTags.push(trimmed);
    }
    tagInput = '';
  };

  const removeTag = (t: string) => {
    selectedTags = selectedTags.filter(tag => tag !== t);
  };

  const addSection = () => {
    recipeSections.push(createEmptySection());
  };

  const deleteSection = (index: number) => {
    if (index < 0 || index > recipeSections.length) return;
    recipeSections.splice(index, 1);
  };
</script>

<form class={styles.form} onsubmit={handleSubmit} onreset={reset}>
  <div class={styles.formItem}>
    <h3>Image:</h3>
    <ImageUploader bind:imageFile={image} />
  </div>

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
    <!-- Tag -->
    <div class={clsx(styles.formItem, styles.tag)}>
      <h3>Tags</h3>
      <div class={styles.tagsContainer}>
        {#each selectedTags as t (t)}
          <span class={styles.tagBadge}>
            {t}
            <button type="button" class={styles.removeTagBtn} onclick={() => removeTag(t)}>
              <ReactiveIcon icon="x" />
            </button>
          </span>
        {/each}
      </div>
      <div class={styles.tagInputWrapper}>
        <AutocompleteInput
          class={styles.tagInput}
          bind:value={tagInput}
          options={tagNames.filter(n => !selectedTags.includes(n))}
          maxlength={20}
          loading={loadingTags}
          onkeydown={e => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addTag();
            }
          }}
        />
        <Button type="button" variant="secondary" onclick={addTag}>Add</Button>
      </div>
      {#if tagErr}
        <p class={styles.tagErr}>{tagErr}</p>
      {/if}
    </div>

    <!-- Cook time -->
    <div class={clsx(styles.formItem, styles.cookTime)}>
      <h3>Cook Time</h3>
      <div class={styles.cookTimeInputs}>
        <div class={styles.cookTimeItem}>
          <Input type="number" bind:value={cookTimeHoursStr} hideErrArea /> Hours
        </div>
        <div class={styles.cookTimeItem}>
          <Input type="number" bind:value={cookTimeMinutesStr} hideErrArea /> Minutes
        </div>
      </div>
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
    <Button type="submit" size="md" loading={loadingSubmit}
      >{initialData ? 'Update' : 'Create'}</Button
    >
    <Button type="reset" size="md" variant="plain">Clear</Button>
    <Button href={backHref} size="md" class={styles.cancelButton} variant="secondary">Cancel</Button
    >
  </div>
</form>
