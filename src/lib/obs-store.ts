import { writable } from 'svelte/store';

export const obsScenes = writable([] as string[]);
export const obsSceneItems = writable({} as Record<string, string[]>);
