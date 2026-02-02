import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    federation({
      name: 'host_app',
      remotes: {
        remoteVanilla: 'http://localhost:5002/assets/remoteEntry.js',
      },
      shared: {
        react: { 
          singleton: true, 
          requiredVersion: false, 
          strictVersion: false, 
          eager: true,  // Host가 먼저 로드
          shareScope: 'default',
        },
        'react-dom': { 
          singleton: true, 
          requiredVersion: false, 
          strictVersion: false, 
          eager: true,
          shareScope: 'default',
        },
      },
    })    
  ],
})
