<script lang="ts">
  import { Checkbox, CustomDropdown, Spinner } from '@jeffrey-carr/frontend-common';
  import styles from './styles.module.scss';
  import type { Tag } from '$lib/types/recipe';

  let {
    tags,
    loadingTags = false,
    selected = $bindable([]),
    inverse = $bindable([]),
  }: { tags: Tag[]; loadingTags?: boolean; selected: Tag[]; inverse: Tag[] } = $props();

  let showTags = $state(false);
  const toggleShow = () => {
    showTags = !showTags;
  };

  const isSelected = (tag: Tag) => selected.some(s => s.uuid === tag.uuid);
  const isInverted = (tag: Tag) => inverse.some(i => i.uuid === tag.uuid);

  const manuallyToggle = (tag: Tag) => {
    const isSel = isSelected(tag);
    const isInv = isInverted(tag);

    if (isSel) {
      // Checked -> Inverse
      selected = selected.filter(s => s.uuid !== tag.uuid);
      inverse = [...inverse, tag];
    } else if (isInv) {
      // Inverse -> Unchecked
      inverse = inverse.filter(i => i.uuid !== tag.uuid);
    } else {
      // Unchecked -> Checked
      selected = [...selected, tag];
    }
  };
</script>

{#snippet trigger()}
  <button onclick={toggleShow} class={styles.trigger} disabled={loadingTags}>
    {#if loadingTags}
      <Spinner size="1.5rem" />
    {:else}
      Select tags
    {/if}
  </button>
{/snippet}

{#if showTags}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class={styles.overlay} onclick={toggleShow}></div>
{/if}

{#snippet content()}
  <div class={styles.content}>
    <ul class={styles.tagList}>
      {#each tags as tag (tag.uuid)}
        <li class={styles.tagItem}>
          <button class={styles.itemButton} onclick={() => manuallyToggle(tag)}>
            <div style="pointer-events: none;">
              <Checkbox
                allowInverse
                label={tag.name}
                labelPos="after"
                checked={isSelected(tag)}
                inverse={isInverted(tag)}
                tabindex={-1}
              />
            </div>
          </button>
        </li>
      {/each}
    </ul>
  </div>
{/snippet}

<CustomDropdown {trigger} {content} show={showTags} />
