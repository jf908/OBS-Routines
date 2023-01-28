import { fs } from '@tauri-apps/api';
import {
  writeTextFile,
  BaseDirectory,
  createDir,
  exists,
} from '@tauri-apps/api/fs';
import { writable } from 'svelte/store';
import { v4 as uuid } from 'uuid';
import type { Routine, RoutineWithIds, WithId } from './actions';
import { download } from './file';

let loaded = false;

export const routines = writable([] as (RoutineWithIds & WithId)[]);
const fileName = 'routines.json';

routines.subscribe(async (value) => {
  if (!loaded) return;
  if (!(await exists('', { dir: BaseDirectory.AppData }))) {
    await createDir('', { dir: BaseDirectory.AppData });
  }
  writeTextFile(fileName, JSON.stringify(removeIds(value)), {
    dir: BaseDirectory.AppConfig,
  });
});

export async function loadRoutines() {
  try {
    const contents = await fs.readTextFile(fileName, {
      dir: BaseDirectory.AppData,
    });
    routines.set(addIds(JSON.parse(contents)));
  } finally {
    loaded = true;
  }
}

function addIds(routines: Routine[]): (RoutineWithIds & WithId)[] {
  return routines.map((r) => {
    return {
      ...r,
      id: uuid(),
      actions: r.actions.map((a) => {
        return { ...a, id: uuid() };
      }),
    };
  });
}

function removeIds(routines: (RoutineWithIds & WithId)[]): Routine[] {
  return routines.map((r) => {
    const { id, ...rest } = r;
    return {
      ...rest,
      actions: rest.actions.map((a) => {
        const { id, ...restAction } = a;
        return restAction;
      }),
    };
  });
}

export function exportRoutine(routine: RoutineWithIds & WithId) {
  download(
    JSON.stringify(removeIds([routine])[0], undefined, 2),
    'routine.json',
    'application/json'
  );
}

function selectFile(): Promise<File> {
  const contentType = 'application/json';
  const multiple = false;

  return new Promise((resolve, rej) => {
    let input = document.createElement('input');
    input.type = 'file';
    input.multiple = multiple;
    input.accept = contentType;

    input.onchange = () => {
      if (input.files) {
        let files = Array.from(input.files);
        resolve(files[0]);
      } else {
        rej();
      }
    };

    input.click();
  });
}

export function importRoutine(): Promise<RoutineWithIds & WithId> {
  return new Promise(async (res, rej) => {
    const file = await selectFile();
    const reader = new FileReader();
    reader.onload = function (e) {
      const contents = e.target?.result;
      if (typeof contents === 'string') {
        res(addIds([JSON.parse(contents) as Routine])[0]);
      }
    };
    reader.readAsText(file);
  });
}
