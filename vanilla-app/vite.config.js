import { defineConfig } from 'vite'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    federation({
      name: 'vanilla_app',
      filename: 'remoteEntry.js',
      exposes: {
        './bootstrap': './js/bootstrap.js',
      },
      remotes: {
        remoteWidget: 'http://localhost:5004/assets/remoteEntry.js',
        remoteDraw: 'http://localhost:5005/assets/remoteEntry.js', // 그림판 추가
      },
      shared: {},
    }),
  ],
  server: {
    port: 5002,
    cors: true,
  },
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: true,
    modulePreload: false,
  },
})
