<script lang="ts">
  import { fade } from 'svelte/transition';

  export let tooltipContent: (node: HTMLElement) => void;
  export let showTooltip: boolean;
</script>

{#if showTooltip}
  <div
    class="absolute bg-bg p-1 b-1 b-solid b-border.default rounded z-1000"
    use:tooltipContent
    transition:fade|local={{ duration: 100 }}
  >
    <slot />
  </div>
{/if}
