import { defineConfig } from 'vite';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],

  build: {
    // 'hidden' emits source maps alongside the bundles but does not add
    // //# sourceMappingURL comments in the JS — maps are available for error
    // monitoring tools (Sentry etc.) without being publicly referenced.
    sourcemap: 'hidden',

    rollupOptions: {
      output: {
        manualChunks(id) {
          // React core — small, stable, always needed
          if (
            id.includes('/node_modules/react/') ||
            id.includes('/node_modules/react-dom/') ||
            id.includes('/node_modules/scheduler/')
          ) {
            return 'vendor';
          }
          // React Router — was previously lumped with vendor under the wrong
          // package name (react-router-dom); the codebase imports from react-router.
          // Split into its own chunk so vendor and router can download in parallel.
          if (
            id.includes('/node_modules/react-router/') ||
            id.includes('/node_modules/react-router-dom/') ||
            id.includes('/node_modules/@remix-run/')
          ) {
            return 'router';
          }
          // pairs-data — the city-pair JSON (pairs.json + zonesV3) is ~380 kB of
          // data that would otherwise sit in the main entry chunk. Splitting it out
          // lets Vite emit a <link rel="modulepreload"> for it, so V8 can
          // stream-compile the chunk in a background thread while the main entry
          // initialises React and the router — reducing the longest main-thread task
          // and therefore Total Blocking Time.
          if (
            id.includes('/data/pairs.json') ||
            id.includes('/data/zonesV3') ||
            id.includes('/data/pairsV3')
          ) {
            return 'pairs-data';
          }
        },
      },
    },
  },
});
