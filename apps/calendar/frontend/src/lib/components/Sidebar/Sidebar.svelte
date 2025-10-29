<script lang="ts">
  import { CurrentCalendarKey, NotificationKey } from "$lib/constants/context";
  import { createCalendar } from "$lib/request";
  import type { Calendar } from "$lib/types/calendar";
  import { Button, Input, Modal, type NotificationInfo } from "@jeffrey-carr/frontend-common";
  import { getContext } from "svelte";
  import type { Writable } from "svelte/store";

  import styles from './Sidebar.module.scss';
  import clsx from 'clsx';

  let { calendars }: { 
    calendars: Record<string, Calendar> | null; 
  } = $props();
  let showCreate = $state(false);
  let newCalendarName = $state("");
  let creatingCalendar = $state(false);
  let currentCalendar = $state('');

  let currentCalendarStore = getContext<Writable<string>>(CurrentCalendarKey);
  let notificationsStore = getContext<Writable<NotificationInfo>>(NotificationKey);


  $effect(() => {
    const unsubCurrentCalendar = currentCalendarStore.subscribe(v => currentCalendar = v);

    return () => {
      unsubCurrentCalendar();
    };
  });

  const toggleShowCreate = () => {
    showCreate = !showCreate;
  };

  // TODO - loading symbol for create button
  // TODO - add new calendar to list of calendars
  const create = async () => {
    creatingCalendar = true;
    const trimmed = newCalendarName.trim();

    if (validateNewCalendarName(trimmed).length !== 0) {
      return;
    }

    try {
      await createCalendar({ name: newCalendarName });
    } catch (e) {
      notificationsStore.set({ title: "Error", message: e as string, level: 'error' });
      return;
    }

    notificationsStore.set({ title: "Success", message: "Calendar created successfully!" });
    showCreate = false;
    creatingCalendar = false;
  };

  const validateNewCalendarName = (newName: string) => {
    const trimmed = newName.trim();

    if (trimmed.length === 0) {
      return "Name must be at least 1 letter";
    }

    return "";
  };

  const updateSelectedCalendar = (uuid: string) => {
      currentCalendarStore.set(uuid);
  };
</script>

<Modal bind:open={showCreate}>
  <div class={styles.createModalContainer}>
    <h1>Create Calendar</h1>
    <Input 
      bind:value={newCalendarName}
      validator={validateNewCalendarName}
    />
    <div class={styles.modalButtonsContainer}>
      <Button onclick={toggleShowCreate} type="secondary">Cancel</Button>
      <Button onclick={create} loading={creatingCalendar}>Create</Button>
    </div>
  </div>
</Modal>

{#snippet sidebarItem(calendar: Calendar, selected: boolean)}
  <button class={clsx(styles.item, { [styles.selected]: selected })} onclick={() => updateSelectedCalendar(calendar.uuid)}>
    <h2 class={styles.title}>{calendar.name}</h2>
    <p class={styles.subtitle}>Last edited at {calendar.modifiedAt}</p>
  </button>
{/snippet}

<div class={styles.container}>
  <h1 class={styles.title}>Your Calendars</h1>
  <div class={styles.content}>
  {#if calendars != null}
    {#each Object.values(calendars) as cal (cal.uuid)}
      {@render sidebarItem(cal, cal.uuid === currentCalendar)}
    {/each}
  {:else}
    <p class={styles.noItems}>You have no calendars!</p>
  {/if}
  </div>
  <div class={styles.footer}>
    <Button onclick={toggleShowCreate}>New calendar</Button>
  </div>
</div>
