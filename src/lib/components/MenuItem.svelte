<script lang="ts">
  import { getContext } from 'svelte';

  export let disabled: boolean = false;
  export { className as class };

  let className: string = '';

  const select: (el: Element) => void = getContext('commixture-menu');

  function hover(e: MouseEvent) {
    if (!disabled) {
      select(e.target as Element);
    }
  }
</script>

<div
  class="menu-item px-2 {className}"
  on:mousemove={hover}
  on:mousedown|preventDefault
  on:mouseup
  on:click
>
  <slot />
</div>

<style>
  .menu-item:global(.selected) {
    background: rgb(var(--color-accent));
  }
</style>
