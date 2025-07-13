import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		allowedHosts: ['games.jeffreycarr.local'],
		proxy: {
			'/api': 'http://localhost:8080'
		},
		fs: {
			allow: [
				path.resolve(__dirname, '../../../packages/frontend-common'),
			]
		}
	}
});
