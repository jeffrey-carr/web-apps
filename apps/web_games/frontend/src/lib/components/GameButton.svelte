<script lang="ts">
  import { goto } from '$app/navigation';
  import { onDestroy } from 'svelte';

  let { icon, name, slug }: { icon: any; name: string; slug: string } = $props();

  let removeBounceTimer = $state<NodeJS.Timeout>();
  let bounceTimer = $state<NodeJS.Timeout>();
  let containerClass = $state('container');

  const navigate = () => {
    goto(slug);
  };

  const onHover = () => {
    bounceTimer = setInterval(() => {
      containerClass = 'container bounce';
      removeBounceTimer = setTimeout(() => {
        containerClass = 'container';
      }, 1000);
    }, 2000);
  };

  const onHoverEnd = () => {
    clearInterval(bounceTimer);
  };

  onDestroy(() => {
    clearInterval(bounceTimer);
    clearTimeout(removeBounceTimer);
  });
</script>

<button class={containerClass} onclick={navigate} onmouseenter={onHover} onmouseleave={onHoverEnd}>
  <div class="icon">
    {@render icon()}
  </div>
  <h1 class="title">{name}</h1>
</button>

<style lang="scss">
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    height: 100%;
    max-height: 200px;
    aspect-ratio: 1 / 1;

    padding: 1rem;

    background-color: var(--bg-color-light);
    border: 2px solid var(--mauve);
    border-radius: 10px;

    text-align: center;

    --transition-ms: 150ms;
    transition:
      transform linear var(--transition-ms),
      box-shadow linear var(--transition-ms);

    --transform-em: -0.3rem;
    --transform-em-inverse: calc(-1 * var(--transform-em));
    &:hover {
      cursor: pointer;
      transform: translate(var(--transform-em), var(--transform-em));
      box-shadow: var(--transform-em-inverse) var(--transform-em-inverse) var(--app-theme-secondary);
    }
    &:active {
      transform: translate(0, 0);
      box-shadow: 0px 0px;
    }
  }

  .bounce {
    animation: bounce 400ms ease-in-out;
  }

  .icon {
    width: 60%;
    aspect-ratio: 1 / 1;

    margin: auto;
  }

  .title {
    font-size: 2rem;
  }

  @keyframes bounce {
    0% {
      transform: translate(var(--transform-em, 0.3rem), var(--transform-em, 0.3rem));
      box-shadow: var(--transform-em-inverse) var(--transform-em-inverse) var(--app-theme-secondary);
    }
    25% {
      transform: translate(
        calc(var(--transform-em, 0.3rem) + var(--transform-em, 0.3rem) * 0.5),
        calc(var(--transform-em, 0.3rem) + var(--transform-em, 0.3rem) * 0.5)
      );
      box-shadow: calc(var(--transform-em-inverse) + var(--transform-em-inverse, 0.3) * 0.5)
        calc(var(--transform-em-inverse, 0.3rem) + var(--transform-ms-inverse, 0.3rem) * 0.5)
        var(--app-theme-secondary);
    }
    75% {
      transform: translate(
        calc(var(--transform-em, 0.3rem) - var(--transform-em, 0.3rem) * 0.5),
        calc(var(--transform-em, 0.3rem) - var(--transform-em, 0.3rem) * 0.5)
      );
      box-shadow: calc(var(--transform-em-inverse) - var(--transform-em-inverse, 0.3) * 0.5)
        calc(var(--transform-em-inverse, 0.3rem) - var(--transform-ms-inverse, 0.3rem) * 0.5)
        var(--app-theme-secondary);
    }
    100% {
      transform: translate(var(--transform-em, 0.3rem), var(--transform-em, 0.3rem));
    }
  }
</style>
