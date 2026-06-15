import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path';
import { defineConfig } from 'vite';
import dns from 'node:dns';

dns.setDefaultResultOrder('ipv4first');

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		allowedHosts: ['games.jeffreycarr.local'],
		proxy: {
			'/api': {
				target: 'http://127.0.0.1:8081',
				changeOrigin: true,
				xfwd: true
			}
		},
		fs: {
			allow: [
				path.resolve(__dirname, '../../../packages/frontend-common'),
			]
		}
	}
});
