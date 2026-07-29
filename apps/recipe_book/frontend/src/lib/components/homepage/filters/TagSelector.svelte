<script lang="ts">
  import { Checkbox, CustomDropdown, ReactiveIcon, Spinner } from '@jeffrey-carr/frontend-common';
  import type { Tag } from '$lib/types/recipe';

  let {
    tags,
    loadingTags = false,
    selectedUUIDs = $bindable([]),
    inverseUUIDs = $bindable([]),
  }: {
    tags: Tag[];
    loadingTags?: boolean;
    selectedUUIDs: string[];
    inverseUUIDs: string[];
  } = $props();

  let showTags = $state(false);
  const toggleShow = () => {
    showTags = !showTags;
  };

  const isSelected = (tag: Tag) => selectedUUIDs.some(s => s === tag.uuid);
  const isInverted = (tag: Tag) => inverseUUIDs.some(i => i === tag.uuid);

  const manuallyToggle = (tag: Tag) => {
    const isSel = isSelected(tag);
    const isInv = isInverted(tag);

    if (isSel) {
      // Checked -> Inverse
      selectedUUIDs = selectedUUIDs.filter(s => s !== tag.uuid);
      inverseUUIDs = [...inverseUUIDs, tag.uuid];
    } else if (isInv) {
      // Inverse -> Unchecked
      inverseUUIDs = inverseUUIDs.filter(i => i !== tag.uuid);
    } else {
      // Unchecked -> Checked
      selectedUUIDs = [...selectedUUIDs, tag.uuid];
    }
  };
</script>

{#snippet trigger()}
  <button onclick={toggleShow} class="trigger" disabled={loadingTags}>
    {#if loadingTags}
      <Spinner size="1.5rem" />
    {:else}
      <ReactiveIcon icon="tags" /> Select tags
    {/if}
  </button>
{/snippet}

{#if showTags}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="overlay" onclick={toggleShow}></div>
{/if}

{#snippet content()}
  <div class="content">
    <ul class="tag-list">
      {#each tags as tag (tag.uuid)}
        <li class="tag-item">
          <button class="item-button" onclick={() => manuallyToggle(tag)}>
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

<div class="container">
  <CustomDropdown {trigger} {content} show={showTags} />
</div>

<style lang="scss">
  .container {
    width: 100%;
    // min-width: 150px;
    max-width: 350px;
  }

  .trigger {
    --reactive-icon-size: 1.2rem;

    display: inline-flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;

    font-family: var(--app-theme-font);

    width: 100%;

    border: 1px solid var(--app-theme-border-color);
    border-radius: 5px;
    background-color: var(--bg-color-surface);

    padding: 0.5rem;

    transition:
      background-color linear var(--default-transition-ms),
      border-color linear var(--default-transition-ms);

    &:not(:disabled):hover {
      cursor: pointer;

      background-color: var(--app-theme-primary);
      color: var(--app-theme-text-secondary);
    }
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;

    height: 100%;
    width: 100%;

    background-color: transparent;
    border: none;
  }

  .content {
    position: relative;
    z-index: 2;

    max-height: 350px;
    width: 100%;
    overflow: auto;

    padding: 1rem;

    background-color: var(--bg-color-overlay);

    border: 1px solid var(--app-theme-primary);
    border-radius: 5px;
  }

  .tag-list {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  .item-button {
    display: block;
    width: 100%;
    background-color: transparent;
    border: 1px solid transparent;
    border-radius: 5px;
    padding: 0.5rem;
    text-align: left;

    transition:
      border-color linear var(--default-transition-ms),
      background-color linear var(--default-transition-ms);

    &:hover {
      cursor: pointer;
      border-color: var(--app-theme-primary);
      background-color: var(--bg-color-surface);
    }
  }

  .tag-item {
    padding: 0.25rem;
  }
</style>
