<script>
  import { loadRoutines } from '$lib/routines';
  import { loadLogin } from '$lib/store';
  import { onMount } from 'svelte';
  import 'uno.css';
  import '../app.css';

  onMount(() => {
    loadLogin();
    loadRoutines();
  });
</script>

<main>
  <slot />
</main>
