import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import legacy from '@vitejs/plugin-legacy'



// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
    react(),
    legacy({
      targets: ['defaults', 'Chrome 64', 'not IE 11'],
    }),
  ],
  build: {
    minify: 'terser',
    rollupOptions: {
      output: {
          manualChunks(id: any): string {  
              if (id.includes("node_modules")) {
                  return id
                          .toString()
                          .split("node_modules/")[1]
                          .split("/")[0]
                          .toString();
          }
          }
      }
    }
  },
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
				// target: 'http://192.168.48.68:10000',
				// target: 'http://192.168.48.87:10000',
				changeOrigin: true
			},
      '/minio/': {
        target: 'http://192.168.15.105:9000',
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/minio/, ''),
      }
		}
	},
})
