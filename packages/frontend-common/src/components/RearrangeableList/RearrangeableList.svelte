<!--
  @component
  
  Rearrangeable list should be given a list of items, and a template to render those items. e.g:
  ```
    {#snippet itemTemplate(item: { name: string }, index: number)}
      {index + 1}. Item: {name}
    {/snippet}
    <RearrangableList {items} template={itemTemplate} />
  ```
-->

<script lang="ts" generics="T">
  import type { HTMLAttributes } from 'svelte/elements';
  import styles from './RearrangeableList.module.scss';
  import clsx from 'clsx';

  let {
    class: className = '',
    items = [],
    getKey,
    interaction = 'draggable',
    template,
    onUpdateOrder,
  }: {
    minItems?: number;
    items?: T[];
    getKey: (item: T, index: number) => string;
    interaction?: 'draggable' | 'numbers';
    template?: (item: T, index: number) => any;
    onUpdateOrder?: (from: number, to: number) => void;
  } & HTMLAttributes<HTMLUListElement> = $props();
  let isDraggable = $derived(interaction === 'draggable');

  const preventEvent = (e: Event) => {
    e.preventDefault();
  };

  const clearEvent = (e: DragEvent) => {
    preventEvent(e);
    e.dataTransfer?.clearData();
  };

  const onDragStart = (index: number, e: DragEvent) => {
    e.dataTransfer?.setData('text/plain', index.toString());
  };

  const onDrop = (droppedIndex: number, e: DragEvent) => {
    e.preventDefault();
    const draggedIndexStr = e.dataTransfer?.getData('text/plain');
    if (!draggedIndexStr) {
      return;
    }

    const draggedIndex = Number(draggedIndexStr);
    if (isNaN(draggedIndex) || draggedIndex < 0 || draggedIndex > items.length) {
      return;
    }

    onUpdateOrder?.(draggedIndex, droppedIndex);
  };

  const onBlur = (
    currentIndex: number,
    e: FocusEvent & { currentTarget: EventTarget & HTMLInputElement }
  ) => {
    const value = Number(e.currentTarget.value);
    if (isNaN(value) || value < 1) return;
    onUpdateOrder?.(currentIndex, Math.min(value - 1, items.length));
  };
</script>

<ul class={clsx(styles.container, className)} ondragover={preventEvent} ondragleave={clearEvent}>
  {#each items as item, index (getKey(item, index))}
    <li
      class={styles.item}
      draggable={isDraggable}
      ondragstart={(e: DragEvent) => onDragStart(index, e)}
      ondragover={preventEvent}
      ondrop={(e: DragEvent) => onDrop(index, e)}
    >
      {#if isDraggable}
        <!-- svelte-ignore a11y_consider_explicit_label -->
        <button class={styles.grabHandle}>
          <span class={styles.grabInner}></span>
          <span class={styles.grabInner}></span>
          <span class={styles.grabInner}></span>
        </button>
        {@render template?.(item, index)}
      {:else}
        <input
          class={styles.orderInput}
          type="number"
          onblur={e => onBlur(index, e)}
          value={index + 1}
          min={1}
          max={items.length}
        />
        {@render template?.(item, index)}
      {/if}
    </li>
  {/each}
</ul>
