<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements';
  import { Input } from '../.';

  import styles from './styles.module.scss';
  import clsx from 'clsx';

  const filterOptions = (opts: Record<string, string>, v: string): string[] => {
    const keys = Object.keys(opts);
    return keys.filter(option => option.toLowerCase().startsWith(v.toLowerCase()));
  };

  let {
    class: className,
    label,
    options = { '': '' },
    value = $bindable(''),
    ...rest
  }: {
    class?: string;
    label?: string;
    options?: Record<string, string>;
    value: string;
  } & HTMLInputAttributes = $props();
  let showOptions = $state(false);
  let validOptions = $derived(filterOptions(options, value));

  const fillOption = (opt: string) => {
    const optValue = options[opt];
    if (!optValue) return;
    value = optValue;
    showOptions = false;
  };

  const handleModify = () => {
    showOptions = true;
  };
</script>

<div class={clsx(styles.container, className)} onfocusin={handleModify}>
  {#if label}
    <label for="autocomplete-input" class={styles.label}>{label}</label>
  {/if}
  <Input id="autocomplete-input" bind:value {...rest} oninput={handleModify} />
  {#if validOptions.length > 0 && showOptions}
    <ul class={styles.options}>
      {#each validOptions as opt}
        <li class={styles.option}>
          <button type="button" class={styles.optionButton} onclick={() => fillOption(opt)}>
            {opt}
          </button>
        </li>
      {/each}
    </ul>
  {/if}
</div>
