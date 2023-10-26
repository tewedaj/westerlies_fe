import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        clientsClaim: true,
        skipWaiting: true
      },
      devOptions: {
        enabled: true
      },
      manifest: {
        name: 'Westerlies',
        short_name: 'Westerlies',
        theme_color: '#ffffff',
        icons: [
          {
            src: './src/assets/logo.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: './src/assets/logo.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})