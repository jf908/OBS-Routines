<script>
  import { loadRoutines } from '$lib/routines';
  import { loadLogin, fontSize } from '$lib/store';
  import { onMount } from 'svelte';
  import 'uno.css';
  import '../app.css';

  onMount(() => {
    loadLogin();
    loadRoutines();
  });
</script>

<main style="font-size: {$fontSize}px">
  <slot />
</main>
