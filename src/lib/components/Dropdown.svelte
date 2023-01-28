<script lang="ts">
  import Menu from './Menu.svelte';

  export let value: string;
  export let id = '';
  export let placeholder: string | undefined = undefined;

  export let options: readonly string[] = [];
  export let searchTerm = value;

  let inputEl: HTMLInputElement;

  $: filteredOptions = getFiltered(options, searchTerm);

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
    searchTerm = '';
    focused = true;
  }
  function onBlurInput() {
    focused = false;
    searchTerm = value;
  }
</script>

<input
  {id}
  class="w-full b-1 b-solid b-border.dark rounded bg-bg hover:bg-bg.hover focus:b-border.focus {$$props.class}"
  type="text"
  bind:this={inputEl}
  on:focus={onFocus}
  on:blur={onBlurInput}
  on:input
  bind:value={searchTerm}
  {placeholder}
/>
{#if focused}
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
