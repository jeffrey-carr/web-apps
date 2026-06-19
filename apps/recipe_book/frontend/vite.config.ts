import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import dns from 'node:dns';

dns.setDefaultResultOrder('ipv4first');

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [sveltekit()],
  build: {
    rollupOptions: {
      output: {
        codeSplitting: isSsrBuild === true ? false : true
      }
    }
  },
  server: {
    allowedHosts: ['recipe.jeffreycarr.local'],
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8080',
        changeOrigin: true,
        xfwd: true,
      },
    },
  },
}));
