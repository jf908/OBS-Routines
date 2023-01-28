<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import Login from '$lib/components/Login.svelte';
  import { obsActions } from '$lib/obs';
  import { obsScenes } from '$lib/obs-store';
  import OBSWebSocket from 'obs-websocket-js';
  import RoutineEdit from '$lib/components/RoutineEdit.svelte';
  import {
    createActionExecutor,
    createRoutine,
    createRoutineExecutor,
    type Routine,
    type RoutineExecutor,
    type RoutineWithIds,
    type WithId,
  } from '$lib/actions';
  import Log from '$lib/components/Log.svelte';
  import { obsLog } from '$lib/logging';
  import { login } from '$lib/store';
  import { derived, writable, type Readable } from 'svelte/store';
  import { importRoutine, routines } from '$lib/routines';

  let connected = false;

  let obs: OBSWebSocket;
  let executor: ReturnType<typeof createActionExecutor>;

  let currentExecutor: RoutineExecutor = {
    ...writable({ index: 0, status: 'waiting', actions: [] }),
    cancel() {},
    restart() {},
  };
  let currentRoutine: Readable<Routine | null> = writable(null);

  async function connect() {
    obs = new OBSWebSocket();

    const address = `${
      $login.ip.startsWith('ws') ? $login.ip : `ws://${$login.ip}`
    }:${$login.port}`;

    await obs.connect(address, $login.password);
    connected = true;

    executor = createActionExecutor(obs, obsLog.add);

    obs.call('GetSceneList').then((scenes) => {
      $obsScenes = scenes.scenes.map((x) => x.sceneName as string);
    });

    // obs.call('GetSceneItemList').then((source) => {
    //   $obsSources = source.sceneItems;
    // });
    obs.on('SceneCreated', (scene) => {
      $obsScenes = [...$obsScenes, scene.sceneName];
    });
    obs.on('SceneRemoved', (scene) => {
      $obsScenes = $obsScenes.filter((x) => x !== scene.sceneName);
    });

    obs.on('ConnectionClosed', () => {
      connected = false;
    });
  }

  function disconnect() {
    obs.disconnect();
  }

  function addRoutine() {
    $routines = [...$routines, createRoutine()];
  }

  function playRoutine(id: string, actionIndex?: number) {
    currentExecutor.cancel();
    let r = derived(routines, (rs) => rs.find((r) => r.id === id)!);
    createRoutineExecutor(executor, r, currentExecutor, actionIndex);
    currentRoutine = r;
  }

  function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function removeRoutine(routine: RoutineWithIds) {
    if ($currentRoutine === routine && $currentExecutor.status === 'running')
      return;
    $routines = $routines.filter((r) => r !== routine);
  }

  let navHeight: number;

  async function importR() {
    const routine = await importRoutine();
    $routines = [...$routines, routine];
  }
</script>

{#if !connected}
  <Login
    bind:ip={$login.ip}
    bind:port={$login.port}
    bind:password={$login.password}
    on:click={connect}
  />
{:else}
  <div
    class="fixed top-0 w-full bg-bg.muted p-3 flex flex-col"
    bind:clientHeight={navHeight}
  >
    <div class="flex gap-1">
      <Button on:click={addRoutine}>+ Routine</Button>
      <Button on:click={importR}>Import Routine</Button>
      <Button class="ml-auto" on:click={disconnect}>Disconnect</Button>
    </div>
    <hr class="w-full border-fg.subtle/20" />
    <div class="flex gap-1">
      {#if $currentExecutor.status !== 'waiting'}
        {#if $currentExecutor.status === 'running'}
          <Button
            class="flex items-center"
            on:click={() => currentExecutor.cancel()}
          >
            <span class="i-ph-prohibit" />
          </Button>
        {:else}
          <Button
            class="flex items-center"
            on:click={() => currentExecutor.restart()}
          >
            <span class="i-ph-arrow-clockwise" />
          </Button>
        {/if}
        {capitalize($currentExecutor.status)}
        {$currentRoutine?.name || 'Routine Name'} | Now: {$currentExecutor.index +
          1}
      {:else}
        <div>No active routines</div>
      {/if}
    </div>
  </div>
  <div style="height: {navHeight}px" />

  {#each $routines as routine, i (routine.id)}
    <RoutineEdit
      bind:routine
      {executor}
      on:run={() => playRoutine(routine.id)}
      on:runAction={({ detail }) => playRoutine(routine.id, detail)}
      on:delete={() => removeRoutine(routine)}
      statuses={$currentRoutine === routine
        ? $currentExecutor?.actions.map((a) => a.status)
        : null}
    />
  {/each}
  <div class="h-6" />

  <Log class="fixed z-1 bottom-0 w-full" />
{/if}

<!-- <div class="rounded bg-bg.muted p-3 m-3">
  <span>ASODJH</span>
  <div>
    <InputText bind:value suggestions={obsActions} />
  </div>
  {JSON.stringify($obsSources)}
</div> -->
