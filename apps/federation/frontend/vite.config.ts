import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'path';
import dns from 'node:dns';

dns.setDefaultResultOrder('ipv4first');

export default defineConfig(({ isSsrBuild }) => ({
	plugins: [sveltekit()],
	build: {
		rollupOptions: {
			output: {
				inlineDynamicImports: isSsrBuild === true
			}
		}
	},
	server: {
		port: 5175,
		allowedHosts: ['login.jeffreycarr.local'],
		proxy: {
			'/api': {
				target: 'http://127.0.0.1:9999',
				changeOrigin: true,
				xfwd: true
			}
		},
		fs: {
			allow: [
				path.resolve(__dirname, '../../../packages/frontend-common'),
			],
		}
	}
}));
