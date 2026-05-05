<script lang="ts">
  import styles from './styles.module.scss';
  import { ReactiveIcon } from '@jeffrey-carr/frontend-common';
  import clsx from 'clsx';

  let {
    imageFile = $bindable(),
    maxSizeMB = 5,
  }: {
    imageFile: File | null;
    maxSizeMB?: number;
  } = $props();

  let error = $state('');
  let previewUrl = $state<string | null>(null);
  let fileInput: HTMLInputElement;

  $effect(() => {
    if (!imageFile) {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        previewUrl = null;
      }
      return;
    }

    const url = URL.createObjectURL(imageFile);
    previewUrl = url;

    return () => {
      URL.revokeObjectURL(url);
    };
  });

  const handleChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];

    if (file) {
      if (!file.type.startsWith('image/')) {
        error = 'Please select an image file.';
        imageFile = null;
        target.value = '';
        return;
      }

      const maxSizeBytes = maxSizeMB * 1024 * 1024;
      if (file.size > maxSizeBytes) {
        error = `Image must be less than ${maxSizeMB}MB.`;
        imageFile = null;
        target.value = '';
        return;
      }

      error = '';
      imageFile = file;
    } else {
      imageFile = null;
      error = '';
    }
  };

  const removeImage = () => {
    imageFile = null;
    error = '';
    if (fileInput) fileInput.value = '';
  };
</script>

<div class={styles.container}>
  {#if previewUrl}
    <div class={styles.previewContainer}>
      <img src={previewUrl} alt="Recipe preview" class={styles.preview} />
      <button
        type="button"
        class={styles.removeBtn}
        onclick={removeImage}
        aria-label="Remove image"
      >
        <ReactiveIcon icon="x" />
      </button>
    </div>
  {:else}
    <button
      type="button"
      class={clsx(styles.uploadPlaceholder, error && styles.hasError)}
      onclick={() => fileInput.click()}
    >
      <ReactiveIcon icon="plus" />
      <span>Select Image</span>
    </button>
  {/if}

  <input
    bind:this={fileInput}
    type="file"
    accept="image/*"
    onchange={handleChange}
    class={styles.hiddenInput}
  />

  {#if error}
    <p class={styles.error}>{error}</p>
  {/if}
</div>
