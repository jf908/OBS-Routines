<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { scale } from 'svelte/transition';
  import { backOut } from 'svelte/easing';

  export let checked: boolean = false;
  export let name: string = '';
  export let disabled: boolean = false;

  const dispatch = createEventDispatcher();

  function onChecked(e: Event) {
    dispatch('change', (e.target as HTMLInputElement).checked);
  }
</script>

<!-- prettier-ignore -->
<label class="flex relative" class:notchecked={!checked} class:disabled>
  <input type="checkbox" class="b-1 b-solid b-border.dark w-1rem h-1rem bg-bg hover:bg-bg.hover rounded !checked:bg-accent" bind:checked {disabled} on:change={onChecked}/>{#if checked}<div class="absolute i-ph-check-bold top-2px left-2px" transition:scale={{ duration: 400, easing: backOut }} />{/if}<span class="ml-1">{name}<slot></slot></span>
</label>

<style>
  /* .checkbox-label {
    position: relative;
    padding-top: 4px;
  } */

  input[type='checkbox'] {
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    display: inline-block;
    /* width: var(--font-size-large);
    height: var(--font-size-large); */
    padding: 0;
    margin: 0;
    position: relative;
    /* margin-right: var(--pad-med); */
  }

  /* input[type='checkbox']:checked {
    background: var(--accent);
  } */

  .notchecked span {
    /* color: var(--color-faded); */
  }

  .notchecked:hover span {
    /* color: var(--color); */
  }
</style>
