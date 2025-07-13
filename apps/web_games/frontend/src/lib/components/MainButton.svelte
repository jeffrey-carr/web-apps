<script lang="ts">
  import { goto } from '$app/navigation';
  import { ExpandButton } from '@jeffrey-carr/frontend-common';

  const back = () => {
    goto('/');
  };
</script>

<div class="container">
  <ExpandButton theme="secondary" onclick={back}>Back to main</ExpandButton>
</div>

<style lang="scss">
  .container {
    position: absolute;
    top: 1rem;
    left: 1rem;
  }
</style>
