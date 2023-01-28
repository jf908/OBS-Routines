<script lang="ts">
  export let id: string;
  export let label: string = '';
</script>

<div class="flex items-baseline">
  <label class="w-1/3 text-right pr-2" for={id}>{label}</label>
  <div class="w-2/3">
    <slot {id} />
  </div>
</div>
