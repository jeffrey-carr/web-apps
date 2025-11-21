<script lang="ts">
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';
  import { Editor } from '@tiptap/core';
  import StarterKit from '@tiptap/starter-kit';
  import clsx from 'clsx';
  import styles from './Textarea.module.scss';

  // TODO - turn this into a list of fields that can be chosen from by callers
  // so we can customize what fields are used
  const ENABLED_RICH_TEXT_NODES = [
    'headingOne',
    'headingTwo',
    'paragraph',
    'bold',
    'italic',
    'strike',
    'bulletList',
    'orderedList',
    'blockQuote',
  ] as const;
  type EnabledNode = (typeof ENABLED_RICH_TEXT_NODES)[number];
  type RichTextNodeInfo = {
    fieldDisplay: string;
    cmd: () => void;
  };
  const RICH_TEXT_NODES: Partial<Record<EnabledNode, RichTextNodeInfo>>[] = [
    {
      headingOne: {
        fieldDisplay: 'H1',
        cmd: () => editor!.chain().focus().toggleHeading({ level: 1 }).run(),
      },
      headingTwo: {
        fieldDisplay: 'H2',
        cmd: () => editor!.chain().focus().toggleHeading({ level: 2 }).run(),
      },
      paragraph: {
        fieldDisplay: 'P',
        cmd: () => editor!.chain().focus().setParagraph().run(),
      },
    },
    {
      bold: {
        fieldDisplay: '<b>B</b>',
        cmd: () => editor!.chain().focus().toggleBold().run(),
      },
      italic: {
        fieldDisplay: '<i>I</i>',
        cmd: () => editor!.chain().focus().toggleItalic().run(),
      },
      strike: {
        fieldDisplay: '<s>S</s>',
        cmd: () => editor!.chain().focus().toggleStrike().run(),
      },
    },
    {
      bulletList: {
        fieldDisplay: 'Bulleted list',
        cmd: () => editor!.chain().focus().toggleBulletList().run(),
      },
      orderedList: {
        fieldDisplay: 'Ordered list',
        cmd: () => editor!.chain().focus().toggleOrderedList().run(),
      },
    },
  ];

  let activeNodes = $state<Record<EnabledNode, boolean>>({
    headingOne: false,
    headingTwo: false,
    paragraph: true,
    bold: false,
    italic: false,
    strike: false,
    bulletList: false,
    orderedList: false,
    blockQuote: false,
  });

  let {
    value = $bindable(''),
    placeholder = '',
    class: className = '',
    rich = false, // treat as initial mode
    autoExpand = true,
    name,
    id,
    disabled = false,
    rows = 3,
    showToolbar = true,
  }: {
    value?: string;
    placeholder?: string;
    class?: string;
    rich?: boolean;
    autoExpand?: boolean;
    name?: string;
    id?: string;
    disabled?: boolean;
    rows?: number;
    showToolbar?: boolean;
  } = $props();

  let plainEl = $state<HTMLTextAreaElement | null>(null);
  let richEl = $state<HTMLElement | null>(null);
  let editor = $state<Editor | null>(null);

  // Oftentimes, we will use a textarea in a form. Textareas should allow you
  // to put line breaks in your text. So prevent submission here.
  const interceptEnter = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  onMount(() => {
    if (!rich || !richEl) return;

    editor = new Editor({
      element: richEl,
      extensions: [StarterKit],
      content: value,
      editorProps: {
        attributes: {
          'class': clsx(styles.textarea, styles.rich, className),
          'data-placeholder': placeholder,
          'style': 'min-height:5rem;',
        },
      },
      onUpdate: ({ editor }) => {
        const html = editor.getHTML();
        if (html !== value) {
          value = html;
        }
        syncActiveNodes();
      },
    });

    if (autoExpand) {
      const resize = () => {
        if (!richEl) return;
        richEl.style.height = 'auto';
        richEl.style.height = richEl.scrollHeight + 'px';
      };

      resize();
      editor.on('update', resize);
    }
  });

  onDestroy(() => {
    editor?.destroy();
    editor = null;
  });

  // Keep editor content in sync if parent updates `value`
  $effect(() => {
    if (!rich || !editor) return;
    const current = editor.getHTML();
    if (value !== current) {
      editor.commands.setContent(value || '');
    }
  });

  // Auto-expand for plain textarea
  $effect(() => {
    if (!autoExpand || rich || !plainEl) return;
    plainEl.style.height = 'auto';
    plainEl.style.height = plainEl.scrollHeight + 'px';
  });

  const syncActiveNodes = () => {
    if (!editor) return;

    activeNodes = {
      headingOne: editor.isActive('heading', { level: 1 }),
      headingTwo: editor.isActive('heading', { level: 2 }),
      paragraph: editor.isActive('paragraph'),
      bold: editor.isActive('bold'),
      italic: editor.isActive('italic'),
      strike: editor.isActive('strike'),
      bulletList: editor.isActive('bulletList'),
      orderedList: editor.isActive('orderedList'),
      blockQuote: editor.isActive('blockquote'),
    };
  };

  const run = (cmd: () => void) => {
    if (!editor) return;
    cmd();
    syncActiveNodes();
  };
</script>

{#if rich}
  <div class={styles.richWrapper}>
    {#if showToolbar && editor}
      <div class={styles.toolbar}>
        {#snippet toolbarButton(nodeName: EnabledNode, info: RichTextNodeInfo)}
          <button
            class={clsx(styles.button, { [styles.active]: activeNodes[nodeName] })}
            onclick={() => run(info.cmd)}
          >
            {@html info.fieldDisplay}
          </button>
        {/snippet}
        {#each RICH_TEXT_NODES as nodes, i}
          {#each Object.entries(nodes) as [nodeName, nodeInfo]}
            {@render toolbarButton(nodeName as EnabledNode, nodeInfo)}
          {/each}
          {#if i < RICH_TEXT_NODES.length - 1}
            <span class={styles.divider}></span>
          {/if}
        {/each}
      </div>
    {/if}

    <!-- Tiptap attaches here; styles applied via editorProps.attributes.class -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div bind:this={richEl} onkeydown={interceptEnter}></div>

    {#if name}
      <!-- For normal HTML form submissions: sends HTML content -->
      <textarea onkeydown={interceptEnter} {name} {id} bind:value hidden></textarea>
    {/if}
  </div>
{:else}
  <!-- Plain textarea mode -->
  <textarea
    bind:this={plainEl}
    class={clsx(styles.textarea, className)}
    bind:value
    {name}
    {id}
    {placeholder}
    {disabled}
    {rows}
  ></textarea>
{/if}
