import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

// `npm run build:single` produces one self-contained HTML file (used for the hosted preview).
// Images stay in /images next to it; everything else is inlined.
export default defineConfig(({ mode }) => ({
  plugins: [react(), ...(mode === 'single' ? [viteSingleFile()] : [])],
  base: mode === 'single' ? './' : '/',
  build: mode === 'single' ? { outDir: 'dist-single', copyPublicDir: false } : {},
}));
