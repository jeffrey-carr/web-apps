<script lang="ts">
  import type { Section } from '$lib/types/recipe';
  import styles from './styles.module.scss';

  let {
    sections,
    activeSection = $bindable(0),
  }: {
    sections: Section[];
    activeSection: number;
  } = $props();
</script>

<!-- <div class={styles.spacer}></div> -->
<div class={styles.container}></div>
