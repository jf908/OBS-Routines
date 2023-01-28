<script lang="ts">
  import { obsEventNames } from '$lib/obs';
  import InputText from './InputText.svelte';

  export let value: string;
</script>

<InputText bind:value suggestions={obsEventNames} />
