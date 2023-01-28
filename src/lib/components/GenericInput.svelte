<script lang="ts">
  import type { ObsJsonTypes, obsTypes } from '$lib/obs';
  import Checkbox from './Checkbox.svelte';
  import InputText from './InputText.svelte';
  import NumberInput from './NumberInput.svelte';

  export let type: ObsJsonTypes;
  // Cursed any type
  export let value: any;

  export let name = '';
</script>

{#if type === 'string' || type === 'string?'}
  <InputText bind:value />
{:else if type === 'number' || type === 'number?'}
  <NumberInput bind:value />
{:else if type === 'boolean' || type === 'boolean?'}
  <Checkbox bind:checked={value} {name} />
{:else if type === 'value'}
  <InputText bind:value />
{/if}
