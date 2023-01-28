<script lang="ts">
  import Menu from './Menu.svelte';
  import { setContext } from 'svelte';

  export let value: string;
  export let type: 'text' | 'password' = 'text';
  export let id = '';
  export let placeholder: string | undefined = undefined;

  export let suggestions: readonly string[] = [];

  let inputEl: HTMLInputElement;

  let maxLength = 20;

  $: filteredOptions = getFiltered(suggestions, value);

  function searchString(pattern: string, input: string): boolean {
    return input.toLowerCase().startsWith(pattern.toLowerCase());
  }

  function getFiltered(opts: readonly string[], term: string): string[] {
    if (opts.length === 0) {
      return [];
    }
    return opts.filter((x) => searchString(term, x)).slice(0, maxLength);
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
</script>

{#if type === 'password'}
  <input
    {id}
    class="w-full b-1 b-solid b-border.dark rounded bg-bg hover:bg-bg.hover focus:b-border.focus {$$props.class}"
    type="password"
    bind:value
    {placeholder}
  />
{:else}
  <input
    {id}
    class="w-full b-1 b-solid b-border.dark rounded bg-bg hover:bg-bg.hover focus:b-border.focus {$$props.class}"
    type="text"
    bind:this={inputEl}
    on:focus={onFocus}
    on:blur={onBlurInput}
    on:input
    bind:value
    {placeholder}
  />
  {#if suggestions.length && focused}
    <div class="relative w-full">
      <Menu
        class="absolute w-full z-10"
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
