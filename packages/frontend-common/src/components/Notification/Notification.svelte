<script lang="ts">
  import { onDestroy } from 'svelte';
  import type { NotificationLevel } from '../../types';
  import { Timer } from '../../utils/timer';

  let {
    level,
    title,
    message,
    close,
  }: {
    level: NotificationLevel;
    title?: string;
    message: string;
    close: () => void;
  } = $props();
  let containerClass = $derived(`container ${level}`);
  let timerPercentage = $state(100);
  let closeTimeoutID = $state<NodeJS.Timeout>();

  const onTimerFinish = () => {
    containerClass += ' transition-out';
    closeTimeoutID = setTimeout(() => {
      close();
    }, 105);
  };

  const onTimerUpdate = (remainingMs: number) => {
    timerPercentage = (remainingMs / NOTIFICATION_DURATION_MS) * 100;
  };

  const NOTIFICATION_DURATION_MS = 15000;
  let timer = new Timer(NOTIFICATION_DURATION_MS, onTimerFinish, onTimerUpdate);

  timer.start();

  onDestroy(() => {
    timer.stop();
  });
</script>

<div class={containerClass}>
  {#if title}
    <p class="title">{title}</p>
  {/if}
  <p class="message">{message}</p>

  <div
    class={`timer ${timerPercentage > 0 ? 'visible' : ''}`}
    style={`width: ${timerPercentage}%; transition-duration: ${Timer.tickRate}ms`}
  ></div>
</div>

<style lang="scss">
  .container {
    --pop-ms: 100ms;

    position: absolute;
    bottom: 1rem;
    right: 2rem;

    width: 20rem;
    max-width: 90vw;

    padding: 1rem;

    background-color: var(--theme-danger-light);

    border: 1px solid var(--theme-danger);
    border-radius: 5px;

    animation: popIn var(--pop-ms) linear;

    &.transition-out {
      animation: popOut var(--pop-ms) linear forwards;
    }
  }

  .title {
    font-family: var(--theme-header-font);
    font-size: 1.2rem;
    color: var(--theme-text-primary);
  }

  .message {
    font-family: var(--theme-font);
    font-size: 1rem;
  }

  .timer {
    margin-top: 0.5rem;

    height: 1px;

    transition: width linear;

    border: 1px solid transparent;

    &.visible {
      border: 1px solid var(--theme-danger);
    }
  }

  @keyframes popIn {
    0% {
      transform: scale(0.8);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }

  @keyframes popOut {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.15);
    }
    100% {
      transform: scale(0);
    }
  }
</style>
