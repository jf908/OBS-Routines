<script lang="ts">
  import { obsScenes } from '$lib/obs-store';
  import InputText from './InputText.svelte';

  export let value: string;
</script>

<InputText
  bind:value
  suggestions={$obsScenes}
  rightIcon={$obsScenes.includes(value) ? undefined : 'i-ph-warning'}
/>
