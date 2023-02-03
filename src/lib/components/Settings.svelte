<script lang="ts">
  import { fontSize } from '$lib/store';
  import { slide } from 'svelte/transition';
  import FormElement from './FormElement.svelte';
  import NumberInput from './NumberInput.svelte';
  import Panel from './Panel.svelte';

  let open = false;
</script>

<Panel class="bg-bg.muted {$$props.class}">
  <svelte:fragment slot="header">Settings</svelte:fragment>
  <div
    class="p-3 flex flex-col gap-2"
    transition:slide|local={{ duration: 100 }}
  >
    <FormElement id="font-size" label="Text Size">
      <NumberInput bind:value={$fontSize} step={2} min={10} max={64} />
      <span>Default: 12</span>
    </FormElement>
  </div>
</Panel>
