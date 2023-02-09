<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import Login from '$lib/components/Login.svelte';
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
  import Menu from '$lib/components/Menu.svelte';
  import MenuButton from '$lib/components/MenuButton.svelte';
  import Settings from '$lib/components/Settings.svelte';
  import { capitalize } from '$lib/util';

  let connected = false;

  let obs: OBSWebSocket;
  let executor: ReturnType<typeof createActionExecutor>;

  let currentExecutor: RoutineExecutor = {
    ...writable({ index: 0, status: 'waiting', actions: [] }),
    cancel() {},
    restart() {},
  };
  let currentRoutine: Readable<(Routine & WithId) | null> = writable(null);

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
    let status = $currentExecutor.status;

    currentExecutor.cancel();

    // Toggle off if already running
    if (status === 'running' && $currentRoutine?.id === id) return;

    let r = derived(routines, (rs) => rs.find((r) => r.id === id)!);
    createRoutineExecutor(executor, r, currentExecutor, actionIndex);
    currentRoutine = r;
  }

  function removeRoutine(routine: RoutineWithIds & WithId) {
    if ($currentRoutine === routine && $currentExecutor.status === 'running')
      return;
    $routines = $routines.filter((r) => r !== routine);
  }

  async function importR() {
    const routine = await importRoutine();
    $routines = [...$routines, routine];
  }
</script>

<div class="flex flex-col h-100vh overflow-hidden">
  {#if !connected}
    <Login
      bind:ip={$login.ip}
      bind:port={$login.port}
      bind:password={$login.password}
      on:click={connect}
    />
  {:else}
    <div class="w-full bg-bg.muted p-3 flex flex-col">
      <div class="flex gap-1">
        <div class="flex">
          <Button class="!rounded-r-0" on:click={addRoutine}>New Routine</Button
          >
          <MenuButton class="!rounded-l-0 ml--1px flex items-center h-full">
            <div class="i-ph-caret-down" />
            <Menu
              class="absolute z-10 w-30 py-1"
              slot="menu"
              content={[
                [
                  {
                    name: 'Import...',
                    callback: () => {
                      importR();
                    },
                  },
                ],
              ]}
            />
          </MenuButton>
        </div>
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
    <div class="flex-1 overflow-y-auto">
      {#each $routines as routine, i (routine.id)}
        <RoutineEdit
          bind:routine
          {executor}
          on:run={() => playRoutine(routine.id)}
          on:runAction={({ detail }) => playRoutine(routine.id, detail)}
          on:delete={() => removeRoutine(routine)}
          states={$currentRoutine === routine
            ? $currentExecutor?.actions
            : null}
          status={$currentRoutine === routine ? $currentExecutor.status : null}
        />
      {/each}
    </div>
  {/if}
  <div class="mt-auto flex flex-col">
    <Log class="flex flex-col" />
    <Settings />
  </div>
</div>
