<script lang="ts">
  import {
    AVAILABLE_ACTIVE_ICONS,
    ReactiveIcon,
    Spinner,
    type AvailableReactiveIcon,
  } from '@jeffrey-carr/frontend-common';
  import clsx from 'clsx';

  // does its best at determining the right "active" icon to use
  const deriveActiveIcon = (
    givenIcon?: AvailableReactiveIcon
  ): AvailableReactiveIcon | undefined => {
    if (activeIcon) {
      return activeIcon;
    }

    if (AVAILABLE_ACTIVE_ICONS.includes(`${givenIcon}-fill` as AvailableReactiveIcon)) {
      return `${givenIcon}-fill` as AvailableReactiveIcon;
    }

    return icon;
  };

  let {
    bgColor,
    icon,
    activeIcon,
    textColor,
    onclick,
    active = $bindable(false),
    children,
  }: {
    bgColor?: string;
    icon?: AvailableReactiveIcon;
    activeIcon?: AvailableReactiveIcon;
    textColor?: string;
    onclick?: () => Promise<void>;
    active?: boolean;
    children?: () => any;
  } = $props();
  let loading = $state(false);
  let autoActiveIcon = $derived(deriveActiveIcon(icon));

  const handleClick = async () => {
    loading = true;
    active = !active;

    await onclick?.();

    loading = false;
  };
</script>

<button
  class={clsx('button', { active })}
  style={`--bg-color: ${bgColor}; --text-color: ${textColor}`}
  onclick={handleClick}
>
  {#if loading}
    <Spinner size="1.2rem" />
  {:else}
    {#if autoActiveIcon && active}
      <ReactiveIcon class="icon" icon={autoActiveIcon} />
    {:else if icon}
      <ReactiveIcon class="icon" {icon} />
    {/if}
    {@render children?.()}
  {/if}
</button>

<style lang="scss">
  .button {
    --color: var(--text-color, var(--app-theme-text-primary));
    --reactive-icon-size: 1rem;
    --reactive-icon-height: var(--reactive-icon-size);
    --reactive-icon-width: var(--reactive-icon-size);
    --reactive-icon-fill: black;

    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: fit-content;

    background-color: var(--bg-color-surface);
    border: 1px solid var(--app-theme-border-color);
    border-radius: var(--app-theme-border-radius-l);

    transition:
      background-color var(--default-transition-ms) linear,
      color var(--default-transition-ms) linear,
      border-color var(--default-transition-ms) linear;

    padding: 0.5rem 1rem;

    &:hover,
    &.active {
      --reactive-icon-fill: var(--text-color);
      background-color: var(--bg-color);
      border-color: var(--text-color);
      color: var(--text-color);

      cursor: pointer;
    }
  }
</style>
