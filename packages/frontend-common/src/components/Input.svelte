<script lang="ts">
  import clsx from 'clsx';
  import type { HTMLInputAttributes } from 'svelte/elements';
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
  // let errMessage = $derived(validator?.(value) ?? '');
  let errMessage = $state('');
  let hasError = $derived(errMessage.length > 0 || (message && message?.length > 0));

  const handleInputChanged = (e: Event) => {
    const target = e.currentTarget as HTMLInputElement;
    if (!target) return;

    errMessage = validator?.(target.value) ?? '';
  };
</script>

<div class={clsx('container', className)}>
  {#if label}
    <label for="input" class="label">{label}</label>
  {/if}
  <input
    id="input"
    class={clsx('input', { error: hasError }, inputClass)}
    bind:value
    {...rest}
    oninput={handleInputChanged}
  />
  {#if hasError}
    <p class="error-message">
      {#if message && message?.length > 0}
        {message}
      {:else}
        {errMessage}
      {/if}
    </p>
  {/if}
</div>

<style lang="scss">
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    display: none;
    margin: 0;
  }
  input[type='number'] {
    -moz-appearance: textfield; /* Firefox */
  }

  .container {
    position: relative;
  }

  .label {
    position: absolute;
    top: calc(-1rem - 5px);
  }

  .input {
    width: 100%;

    padding: 0.5rem;
    line-height: 1rem;

    border: 1px solid var(--app-theme-border-color);
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
