<script lang="ts">
  let { until }: { until?: number } = $props();
  let progress = $state(100);
  let intervalId: number;

  $effect(() => {
    if (!until) return;

    const updateProgress = () => {
      const now = new Date().getTime();
      const end = new Date(until).getTime();
      const remaining = Math.max(0, end - now);
      const totalDuration = 5000; // 5 seconds timeout

      progress = (remaining / totalDuration) * 100;

      if (remaining <= 0) {
        clearInterval(intervalId);
        progress = 0;
      }
    };

    // Initial update
    updateProgress();

    // Update every 50ms for smooth animation
    intervalId = setInterval(updateProgress, 50);

    return () => clearInterval(intervalId);
  });
</script>

<div class="container">
  {#if until}
    <div class="timer" style={`--progress: ${progress}%`}></div>
  {/if}
</div>

<style>
  .container {
    position: relative;
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .timer {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: conic-gradient(var(--theme-danger) var(--progress), transparent var(--progress));
    transition: background 50ms linear;
  }
</style>
