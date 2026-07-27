import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import {ViteImageOptimizer} from 'vite-plugin-image-optimizer';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      // Compresses everything in public/images at build time. Quality 72 is
      // visually lossless for photographs and typically saves 50-70%.
      ViteImageOptimizer({
        jpg: {quality: 72},
        jpeg: {quality: 72},
        png: {quality: 72},
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
