<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements';
  import { Input, CustomDropdown } from '../.';

  import styles from './styles.module.scss';
  import clsx from 'clsx';
  import { Spinner } from '../.';

  let {
    class: className,
    label,
    options = [],
    value = $bindable(''),
    maxlength,
    loading = false,
    ...rest
  }: {
    class?: string;
    label?: string;
    options?: string[];
    maxlength?: number;
    loading?: boolean;
    value: string;
  } & HTMLInputAttributes = $props();
  let showOptions = $state(false);
  let validOptions = $derived(
    options?.filter(opt => opt.toLowerCase().startsWith(value.toLowerCase())) ?? []
  );
  let showDropdown = $derived((Object.keys(validOptions).length > 0 || loading) && showOptions);
  const fillOption = (opt: string) => {
    value = opt;
    showOptions = false;
  };
</script>

{#snippet renderOptions()}
  {#if loading}
    <div class={clsx(styles.spinnerContainer)}>
      <Spinner size="1.5rem" />
    </div>
  {:else}
    <ul class={styles.options}>
      {#each validOptions as opt}
        <li class={styles.option}>
          <button type="button" class={styles.optionButton} onmousedown={() => fillOption(opt)}>
            {opt}
          </button>
        </li>
      {/each}
    </ul>
  {/if}
{/snippet}
{#snippet renderInput()}
  <Input
    id="autocomplete-input"
    bind:value
    {...rest}
    {maxlength}
    onblur={() => (showOptions = false)}
    hideErrArea
  />
{/snippet}

<div class={clsx(styles.container, className)} onfocusin={() => (showOptions = true)}>
  {#if label}
    <label for="autocomplete-input" class={styles.label}>{label}</label>
  {/if}

  <div class={styles.inputWrapper}>
    <CustomDropdown show={showDropdown} trigger={renderInput} content={renderOptions} />
  </div>
</div>
