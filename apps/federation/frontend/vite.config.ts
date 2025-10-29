import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		port: 5175,
		allowedHosts: ['login.jeffreycarr.local'],
		proxy: {
			'/api': 'http://localhost:9999'
		},
		fs: {
			allow: [
				path.resolve(__dirname, '../../../packages/frontend-common'),
			],
		}
	}
});
