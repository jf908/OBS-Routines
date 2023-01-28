import type { OBSEventTypes, OBSRequestTypes } from 'obs-websocket-js';
import type OBSWebSocket from 'obs-websocket-js';
import { get, writable, type Readable, type Writable } from 'svelte/store';
import { v4 as uuid } from 'uuid';

export type WithId = {
  id: string;
};

export type Routine = {
  name: string;
  actions: Action[];
};

export type RoutineWithIds = Omit<Routine, 'actions'> & {
  actions: (Action & WithId)[];
};

export type Action = OBSAction | Wait | WaitForEvent;

export type OBSAction = {
  type: 'obs';
  call: string;
  args: any;
};

export type Wait = {
  type: 'wait';
  ms: number;
};

export type WaitForEvent = {
  type: 'event';
  event: string;
};

export function createRoutine(): RoutineWithIds & WithId {
  return {
    id: uuid(),
    name: '',
    actions: [],
  };
}

export function duplicateAction(action: Action & WithId) {
  return {
    ...JSON.parse(JSON.stringify(action)),
    id: uuid(),
  };
}

export function createAction(type: Action['type']): Action & WithId {
  switch (type) {
    case 'obs':
      return {
        id: uuid(),
        type,
        call: '',
        args: null,
      };
    case 'event':
      return {
        id: uuid(),
        type,
        event: '',
      };
    case 'wait':
      return {
        id: uuid(),
        type,
        ms: 1000,
      };
  }
}

type Cancellable = {
  cancel: () => void;
};

type Pausable = {
  pause: () => void;
  resume: () => void;
};

type CancellablePromise<T> = Promise<T> & Cancellable;

type PausablePromise<T> = Promise<T> & Pausable;

class CancelledError extends Error {
  constructor() {
    super('Cancelled');
    Object.setPrototypeOf(this, CancelledError.prototype);
  }
}

function delay(ms: number): CancellablePromise<void> {
  let rejectCb: (err: Error) => void;
  let timeout: NodeJS.Timeout;
  const p: Partial<CancellablePromise<void>> = new Promise((res, rej) => {
    rejectCb = rej;
    timeout = setTimeout(() => {
      res();
    }, ms);
  });

  p.cancel = () => {
    clearTimeout(timeout);
    rejectCb(new CancelledError());
  };

  return p as CancellablePromise<void>;
}

export type ActionStatus =
  | 'waiting'
  | 'running'
  | 'paused'
  | 'success'
  | 'cancelled'
  | 'error';

// Rules about executing
// New actions can be added onto the end
// When an action is waiting, it can be edited or removed
// When an action is any other status, it cannot be edited or removed
// When an action is waiting, it's position can be changed as long as it is moved to a location after
//  the last non-waiting action

export type RoutineExecutor = Writable<ExecutorState> &
  Cancellable & { restart: () => void };
type ExecutorState = {
  index: number;
  status: ActionStatus;
  actions: { status: ActionStatus }[];
};
export function createRoutineExecutor(
  executor: ActionExecutor,
  routineReadable: Readable<Routine>,
  state: RoutineExecutor,
  startingIndex?: number
) {
  let promise: Promise<void> | CancellablePromise<void> | undefined;

  function init(index: number) {
    state.set({
      index,
      status: 'running' as ActionStatus,
      actions: Array.from({ length: index }).map(() => ({
        status: 'waiting',
      })),
    });
    run(index, get(routineReadable));
  }

  function nextAction() {
    run(get(state).index + 1, get(routineReadable));
  }

  function run(indexToRun: number, routine: Routine) {
    if (indexToRun >= routine.actions.length) {
      state.update((state) => ({ ...state, status: 'success' }));
      return;
    }

    state.update((state) => ({
      ...state,
      index: indexToRun,
      status: 'running',
      actions: [...state.actions, { status: 'running' }],
    }));
    promise = executor.execute(routine.actions[indexToRun]);

    promise
      .then(() => {
        if (get(state).status !== 'running') return;
        state.update((state) => {
          state.actions[state.actions.length - 1].status = 'success';
          return state;
        });

        nextAction();
      })
      .catch((err) => {
        if (get(state).status !== 'running') return;
        state.update((state) => {
          if (err instanceof CancelledError) {
            state.actions[state.actions.length - 1].status = 'cancelled';
          } else {
            state.actions[state.actions.length - 1].status = 'error';
          }
          return state;
        });

        nextAction();
      });
  }

  init(startingIndex ?? 0);

  state.cancel = () => {
    if (get(state).status !== 'running') return;
    if (promise && 'cancel' in promise) {
      promise.cancel();
    }
    state.update((state) => {
      state.actions[state.actions.length - 1].status = 'cancelled';
      return { ...state, status: 'cancelled' };
    });
  };

  state.restart = () => {
    if (get(state).status === 'running') return;
    init(0);
  };
}

export type ActionExecutor = ReturnType<typeof createActionExecutor>;
export function createActionExecutor(
  obs: OBSWebSocket,
  logger: (item: string) => void
) {
  return {
    execute(action: Action): Promise<void> | CancellablePromise<void> {
      switch (action.type) {
        case 'obs': {
          return obs
            .call(action.call as keyof OBSRequestTypes, action.args)
            .then((results) => {
              logger(
                `[${new Date().toISOString()}] ${JSON.stringify(
                  results,
                  undefined,
                  2
                )}`
              );
              // return results;
            });
        }
        case 'wait': {
          return delay(action.ms);
        }
        case 'event': {
          let listener: (() => void) | undefined;
          let rejectCb: (err: Error) => void;

          const p: Partial<CancellablePromise<void>> = new Promise(
            (res, rej) => {
              rejectCb = rej;
              listener = () => {
                res();
              };
              obs.once(action.event as keyof OBSEventTypes, listener);
            }
          );

          p.cancel = () => {
            if (listener) {
              obs.off(action.event as keyof OBSEventTypes, listener);
              listener = undefined;
            }
            rejectCb(new CancelledError());
          };

          return p as CancellablePromise<void>;
        }
      }
    },
  };
}