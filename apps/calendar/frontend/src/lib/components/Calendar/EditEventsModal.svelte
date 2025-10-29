<script lang="ts">
  import { Button, friendlyPrintDate, generateUUID, getFirstDayOfMonth, Input, Modal } from '@jeffrey-carr/frontend-common';
  import type { Calendar } from '$lib/types';

  import styles from './EditEventsModal.module.scss';

  type EventWithID = {
    uuid: string;
    event: string;
  }

  let { 
    open = $bindable(false),
    calendar,
    currentMonth,
    currentDay,
    userLocale,
    onUpdateEvents,
  }: {
    open?: boolean;
    calendar: Calendar;
    currentMonth: number;
    currentDay: number;
    userLocale?: string;
    onUpdateEvents: (updatedEvents: string[]) => Promise<void>;
  } = $props();
  let editingEvents = $state<EventWithID[]>([]);
  const getFriendlyEditingDate = (year: number, month: number, day: number, userLocale?: string): string => {
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    return friendlyPrintDate(year, month, day+1-firstDayOfMonth, userLocale, false);
  };
  let friendlyDate = $derived(getFriendlyEditingDate(calendar.year, currentMonth, currentDay, userLocale));
  let saving = $state(false);

  $effect(() => {
    // Assign each event an arbirary ID so it can be rendered properly
    const events = calendar.months[currentMonth]?.[currentDay]?.events;
    if (!events) {
      editingEvents = [];
    } else {
      editingEvents = events.map((event: string) => {
        return { uuid: generateUUID(), event };
      });
    }
  });

  const validateOrderValue = (orderStr: string): string => {
    orderStr = orderStr.trim();
    const order = Number(orderStr);
    if (isNaN(order)) {
      return "Must be a number"
    }
    if (order < 1) {
      return "Minimum is 1";
    }
    if (order > editingEvents.length) {
      return `Maximum is ${editingEvents.length}`;
    }

    return "";
  };

  const saveEdits = async () => {
    saving = true;
    editingEvents = editingEvents.filter(ev => ev.event.trim().length > 0)
    await onUpdateEvents(editingEvents.map(ev => ev.event));
    saving = false;
  }

  const addEvent = () => {
    editingEvents = [...editingEvents, { uuid: generateUUID(), event: "" }];
  };

  const updateOrder = (oldIndex: number, newIndex: number) => {
    if (newIndex < 0 || newIndex >= editingEvents.length || oldIndex === newIndex) {
      return;
    }

    const [event] = editingEvents.splice(oldIndex, 1);
    editingEvents.splice(newIndex, 0, event);
  };

  const removeEvent = (index: number) => {
    editingEvents.splice(index, 1);
  };
</script>

<Modal bind:open>
  <div class={styles.modal}>
    <h1>{friendlyDate ?? "Edit Events"}</h1>
    <div class={styles.container}>
      {#if (editingEvents?.length ?? 0) === 0}
        <p class={styles.empty}>No events yet.</p>
      {:else}
        <ul class={styles.eventList}>
          {#each editingEvents as ev, i (ev.uuid)}
            <li class={styles.eventItem} aria-label={`Event ${i + 1}`}>
              <!-- Order number box -->
              <Input
                class={styles.orderBox}
                type="number"
                value={i+1}
                inputmode="numeric"
                min={1}
                max={editingEvents.length}
                onblur={(e: FocusEvent) => updateOrder(i, Number((e.currentTarget as HTMLInputElement).value)-1)}
                aria-label={`Set order for event ${i + 1}`}
                title="Set order"
                validator={validateOrderValue}
              />

              <!-- Events input -->
              <Input bind:value={editingEvents[i].event} />

              <!-- Delete -->
              <Button 
                class={styles.iconButton}
                type="plain"
                size="medium"
                onclick={() => removeEvent(i)}
              >
                Delete
              </Button>
            </li>
          {/each}
        </ul>
      {/if}
      <div class={styles.addEventSection}>
        <Button onclick={addEvent}>Add Event</Button>
      </div>
    </div>
    <div class={styles.footerButtons}>
      <Button size="medium" type="secondary" onclick={() => open = false}>Cancel</Button>
      <Button size="medium" onclick={saveEdits} loading={saving}>Save</Button>
    </div>
  </div>
</Modal>

