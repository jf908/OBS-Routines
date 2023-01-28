<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let open = false;
  export let headerClass: string = '';

  const dispatch = createEventDispatcher();
</script>

<div class={$$props.class}>
  <div
    class="p-1 flex items-center header bg-bg.subtle {headerClass}"
    on:click={() => {
      dispatch('toggle', !open);
      open = !open;
    }}
  >
    <div class="i-ph-caret-right mr-1" class:rotate-90={open} />
    <slot name="header" />
  </div>
  {#if open}
    <slot />
  {/if}
</div>
