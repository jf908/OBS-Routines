<script lang="ts">
  import { obsLog } from '$lib/logging';
  import { slide } from 'svelte/transition';
  import Button from './Button.svelte';
  import Panel from './Panel.svelte';

  let open = false;
</script>

<Panel class="bg-bg.muted {$$props.class}">
  <svelte:fragment slot="header">Log</svelte:fragment>
  <div
    class="p-3 max-h-50vh flex flex-col gap-2"
    transition:slide={{ duration: 100 }}
  >
    <div>
      <Button on:click={obsLog.reset}>Clear</Button>
    </div>
    <div
      class="bg-bg b-1 b-solid b-border.dark select-text overflow-auto min-h-1rem leading-none"
    >
      {#each $obsLog as entry}
        <pre class="m-0"><code>{entry}</code></pre>
      {:else}
        <code class="text-fg.subtle">0 items</code>
      {/each}
    </div>
  </div>
</Panel>
