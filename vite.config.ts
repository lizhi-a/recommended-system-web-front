import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
		alias: [
			{
				find: '@',
				replacement: path.resolve(__dirname, 'src')
			}
		]
	},
  server: {
    port: 10001,
    proxy: {
      '/api': {
				target: 'http://192.168.15.105:10000',
				changeOrigin: true
			}
    }
  },
})
