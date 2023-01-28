<script lang="ts">
  import Button from './Button.svelte';
  import FormElement from './FormElement.svelte';
  import InputText from './InputText.svelte';

  export let ip: string;
  export let port: string;
  export let password: string;
</script>

<div class="login flex flex-col bg-bg.muted p-1">
  <div class="text-center mb-2">OBS WebSocket Login</div>
  <div class="flex justify-center my-3">
    <img src="/icon.svg" alt="OBS Routines" width="64" height="64" />
  </div>
  <div class="flex flex-col gap-2 p-3">
    <FormElement id="ip" label="IP">
      <InputText bind:value={ip} />
    </FormElement>
    <FormElement id="port" label="Port">
      <InputText bind:value={port} />
    </FormElement>
    <FormElement id="password" label="Password">
      <InputText bind:value={password} type="password" />
    </FormElement>
    <Button on:click>Connect</Button>
    <ul>
      <li>Go to Tools / WebSocket Server Settings</li>
      <li>Enable WebSocket Server</li>
      <li>Copy password from Show Connect Info</li>
    </ul>
  </div>
</div>
