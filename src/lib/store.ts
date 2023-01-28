import { writable } from 'svelte/store';

type LoginDetails = {
  ip: string;
  port: string;
  password: string;
};

let loaded = false;
export const login = writable<LoginDetails>({
  ip: '127.0.0.1',
  port: '4455',
  password: '',
});

login.subscribe((value) => {
  if (!loaded) return;
  localStorage.setItem('login', JSON.stringify(value));
});

export function loadLogin() {
  try {
    const contents = localStorage.getItem('login');
    if (contents) {
      login.set(JSON.parse(contents));
    }
  } finally {
    loaded = true;
  }
}
