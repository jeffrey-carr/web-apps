// packages/frontend-common/vite.config.js
import { defineConfig } from 'vite';
import { resolve } from 'path';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  plugins: [svelte()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'), // Your actual entry file
      name: 'FrontendCommon',
      fileName: (format) => `frontend-common.${format}.ts`
    },
    rollupOptions: {
      // External dependencies that shouldn't be bundled
      external: ['svelte'], // add your externals
      output: {
        // Global variables to use in UMD build for externalized deps
        globals: {
          svelte: 'svelte'
        }
      }
    }
  }
});