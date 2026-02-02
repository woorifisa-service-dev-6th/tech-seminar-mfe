// draw-app/vite.config.js
import { defineConfig } from 'vite';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  // 경로 문제를 방지하기 위해 서버 주소를 base로 잡습니다.
  base: 'http://localhost:5005/', 
  plugins: [
    federation({
      name: 'remoteDraw',
      filename: 'remoteEntry.js',
      exposes: {
        './draw': './js/draw.js',
      },
      shared: [],
    }),
  ],
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
    // rollupOptions.input을 삭제하면 자동으로 index.html을 찾습니다.
  },
  server: {
    port: 5005,
    cors: true,
  },
  preview: {
    port: 5005,
    strictPort: true,
    headers: {
      "Access-Control-Allow-Origin": "*", // CORS 에러 방지
    }
  }
});