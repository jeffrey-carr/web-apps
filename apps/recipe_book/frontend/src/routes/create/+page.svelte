<script lang="ts">
  import { createRecipe, getAllTags } from '$lib/requests/recipe';
  import { ExpandButton, ServerError } from '@jeffrey-carr/frontend-common';
  import { goto } from '$app/navigation';
  import styles from './page.module.scss';
  import type { RecipeCreateRequest, RecipeCreateResponse, Section, Tag } from '$lib/types/recipe';
  import { recipeInputsToCreateRecipeRequest } from '$lib/mappers/recipe';
  import { notificationQueue } from '$lib/globals/notifications.svelte';
  import RecipeForm from '$lib/components/RecipeForm/RecipeForm.svelte';
  import type { RecipeFormData } from '$lib/types/recipe_form';

  const goHome = () => {
    goto('/');
  };

  const create = async (formData: RecipeFormData) => {
    const notifyValidationErr = (field: string, err: string) => {
      notificationQueue.push({
        level: 'error',
        title: 'Error creating recipe',
        message: `Error on ${field}: ${err}`,
      });
    };
    // Validate all required fields are there
    if (!formData.recipeName) return notifyValidationErr('Name', 'Name is required');
    if (!formData.recipeDescription)
      return notifyValidationErr('Description', 'Description is required');
    if (!formData.cookTimeHours) formData.cookTimeHours = 0;
    if (!formData.cookTimeMinutes) formData.cookTimeMinutes = 0;
    if (!formData.selectedTags) formData.selectedTags = [];
    if (!formData.recipeSections || formData.recipeSections.length < 1)
      return notifyValidationErr('Sections', 'At least one section is required');

    let createRequest: RecipeCreateRequest;
    try {
      createRequest = recipeInputsToCreateRecipeRequest(
        formData.recipeName,
        formData.recipeDescription,
        formData.cookTimeHours,
        formData.cookTimeMinutes,
        formData.selectedTags,
        formData.recipeSections,
        formData.importURL,
        formData.publish
      );
    } catch (e) {
      notificationQueue.push({
        level: 'error',
        title: 'Invalid recipe',
        message: e as string,
      });
      return;
    }

    let response: RecipeCreateResponse | ServerError = await createRecipe(createRequest);
    if (response instanceof ServerError) {
      notificationQueue.push({
        level: 'error',
        title: 'Error creating recipe',
        message: response.message,
      });
      return;
    }

    notificationQueue.push({
      level: 'success',
      message: 'Recipe created',
    });

    if (!response) {
      goto('/');
      return;
    }

    goto(`/recipe/${response.slug}`);
  };
</script>

<svelte:head>
  <title>Create Recipe - Jean's Recipe Book</title>
</svelte:head>

<div class={styles.container}>
  <ExpandButton onclick={goHome}>Back to home</ExpandButton>

  <h1>Create New Recipe</h1>
  <RecipeForm onSubmit={create} />
</div>
