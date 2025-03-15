import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  assetsInclude: ["**/*.srt"],
  build: {
    rollupOptions: {
      output: {
        assetFileNames: "assets/[name].[ext]", // Ensures assets are in `/assets/`
      },
    },
  },
  define: {
    'process.env': {},
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});

