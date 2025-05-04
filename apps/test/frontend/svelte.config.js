import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import sveltePreprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Use both preprocessors - vitePreprocess for standard processing and sveltePreprocess for SCSS
  preprocess: [
    vitePreprocess(),
    sveltePreprocess({
      scss: {
        // Optional: if you want global imports
        // prependData: '@import "src/styles/variables.scss";'
      }
    })
  ],
  kit: {
    // adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
    // If your environment is not supported, or you settled on a specific environment, switch out the adapter.
    // See https://svelte.dev/docs/kit/adapters for more information about adapters.
    adapter: adapter()
  },
};

export default config;