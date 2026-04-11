import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import dns from 'node:dns';

dns.setDefaultResultOrder('ipv4first');

export default defineConfig({
  plugins: [sveltekit()],
  server: {
    allowedHosts: ['recipe.jeffreycarr.local'],
    proxy: {
      '/api': 'http://127.0.0.1:8080',
    },
  },
});
