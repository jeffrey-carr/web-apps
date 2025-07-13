<script lang="ts">
  let {
    validator,
    message,
    value = $bindable(),
    ...rest
  }: {
    validator?: (input: string) => string;
    message?: string;
    value: string;
  } & svelte.JSX.HTMLAttributes<HTMLInputElement> = $props();
  let errMessage = $derived(validator?.(value) ?? '');
  let hasError = $derived(errMessage.length > 0 || message?.length > 0);
  let inputClass = $derived(`input ${hasError ? 'error' : ''}`);
</script>

<div class="container">
  <input class={inputClass} bind:value {...rest} />
  {#if hasError}
    <p class="error-message">
      {#if message?.length > 0}
        {message}
      {:else}
        {errMessage}
      {/if}
    </p>
  {/if}
</div>

<style lang="scss">
  .input {
    padding: 0.5rem;

    border-radius: 5px;

    transition:
      border 150ms linear,
      box-shadow 150ms linear;

    &.error {
      border: 1px solid var(--app-theme-danger);
    }

    &:focus {
      outline: none;
      border: 1px solid var(--app-theme-primary);
      box-shadow: 0 0 10px var(--app-theme-primary);
    }
  }

  .error-message {
    margin-top: 5px;

    font-size: 0.8rem;
    color: var(--app-theme-danger);
  }
</style>
