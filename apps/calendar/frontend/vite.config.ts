import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		allowedHosts: ['calendar.jeffreycarr.local'],
		proxy: {
			'/api': 'http://localhost:8081'
		},
		fs: {
			allow: [
				path.resolve(__dirname, '../../../packages/frontend-common'),
			]
		}
	}
});
