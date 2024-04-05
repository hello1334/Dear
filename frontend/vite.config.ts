import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import svgr from '@svgr/rollup';
import tsconfigPaths from 'vite-tsconfig-paths';

const host = process.env.HOST;

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    hmr: {
      host: host,
    },
  },
  plugins: [
    react(),
    tsconfigPaths(),
    svgr(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: 'Dear',
        short_name: 'Dear',
        description: 'letter Dear',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/dear.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/dear.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/dear.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),
  ],
  assetsInclude: ['**/*.jpg', '**/*.mid'],
});
