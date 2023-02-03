<script lang="ts">
  import {
    getDefaultJsonValue,
    type ObsJsonTypes,
    type obsTypes,
  } from '$lib/obs';
  import Checkbox from './Checkbox.svelte';
  import InputText from './InputText.svelte';
  import NumberInput from './NumberInput.svelte';
  import FormElement from './FormElement.svelte';

  export let type: ObsJsonTypes | Record<string, ObsJsonTypes>;
  // Cursed any type
  export let value: any;

  export let name = '';
  export let disabled: boolean;

  function onNullCheck({ detail }: CustomEvent<boolean>) {
    if (typeof type !== 'string') return;
    if (detail) {
      value = getDefaultJsonValue(type.slice(0, -1) as ObsJsonTypes);
    } else {
      value = null;
    }
  }
</script>

{#if typeof type === 'object'}
  {#each Object.entries(type) as [k, v]}
    <FormElement id={k} label={k}>
      <svelte:self
        type={v}
        name={v === 'boolean' ? k : undefined}
        bind:value={value[k]}
        {disabled}
      />
    </FormElement>
  {/each}
{:else if type.endsWith('?')}
  <div class="flex items-baseline">
    <Checkbox checked={value !== null} on:change={onNullCheck} />
    <svelte:self
      type={type.slice(0, -1)}
      bind:value
      disabled={disabled || value === null}
    />
  </div>
{/if}
{#if type === 'string'}
  <InputText bind:value {disabled} />
{:else if type === 'number'}
  <NumberInput bind:value {disabled} />
{:else if type === 'boolean'}
  <Checkbox bind:checked={value} {name} {disabled} />
{:else if type === 'value'}
  <InputText bind:value {disabled} />
{/if}
