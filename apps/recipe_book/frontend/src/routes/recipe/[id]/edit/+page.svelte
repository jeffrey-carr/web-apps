<script lang="ts">
  import { getContext } from 'svelte';
  import { goto } from '$app/navigation';
  import RecipeForm from '$lib/components/RecipeForm/RecipeForm.svelte';
  import type { RecipeFormData } from '$lib/types/recipe_form';
  import { ExpandButton, ServerError } from '@jeffrey-carr/frontend-common';
  import { updateRecipe } from '$lib/requests/recipe';
  import { notificationQueue } from '$lib/globals/notifications.svelte';
  import type { Recipe, RecipeUpdateRequest } from '$lib/types/recipe';

  import styles from './page.module.scss';

  let recipeStore = getContext<{ current: Recipe }>('recipe');
  let recipe = $derived(recipeStore.current);

  const initialData: RecipeFormData = {
    recipeName: recipe.name,
    recipeDescription: recipe.description,
    cookTimeHours: recipe.cookTimeMs ? Math.floor(recipe.cookTimeMs / 3600000) : 0,
    cookTimeMinutes: recipe.cookTimeMs ? Math.floor((recipe.cookTimeMs % 3600000) / 60000) : 0,
    selectedTags: recipe.tags ? recipe.tags.map(t => t.name) : [],
    recipeSections: recipe.sections,
    importURL: recipe.importURL,
    publish: recipe.status === 'public',
  };

  const goToRecipe = (newSlug?: string) => {
    goto(`/recipe/${recipe.slug}`);
  };

  const edit = async (formData: RecipeFormData) => {
    const updateRequest: RecipeUpdateRequest = {};

    if (formData.recipeName !== recipe.name) {
      updateRequest.name = formData.recipeName;
    }

    if (formData.recipeDescription !== recipe.description) {
      updateRequest.description = formData.recipeDescription;
    }

    const currentCookTimeMs =
      (formData.cookTimeHours || 0) * 3600000 + (formData.cookTimeMinutes || 0) * 60000;
    if (currentCookTimeMs !== (recipe.cookTimeMs || 0)) {
      updateRequest.cookTimeMs = currentCookTimeMs;
    }

    const currentTags = (formData.selectedTags || []).slice().sort();
    const originalTags = (recipe.tags || []).map(t => t.name).sort();
    if (currentTags.join(',') !== originalTags.join(',')) {
      updateRequest.tagNames = formData.selectedTags;
    }

    if (formData.importURL !== recipe.importURL) {
      updateRequest.originalURL = formData.importURL;
    }

    const newStatus = formData.publish ? 'public' : 'private';
    if (newStatus !== recipe.status) {
      updateRequest.status = newStatus;
    }

    // deep compare sections
    if (JSON.stringify(formData.recipeSections) !== JSON.stringify(recipe.sections)) {
      updateRequest.sections = formData.recipeSections;
    }

    if (Object.keys(updateRequest).length === 0 && !formData.image) {
      notificationQueue.push({
        level: 'info',
        title: 'No changes',
        message: 'No changes to save.',
      });
      return;
    }

    const data = new FormData();
    if (formData.image) {
      data.append('image', formData.image);
    }
    data.append('updateRequest', JSON.stringify(updateRequest));

    const response = await updateRecipe(recipe.uuid, data);
    if (response instanceof ServerError) {
      notificationQueue.push({
        level: 'error',
        title: 'Error updating recipe',
        message: response.message,
      });
      return;
    }

    recipeStore.current = response;

    notificationQueue.push({
      level: 'success',
      title: 'Success',
      message: 'Recipe updated successfully.',
    });

    goto(`/recipe/${recipe.slug}`);
  };
</script>

<svelte:head>
  <title>Edit {recipe.name} - Jean's Recipe Book</title>
</svelte:head>

<main class={styles.container}>
  <ExpandButton onclick={goToRecipe}>Back to Recipe</ExpandButton>

  <h1>Edit Recipe</h1>
  <RecipeForm onSubmit={edit} {initialData} backHref={`/recipe/${recipe.slug}`} />
</main>
