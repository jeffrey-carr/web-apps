<script lang="ts">
  import type { Tag } from '$lib/types/recipe';
  import styles from './styles.module.scss';
  let { data }: { data: Tag } = $props();
</script>

<span class={styles.container}>
  {data.name}
</span>
