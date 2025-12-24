<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements';

  import styles from './Input.module.scss';
  import clsx from 'clsx';
  import { generateUUID } from '../../utils';

  let {
    label,
    validator,
    message,
    value = $bindable(),
    class: className = '',
    inputClass = '',
    ...rest
  }: {
    inputClass?: string;
    label?: string;
    validator?: (input: string) => string;
    message?: string;
    value?: string;
  } & HTMLInputAttributes = $props();
  // id is a random uuid to use for ids so they don't clash with other Input elements
  const id = generateUUID();
  let errMessage = $state('');
  let hasError = $derived(errMessage.length > 0 || (message ?? '').length > 0);
  let validationDebounceTimer: number;

  const handleInputChanged = (e: Event) => {
    const target = e.currentTarget as HTMLInputElement;
    if (!target) return;

    errMessage = '';
    // Debounce input validation
    clearTimeout(validationDebounceTimer);
    validationDebounceTimer = setTimeout(() => {
      errMessage = validator?.(target.value) ?? '';
    }, 1500);
  };
</script>

<div class={clsx(styles.container, className)}>
  {#if label}
    <label for={id} class={styles.label}>{label}</label>
  {/if}
  <input
    {id}
    class={clsx(styles.input, { [styles.error]: hasError }, inputClass)}
    bind:value
    {...rest}
    oninput={handleInputChanged}
  />
  <div class={styles.errorArea}>
    <p class={clsx(styles.errorMessage, { [styles.active]: hasError })}>
      {#if message && message.length > 0}
        {message}
      {:else}
        {errMessage}
      {/if}
    </p>
  </div>
</div>
