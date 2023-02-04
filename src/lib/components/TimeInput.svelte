<script lang="ts">
  import NumberInput from './NumberInput.svelte';

  export let value: number;

  const secs = value / 1000;
  let hours = Math.floor(secs / 3600);
  let minutes = Math.floor((secs - hours * 3600) / 60);

  function updateValue(hours: number, minutes: number) {
    value = (hours * 60 + minutes) * 60 * 1000;
  }

  $: updateValue(hours, minutes);
</script>

<div class="flex">
  <NumberInput class="rounded-r-none" bind:value={hours} min={0} max={23} />
  <NumberInput
    class="rounded-l-none ml--1px"
    bind:value={minutes}
    min={0}
    max={59}
  />
</div>
