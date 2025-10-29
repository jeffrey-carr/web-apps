<script lang="ts">
  import { PUBLIC_ENVIRONMENT } from "$env/static/public";
  import { Sidebar } from "$lib/components";
    import CalendarLayout from "$lib/components/Calendar/CalendarLayout.svelte";
  import { UserLoadingKey, UserKey, CalendarsKey, CalendarsLoadingKey } from "$lib/constants/context";
  import type { Calendar } from "$lib/types";
  import { App, getAppURL, Spinner, type User } from "@jeffrey-carr/frontend-common";
  import { getContext } from "svelte";
  import type { Writable } from "svelte/store";

  import styles from './+page.module.scss';

  const userStore = getContext<Writable<User | undefined>>(UserKey);
  const userLoadingStore = getContext<Writable<boolean>>(UserLoadingKey);
  const calendarsStore = getContext<Writable<Record<string, Calendar>>>(CalendarsKey);
  const calendarsLoadingStore = getContext<Writable<boolean>>(CalendarsLoadingKey);

  let user = $state<User>();
  let userLoading = $state(true);

  let calendars = $state<Record<string, Calendar>>({});
  let calendarsLoading = $state(true);

  let loading = $derived(userLoading || calendarsLoading);

  $effect(() => {
    const unsubUser = userStore.subscribe(v => user = v);
    const unsubLoading = userLoadingStore.subscribe(v => userLoading = v);
    const unsubCalendars = calendarsStore.subscribe(v => calendars = v ?? {});
    const unsubCalendarsLoading = calendarsLoadingStore.subscribe(v => calendarsLoading = v);

    return () => {
      unsubUser();
      unsubLoading();
      unsubCalendars();
      unsubCalendarsLoading();
    };
  });

  $effect(() => {
    if (!user && !userLoading) {
      window.location.assign(`${getAppURL(PUBLIC_ENVIRONMENT, App.Federation)}?app=${App.Calendar}`);
      return;
    }
  });
</script>

<main class={styles.container}>
  {#if loading}
    <div class={styles.loadingContainer}>
      <div class={styles.spinnerContainer}>
        <Spinner />
      </div>
      <span class={styles.loadingText}>Loading your calendar creating experience...</span>
    </div>
  {:else if user}
    <div class={styles.content}>
      <div class={styles.sidebarContainer}>
        <Sidebar {calendars} />
      </div>
      <div class={styles.main}>
        <CalendarLayout />
      </div>
    </div>
  {:else}
    <div class={styles.loadingContainer}>
      <div class={styles.spinnerContainer}>
        <Spinner />
      </div>
      <span class={styles.loadingText}>Redirecting you to log in...</span>
    </div>
  {/if}
</main>

