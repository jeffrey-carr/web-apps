<script lang="ts">
  import clsx from 'clsx';
  import styles from './styles.module.scss';
  let {
    stepNumber,
    onclick,
  }: {
    stepNumber: number;
    onclick?: () => void;
  } = $props();
  let completed = $state(false);

  const onClickWrapper = () => {
    completed = !completed;
    onclick?.();
  };
</script>

<button class={styles.stepNumber} onclick={onClickWrapper}>
  <div class={clsx(styles.inner, { [styles.completed]: completed })}>
    <div class={clsx(styles.face, styles.front)}>
      {stepNumber}
    </div>

    <div class={clsx(styles.face, styles.back)}>
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </div>
  </div>
</button>
