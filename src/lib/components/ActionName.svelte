<script lang="ts">
  import type { Action, ActionState } from '$lib/actions';
  import { formatMs, formatTime, getTimeUntil } from '$lib/time';
  import { onMount } from 'svelte';

  export let action: Action;
  export let state: ActionState;

  let mounted = false;
  let interval: NodeJS.Timer | undefined = undefined;
  let wait = -1;

  $: updateTimer(state);

  function updateTimer(state: ActionState) {
    if (!mounted) return;
    if (
      state.started &&
      state.status === 'running' &&
      (action.type === 'wait' || action.type === 'wait-until')
    ) {
      if (interval === undefined) {
        interval = setInterval(() => {
          if (state.started) {
            if (action.type === 'wait') {
              wait =
                action.ms -
                Math.round(
                  (new Date().getTime() - state.started.getTime()) / 1000
                ) *
                  1000;
            } else if (action.type === 'wait-until') {
              wait =
                getTimeUntil(action.time, state.started) -
                Math.round(
                  (new Date().getTime() - state.started.getTime()) / 1000
                ) *
                  1000;
            }
          }
        }, 1000);
      }
    } else if (interval !== undefined) {
      wait = -1;
      clearInterval(interval);
      interval = undefined;
    }
  }

  function prettifyArgs(action: string, args: any) {
    switch (action) {
      case 'SetSceneName':
        return `from ${args.sceneName} to ${args.newSceneName}`;
      case 'SetCurrentProgramScene':
        return `to ${args.sceneName}`;
      case 'SetCurrentProfile':
        return `to ${args.profileName}`;
    }
    return '';
  }

  onMount(() => {
    mounted = true;
    updateTimer(state);

    return () => {
      clearInterval(interval);
    };
  });
</script>

{#if action.type === 'obs'}
  {action.call || 'OBS Action'}
  {action.args ? prettifyArgs(action.call, action.args) : ''}
{:else if action.type === 'wait'}
  Wait for {wait === -1 ? formatMs(action.ms) : formatMs(wait)}
{:else if action.type === 'wait-until'}
  Wait until {formatTime(action.time)}
  {wait === -1 ? '' : `(in ${formatMs(wait)})`}
{:else}
  Wait for {action.event}
{/if}
