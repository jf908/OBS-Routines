import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import Unocss from 'unocss/vite';
import { presetUno } from 'unocss';
import presetIcons from '@unocss/preset-icons';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    sveltekit(),
    Unocss({
      theme: {
        colors: {
          fg: 'rgb(var(--color-fg))',
          'fg.muted': 'rgb(var(--color-fg-muted))',
          'fg.subtle': 'rgb(var(--color-fg-subtle))',
          'fg.on.accent': 'rgb(var(--color-fg-on-accent))',
          bg: 'rgb(var(--color-bg))',
          'bg.hover': 'rgb(var(--color-bg-hover))',
          'bg.muted': 'rgb(var(--color-bg-muted))',
          'bg.muted.hover': 'rgb(var(--color-bg-muted-hover))',
          'bg.subtle': 'rgb(var(--color-bg-subtle))',
          accent: 'rgb(var(--color-accent))',
          'border.default': 'rgb(var(--color-border-default))',
          'border.dark': 'rgb(var(--color-border-dark))',
          'border.focus': 'rgb(var(--color-border-focus))',
        },
      },
      presets: [
        presetUno(),
        presetIcons({
          // prefix: 'i-',
          extraProperties: {
            display: 'inline-block',
            'vertical-align': 'middle',
          },
        }),
      ],
    }),
  ],

  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  // prevent vite from obscuring rust errors
  clearScreen: false,
  // tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
  },
  // to make use of `TAURI_DEBUG` and other env variables
  // https://tauri.studio/v1/api/config#buildconfig.beforedevcommand
  envPrefix: ['VITE_', 'TAURI_'],
  build: {
    // Tauri supports es2021
    target: process.env.TAURI_PLATFORM == 'windows' ? 'chrome105' : 'safari13',
    // don't minify for debug builds
    minify: !process.env.TAURI_DEBUG ? 'esbuild' : false,
    // produce sourcemaps for debug builds
    sourcemap: !!process.env.TAURI_DEBUG,
  },
});
