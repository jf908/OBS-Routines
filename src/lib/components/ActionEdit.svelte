<script lang="ts" context="module">
  let isOpen = writable<Record<string, boolean>>({});
</script>

<script lang="ts">
  import type { Action, ActionState, WithId } from '$lib/actions';
  import { getDefaultJsonValue, obsActions, obsTypes } from '$lib/obs';
  import { formatMs, formatTime } from '$lib/time';
  import { createEventDispatcher } from 'svelte';
  import { writable } from 'svelte/store';
  import { slide } from 'svelte/transition';
  import Button from './Button.svelte';
  import EventInput from './EventInput.svelte';
  import FormElement from './FormElement.svelte';
  import GenericInput from './GenericInput.svelte';
  import InputText from './InputText.svelte';
  import Menu from './Menu.svelte';
  import MenuButton from './MenuButton.svelte';
  import NumberInput from './NumberInput.svelte';
  import Panel from './Panel.svelte';
  import SceneInput from './SceneInput.svelte';
  import Tooltip from './Tooltip.svelte';
  import { capitalize } from '$lib/util';
  import { createTooltip } from '$lib/tooltip';
  import ActionName from './ActionName.svelte';
  import TimeInput from './TimeInput.svelte';

  const [tooltipRef, tooltipContent] = createTooltip();
  let showTooltip: boolean = false;

  export let index: number;
  export let action: Action & WithId;
  export let state: ActionState;

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

  function generateDefaultArgs(e: string) {
    const k = Object.keys(obsTypes);
    if (e in obsTypes) {
      const types = obsTypes[e as keyof typeof obsTypes];
      return Object.fromEntries(
        Object.entries(types).map(([k, v]) => [k, getDefaultJsonValue(v)])
      );
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
      class:i-ph-hourglass={state.status === 'waiting'}
      class:i-ph-spinner={state.status === 'running'}
      class:animate-spin={state.status === 'running'}
      class:i-ph-pause={state.status === 'paused'}
      class:i-ph-prohibit={state.status === 'cancelled'}
      class:i-ph-warning-octagon={state.status === 'error'}
      class:i-ph-check={state.status === 'success'}
      on:mouseenter={() => (showTooltip = true)}
      on:mouseleave={() => (showTooltip = false)}
      use:tooltipRef
    />
    {index + 1}:
    <ActionName {action} {state} />
    <div class="ml-auto" />
    <MenuButton class="!b-none flex items-center mr-1">
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
  <div
    class="p-3 flex flex-col gap-1"
    transition:slide|local={{ duration: 100 }}
  >
    {#if action.type === 'obs'}
      <FormElement id="action" label="Action">
        <InputText bind:value={obsAction} suggestions={obsActions} />
      </FormElement>
      {#if action.call in obsTypes && typeof obsTypes[action.call] === 'object'}
        {#each Object.entries(obsTypes[action.call]) as [k, v]}
          <FormElement id={k} label={v === 'boolean' ? '' : k}>
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
          </FormElement>
        {/each}
      {/if}
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
    {:else if action.type === 'wait-until'}
      <FormElement id="wait-time" label="Wait until">
        <TimeInput bind:value={action.time} />
        <div>{formatTime(action.time, true)}</div>
      </FormElement>
    {:else}
      <FormElement id="wait-event" label="Wait for">
        <EventInput bind:value={action.event} />
      </FormElement>
    {/if}
  </div>
</Panel>

<Tooltip {tooltipContent} {showTooltip}>{capitalize(state.status)}</Tooltip>
