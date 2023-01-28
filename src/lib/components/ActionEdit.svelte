<script lang="ts" context="module">
  let isOpen = writable<Record<string, boolean>>({});
</script>

<script lang="ts">
  import type { Action, ActionStatus, WithId } from '$lib/actions';
  import {
    obsActions,
    obsEventTypes,
    obsTypes,
    type ObsJsonTypes,
  } from '$lib/obs';
  import { formatMs } from '$lib/time';
  import type { OBSEventTypes } from 'obs-websocket-js';
  import { createEventDispatcher } from 'svelte';
  import { writable } from 'svelte/store';
  import { slide } from 'svelte/transition';
  import Button from './Button.svelte';
  import Checkbox from './Checkbox.svelte';
  import EventInput from './EventInput.svelte';
  import FormElement from './FormElement.svelte';
  import GenericInput from './GenericInput.svelte';
  import InputText from './InputText.svelte';
  import Menu from './Menu.svelte';
  import MenuButton from './MenuButton.svelte';
  import NumberInput from './NumberInput.svelte';
  import Panel from './Panel.svelte';
  import SceneInput from './SceneInput.svelte';

  export let index: number;
  export let action: Action & WithId;
  export let status: ActionStatus;

  let obsAction: string = action.type === 'obs' ? action.call : '';

  $: onActionChange(obsAction);

  function onActionChange(value: string) {
    if (value && action.type === 'obs' && action.call !== value) {
      action = {
        ...action,
        call: value,
        args: generateDefaultArgs(value),
      };
    }
  }

  function defaultValue(e: ObsJsonTypes): any {
    switch (e) {
      case 'string':
        return '';
      case 'number':
        return 0;
      case 'boolean':
        return false;
      case 'never':
        return undefined;
      default:
        return null;
    }
  }

  function generateDefaultArgs(e: string) {
    const k = Object.keys(obsTypes);
    if (e in obsTypes) {
      const types = obsTypes[e as keyof typeof obsTypes];
      return Object.fromEntries(
        Object.entries(types).map(([k, v]) => [k, defaultValue(v)])
      );
    }
  }

  function getActionName(action: Action) {
    switch (action.type) {
      case 'obs':
        return action.call || 'OBS Action';
      case 'wait':
        return `Wait for ${formatMs(action.ms)}`;
      case 'event':
        return `Wait for ${action.event}`;
    }
  }

  const dispatch = createEventDispatcher();

  $: open =
    action.id === 'id:dnd-shadow-placeholder-0000' ? false : $isOpen[action.id];
</script>

<Panel
  class="bg-bg.muted rounded b-1 b-solid b-border.default {$$props.class}"
  headerClass="rounded"
  {open}
  on:toggle={({ detail }) => ($isOpen[action.id] = detail)}
>
  <svelte:fragment slot="header">
    <div
      class="mr-1"
      class:i-ph-hourglass={status === 'waiting'}
      class:i-ph-spinner={status === 'running'}
      class:animate-spin={status === 'running'}
      class:i-ph-pause={status === 'paused'}
      class:i-ph-prohibit={status === 'cancelled'}
      class:i-ph-warning-octagon={status === 'error'}
      class:i-ph-check={status === 'success'}
    />
    {index + 1}:
    {getActionName(action)}
    <div class="ml-auto" />
    <MenuButton class="!b-none">
      <div class="i-ph-dots-three-bold" />
      <Menu
        class="absolute right-0 z-10 w-30 py-1"
        slot="menu"
        content={[
          [
            {
              name: 'Run from here',
              callback: () => {
                dispatch('run');
              },
            },
          ],
          [
            {
              name: 'Duplicate',
              callback: () => {
                dispatch('duplicate');
              },
            },
          ],
          [
            {
              name: 'Delete',
              callback: () => {
                dispatch('remove');
              },
            },
          ],
        ]}
      />
    </MenuButton>
    <div
      class="i-ph-dots-six cursor-grab"
      on:mousedown|preventDefault={(e) => dispatch('startDrag')}
      on:touchstart|preventDefault={(e) => dispatch('startDrag')}
      on:click|preventDefault|stopPropagation
      on:mouseup={(e) => dispatch('endDrag')}
    />
  </svelte:fragment>
  <div class="p-3 flex flex-col gap-1">
    <!-- transition:slide={{ duration: 100 }} -->
    {#if action.type === 'obs'}
      <FormElement id="action" label="Action">
        <InputText bind:value={obsAction} suggestions={obsActions} />
      </FormElement>
      {#if action.call in obsTypes && typeof obsTypes[action.call] === 'object'}
        {#each Object.entries(obsTypes[action.call]) as [k, v]}
          <FormElement id={k} label={v === 'boolean' ? '' : k}>
            {#if typeof v === 'string' && ['string', 'number', 'boolean'].includes(v)}
              {#if k === 'sceneName'}
                <SceneInput bind:value={action.args[k]} />
                <!-- {:else if k === 'sceneItemId' && 'sceneName' in action.args}
                <SceneItemInput
                  bind:value={action.args[k]}
                  scene={action.args.sceneName}
                /> -->
              {:else}
                <GenericInput
                  type={v}
                  name={v === 'boolean' ? k : undefined}
                  bind:value={action.args[k]}
                />
              {/if}
            {/if}
          </FormElement>
        {/each}
      {/if}
      <!-- <SceneInput value={''} /> -->
      <FormElement id="test">
        <Button on:click={() => dispatch('test')}>Test</Button>
      </FormElement>
    {:else if action.type === 'wait'}
      <FormElement id="wait-duration" label="Wait for">
        <NumberInput
          bind:value={action.ms}
          format={formatMs}
          multiplier={1000}
          step={1000}
          min={0}
        />
      </FormElement>
    {:else}
      <FormElement id="wait-event" label="Wait for">
        <EventInput bind:value={action.event} />
      </FormElement>
    {/if}
  </div>
</Panel>
