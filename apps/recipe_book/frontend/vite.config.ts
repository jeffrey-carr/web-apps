import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		allowedHosts: ['recipe.jeffreycarr.local'],
		proxy: {
			'/api': 'http://localhost:8080'
		}
	}
});
