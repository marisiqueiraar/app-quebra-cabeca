import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// PWA instalável em iPhone e Android. O service worker faz o app funcionar
// offline depois da primeira abertura — importante para uma usuária 70+ que
// pode ter internet instável.
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/apple-touch-icon.png', 'icons/favicon.svg'],
      manifest: {
        name: 'Quebra-Cabeças da Vó Lili',
        short_name: 'Vó Lili',
        description:
          'Quebra-cabeças com fotos das nossas viagens, feitos com carinho para a vó.',
        lang: 'pt-BR',
        dir: 'ltr',
        theme_color: '#2e7d32',
        background_color: '#fbf7ef',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          {
            src: 'icons/icon-512-maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        // Guarda em cache o app e as imagens já abertas, para reabrir offline.
        globPatterns: ['**/*.{js,css,html,svg,png,ico,woff2}'],
        cleanupOutdatedCaches: true,
      },
    }),
  ],
})
