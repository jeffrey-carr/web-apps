import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
    resolve: {
    alias: {
      '@jeffrey-carr/frontend-common/components': path.resolve(__dirname, "../../../packages/frontend-common/src/components")
    }
  },
  server: {
    port: 5174,
  },
  css: {
    modules: {
      // This will transform kebab-case class names to camelCase in JavaScript
      localsConvention: 'camelCaseOnly',
      // This generates scoped class names for better isolation
      generateScopedName: '[name]__[local]___[hash:base64:5]'
    }
  }
});