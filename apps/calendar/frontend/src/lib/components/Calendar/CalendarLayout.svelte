<script lang="ts">
  import { CalendarsKey, CurrentCalendarKey, NotificationKey, UserLocaleKey } from "$lib/constants/context";
  import { type Calendar as CalendarInfo, type UpdateCalendarRequest} from "$lib/types";
  import { getContext } from "svelte";
  import type { Writable } from "svelte/store";
  import Calendar from "./Calendar.svelte";

  import styles from './CalendarLayout.module.scss';
  import { Button, getMonthName, Modal, type NotificationInfo } from "@jeffrey-carr/frontend-common";
  import clsx from "clsx";
  import EditEventsModal from "./EditEventsModal.svelte";
  import { updateCalendar } from "$lib/request";

  let calendars = $state<Record<string, CalendarInfo>>({});
  let currentCalendar = $state("");
  let calendarsStore = getContext<Writable<Record<string, CalendarInfo>>>(CalendarsKey);
  let currentCalendarStore = getContext<Writable<string>>(CurrentCalendarKey);
  let userLocale = getContext<string | undefined>(UserLocaleKey);

  let notificationsStore = getContext<Writable<NotificationInfo>>(NotificationKey);

  let calendar = $derived(calendars != null && currentCalendar != "" ? calendars[currentCalendar] : null); let currentMonth = $state(0);

  let showImageModal = $state(false);
  let showEventsModal = $state(false);

  $effect(() => {
    const unsubCalendars = calendarsStore.subscribe(v => calendars = v);
    const unsubCurrentCalendar = currentCalendarStore.subscribe(v => currentCalendar = v);

    return () => {
      unsubCalendars();
      unsubCurrentCalendar();
    };
  });

  let editingDay = $state(-1);

  const updateModal = (modal: 'image' | 'events', day: number) => {
    if (!calendar) return;

    editingDay = day;
    if (modal === 'image') {
      showImageModal = true;
    } else {
      showEventsModal = true;
    }
  };

  const updateCalendarEvents = async (updatedEvents: string[]) => {
    if (!calendar) {
      return;
    }

    let updatedMonth = calendar.months?.[currentMonth];
    if (!updatedMonth) {
      updatedMonth = {};
    }
    let updatedDay = updatedMonth[editingDay];
    if (!updatedDay) {
      updatedDay = {
        events: [],
        imageURL: "",
      };
    }
    updatedDay.events = updatedEvents;
    updatedMonth[editingDay] = updatedDay;
    calendar.months[currentMonth] = updatedMonth;

    const updateRequest: UpdateCalendarRequest = {
      months: calendar.months,
    };

    let updatedCalendar: CalendarInfo;
    try {
      updatedCalendar = await updateCalendar(calendar.uuid, updateRequest);
    } catch (e) {
      console.error("Error updating calendar");
      notificationsStore.set({ title: "Calendar not saved", message: "Failed to save calendar", level: "error" });
      return;
    }

    calendar = updatedCalendar;
    notificationsStore.set({ title: "Calendar saved", message: "Calendar saved successfully", level: "success" });
  };
</script>

<Modal bind:open={showImageModal}></Modal>
{#if calendar}
  <EditEventsModal 
    bind:open={showEventsModal}
    {calendar}
    {currentMonth}
    currentDay={editingDay}
    {userLocale}
    onUpdateEvents={updateCalendarEvents}
  />
{/if}

<div class={styles.container}>
  {#if calendar == null}
    <p>Select or create a calendar to get started</p>
  {:else}
    <Calendar 
      {calendar}
      month={currentMonth}
      onUpdateImage={(day: number) => updateModal('image', day)}
      onUpdateEvents={(day: number) => updateModal('events', day)}
    />
    <div class={styles.monthPicker}>
      {#each { length: 12 } as _, monthI}
        <Button 
          class={clsx(styles.monthButton, { [styles.monthButtonSelected]: monthI === currentMonth})}
          onclick={() => { currentMonth = monthI }}
          disabled={currentMonth === monthI}
        >{getMonthName(calendar.year, monthI, userLocale)}</Button>
      {/each}
    </div>
  {/if}
</div>

