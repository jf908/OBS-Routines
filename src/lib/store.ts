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

export const fontSize = writable(12);

export const settings =
  writable <
  login.subscribe((value) => {
    if (!loaded) return;
    localStorage.setItem('login', JSON.stringify(value));
  });

fontSize.subscribe((value) => {
  if (!loaded) return;
  localStorage.setItem('fontSize', value.toString());
});

export function loadLogin() {
  try {
    const contents = localStorage.getItem('login');
    if (contents) {
      login.set(JSON.parse(contents));
    }
  } catch (err) {
    console.error(err);
  }

  try {
    const contents = localStorage.getItem('fontSize');
    if (contents) {
      let num = parseInt(contents);
      // Clamp
      num = num > 128 || num < 8 ? 12 : num;
      fontSize.set(num);
    }
  } catch (err) {
    console.error(err);
  }

  loaded = true;
}
