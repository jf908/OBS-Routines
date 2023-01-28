<script lang="ts">
  import Button from './Button.svelte';

  export let open: boolean = false;

  let el: HTMLElement;

  function toggle() {
    open = !open;
  }

  function onMouseDown(e: MouseEvent) {
    if (open && !el.contains(e.target as Element)) {
      open = false;
    }
  }
</script>

<div class="relative" bind:this={el} on:click|capture|stopPropagation>
  <Button
    on:mousedown={toggle}
    class="relative {open
      ? '!bg-accent !text-fg.on.accent rounded-b-0'
      : ''} {$$props.class}"
  >
    <slot />
  </Button>
  {#if open}
    <slot name="menu" />
  {/if}
</div>

<svelte:window on:mousedown={onMouseDown} />
