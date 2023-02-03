<script lang="ts">
  import Menu from './Menu.svelte';
  import { setContext } from 'svelte';

  export let value: string;
  export let type: 'text' | 'password' = 'text';
  export let id = '';
  export let placeholder: string | undefined = undefined;
  export let disabled = false;

  export let suggestions: readonly string[] = [];

  let inputEl: HTMLInputElement;

  $: filteredOptions = getFiltered(suggestions, value);

  function searchString(pattern: string, input: string): boolean {
    return input.toLowerCase().startsWith(pattern.toLowerCase());
  }

  function getFiltered(opts: readonly string[], term: string): string[] {
    if (opts.length === 0) {
      return [];
    }
    return opts.filter((x) => searchString(term, x));
  }

  function selectSuggestion(val: string) {
    value = val;
    inputEl.blur();
  }

  let focused = false;

  function onFocus() {
    focused = true;
  }
  function onBlurInput() {
    focused = false;
  }

  $: suggestionsOpen = suggestions.length && focused;

  export let rightIcon: string | undefined = undefined;
</script>

<div class="inline-block relative w-full">
  {#if type === 'password'}
    <input
      {id}
      class="w-full b-1 b-solid b-border.dark rounded bg-bg hover:bg-bg.hover focus:b-border.focus {$$props.class}"
      type="password"
      bind:value
      {placeholder}
      {disabled}
    />
  {:else}
    <input
      {id}
      class="w-full b-1 b-solid b-border.dark rounded bg-bg hover:bg-bg.hover focus:b-border.focus {$$props.class}"
      class:rounded-b-0={suggestionsOpen}
      type="text"
      bind:this={inputEl}
      on:focus={onFocus}
      on:blur={onBlurInput}
      on:input
      bind:value
      {placeholder}
      {disabled}
    />
    {#if rightIcon}
      <div class="absolute top-0 bottom-0 right-1 pointer-events-none">
        <div class="w-4 h-4 {rightIcon}" />
      </div>
    {/if}
    {#if suggestionsOpen}
      <div class="relative w-full">
        <Menu
          class="absolute w-full z-10 max-h-52"
          content={[
            filteredOptions.map((x) => ({
              name: x,
              callback: () => {
                selectSuggestion(x);
              },
            })),
          ]}
        />
      </div>
    {/if}
  {/if}
</div>
