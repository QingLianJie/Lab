import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA as pwa } from 'vite-plugin-pwa'
import jotaiDebugLabel from 'jotai/babel/plugin-debug-label'
import jotaiReactRefresh from 'jotai/babel/plugin-react-refresh'

// https://vitejs.dev/config/
export default defineConfig({
  server: { port: 3000 },
  plugins: [
    react({ babel: { plugins: [jotaiDebugLabel, jotaiReactRefresh] } }),
    pwa(),
  ],
})
