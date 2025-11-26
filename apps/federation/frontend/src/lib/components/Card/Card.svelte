<script lang="ts">
  import styles from './Card.module.scss';

  let {
    children,
  }: {
    children?: () => any;
  } = $props();
</script>

<div class={styles.container}>
  {@render children?.()}
</div>
