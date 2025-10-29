<script lang="ts">
  import { getDaysInMonth, getFirstDayOfMonth, getMonthName, Modal } from '@jeffrey-carr/frontend-common';
  import { DAYS_OF_THE_WEEK, type Calendar } from "$lib/types";
  import Day from "./Day.svelte";

  import styles from './Calendar.module.scss';
  import clsx from 'clsx';
  import { getContext } from 'svelte';
  import { UserLocaleKey } from '$lib/constants/context';

  let { 
    calendar,
    month,
    onUpdateImage,
    onUpdateEvents,
  }: {
    calendar: Calendar;
    month: number;
    onUpdateImage: (day: number) => void;
    onUpdateEvents: (day: number) => void;
  } = $props();
  let firstWeekday = $derived(getFirstDayOfMonth(calendar.year, month));
  let daysInMonth = $derived(getDaysInMonth(calendar.year, month));
  let userLocale = getContext<string | undefined>(UserLocaleKey);
  let monthName = $derived(getMonthName(calendar.year, month, userLocale));

  const getDayContentType = (dayI: number): 'blank' | 'day' => {
    if (dayI < firstWeekday || dayI >= daysInMonth+firstWeekday) {
      return 'blank';
    }
    return 'day';
  };
  const getDayValue = (dayI: number): number => {
    if (getDayContentType(dayI) === 'blank') {
      return -1;
    }

    return dayI+1-firstWeekday;
  };
</script>

<div class={styles.container}>
  <div class={styles.titleContainer}>
    <h1 class={styles.monthTitle}>{monthName}</h1>
  </div>

  <div class={styles.daysContainer}>
    <div class={styles.dowContainer}>
      {#each DAYS_OF_THE_WEEK as dow}
        <div class={styles.dow}> <span>{dow}</span>
        </div>
      {/each}
    </div>
    {#each { length: 35 } as _, i}
      <div class={clsx(styles.cell, { [styles.bottomLeft]: i === 28, [styles.bottomRight]: i === 34 })}>
        {#if getDayContentType(i) === 'blank'}
          <Day contentType='blank' day={getDayValue(i)} onUpdateImage={() => onUpdateImage(i)} />
        {:else}
          <Day contentType='day' day={getDayValue(i)} onUpdateEvents={() => onUpdateEvents(i)} data={calendar.months[month]?.[i]?.events} />
        {/if}
      </div>
    {/each}
  </div>
</div>

