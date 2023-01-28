<script lang="ts">
  import MenuItem from './MenuItem.svelte';
  import { setContext } from 'svelte';
  import type { MenuContent, MenuItemObject } from '$lib/menu';

  export let content: MenuContent = [];
  export let style: string = '';

  setContext('commixture-menu', (el: Element) => {
    selectElement(el);
  });

  let parent: HTMLElement;
  let selectedEl: Element | null;

  function selectUp() {
    let checkEl = selectedEl
      ? selectedEl.previousElementSibling
      : parent.children[parent.children.length - 1];
    while (checkEl) {
      if (isValidMenuItem(checkEl)) {
        selectElement(checkEl);
        break;
      }
      checkEl = checkEl.previousElementSibling;
    }
  }

  function selectDown() {
    let checkEl = selectedEl
      ? selectedEl.nextElementSibling
      : parent.children[0];
    while (checkEl) {
      if (isValidMenuItem(checkEl)) {
        selectElement(checkEl);
        break;
      }
      checkEl = checkEl.nextElementSibling;
    }
  }

  function onKeydown(e: KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      selectDown();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      selectUp();
    } else if (e.key === 'Enter') {
      if (selectedEl) {
        selectedEl.dispatchEvent(new Event('mouseup'));
      }
    }
  }

  function isValidMenuItem(el: Element) {
    return (
      el.classList.contains('menu-item') && !el.classList.contains('disabled')
    );
  }

  function selectElement(el: Element) {
    if (selectedEl) {
      selectedEl.classList.remove('selected');
    }
    selectedEl = el;
    selectedEl.classList.add('selected');
  }

  function onWheel(e: WheelEvent) {
    if (e.deltaY < 0) {
      selectUp();
    } else if (e.deltaY > 0) {
      selectDown();
    }
  }

  function onMouseUp(item: MenuItemObject) {
    item.callback?.(item.name);
  }
</script>

<div
  class="bg-bg b-1 b-solid b-border.dark rounded-b overflow-hidden {$$props.class}"
  {style}
  bind:this={parent}
>
  {#each content as itemArr, i}
    {#if i !== 0}
      <div class="h-1px w-full my-1 bg-bg.subtle" />
    {/if}
    {#each itemArr as item, j}
      <MenuItem
        class={item.disabled ? 'disabled' : ''}
        on:mouseup={() => onMouseUp(item)}>{item.name}</MenuItem
      >
    {/each}
  {/each}
  <slot />
</div>

<svelte:window on:keydown={onKeydown} on:wheel={onWheel} />
