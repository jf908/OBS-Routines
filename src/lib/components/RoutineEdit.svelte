<script lang="ts">
  import {
    createAction,
    duplicateAction,
    type Action,
    type ActionStatus,
    type createActionExecutor,
    type Routine,
    type RoutineWithIds,
    type WithId,
  } from '$lib/actions';
  import { createEventDispatcher } from 'svelte';
  import ActionEdit from './ActionEdit.svelte';
  import Button from './Button.svelte';
  import InputText from './InputText.svelte';
  import { dndzone, SOURCES, TRIGGERS } from 'svelte-dnd-action';
  import { flip } from 'svelte/animate';
  import MenuButton from './MenuButton.svelte';
  import Menu from './Menu.svelte';
  import { exportRoutine } from '$lib/routines';

  export let routine: RoutineWithIds & WithId;

  export let executor: ReturnType<typeof createActionExecutor>;

  export let statuses: ActionStatus[] | null = null;

  const dispatch = createEventDispatcher();

  function runAction(action: Action) {
    executor.execute(action);
  }

  function onRemove(action: Action) {
    routine.actions = routine.actions.filter((x) => x !== action);
  }

  function addAction(type: Action['type']) {
    routine.actions = [...routine.actions, createAction(type)];
  }

  // Drag Stuff

  let dragDisabled = true;

  function handleDndConsider(
    e: CustomEvent<DndEvent<RoutineWithIds['actions'][number]>>
  ) {
    const {
      items: newItems,
      info: { source, trigger },
    } = e.detail;
    routine.actions = newItems;
    if (source === SOURCES.KEYBOARD && trigger === TRIGGERS.DRAG_STOPPED) {
      dragDisabled = true;
    }
  }
  function handleDndFinalize(
    e: CustomEvent<DndEvent<RoutineWithIds['actions'][number]>>
  ) {
    const {
      items: newItems,
      info: { source },
    } = e.detail;
    routine.actions = newItems;
    if (source === SOURCES.POINTER) {
      dragDisabled = true;
    }
  }

  function duplicate(index: number) {
    routine.actions = insert(
      routine.actions,
      index + 1,
      duplicateAction(routine.actions[index])
    );
  }

  const insert = <T>(arr: T[], index: number, newItem: T) => [
    // part of the array before the specified index
    ...arr.slice(0, index),
    // inserted item
    newItem,
    // part of the array after the specified index
    ...arr.slice(index),
  ];

  function exportR() {
    exportRoutine(routine);
  }
</script>

<div class="bg-bg.muted p-3 m-3 rounded">
  <div class="flex gap-1 mb-2">
    <Button class="flex items-center" on:click={() => dispatch('run')}>
      <span class="i-ph-play-fill" />
    </Button>
    <InputText bind:value={routine.name} placeholder="Routine Name" />
    <MenuButton>
      <div class="i-ph-dots-three-bold" />
      <Menu
        class="absolute right-0 z-10 w-30 py-1"
        slot="menu"
        content={[
          [
            {
              name: 'Export',
              callback: exportR,
            },
          ],
          [
            {
              name: 'Delete',
              callback: () => dispatch('delete'),
            },
          ],
        ]}
      />
    </MenuButton>
  </div>
  <section
    use:dndzone={{
      items: routine.actions,
      dropTargetStyle: {},
      dragDisabled,
      flipDurationMs: 0,
    }}
    on:consider={handleDndConsider}
    on:finalize={handleDndFinalize}
  >
    {#each routine.actions as action, i (action.id)}
      <div animate:flip={{ duration: 100 }}>
        <ActionEdit
          class="mb-1"
          bind:action
          index={i}
          on:remove={() => onRemove(action)}
          on:test={() => runAction(action)}
          status={statuses?.[i] ?? 'waiting'}
          on:startDrag={() => (dragDisabled = false)}
          on:endDrag={() => (dragDisabled = true)}
          on:run={() => dispatch('runAction', i)}
          on:duplicate={() => duplicate(i)}
        />
      </div>
    {/each}
  </section>
  <div>
    <Button on:click={() => addAction('obs')}>+ OBS Action</Button>
    <Button on:click={() => addAction('wait')}>+ Wait time</Button>
    <Button on:click={() => addAction('event')}>+ Wait for event</Button>
  </div>
</div>
