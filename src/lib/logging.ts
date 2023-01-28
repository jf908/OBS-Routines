import { writable } from 'svelte/store';

export function createLogger(maxLength: number) {
  const { subscribe, set, update } = writable([] as string[]);

  return {
    subscribe,
    add(item: string) {
      update((previousLog) => {
        if (previousLog.length >= maxLength) {
          previousLog.shift();
        }
        previousLog.push(item);

        return previousLog;
      });
    },
    reset() {
      set([]);
    },
  };
}

export const obsLog = createLogger(200);
