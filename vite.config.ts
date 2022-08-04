import { defineConfig } from 'vite'
import laravel from 'vite-plugin-laravel'
import vue from '@vitejs/plugin-vue'
import inertia from './resources/scripts/vite/inertia-layout'

export default defineConfig({
	plugins: [
		inertia(),
		vue(),
		laravel(),
	],
	resolve: {
		alias: {
			ziggy: '/vendor/tightenco/ziggy/src/js',
			'ziggy-vue': '/vendor/tightenco/ziggy/src/js/vue',
		},
	},
})
