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
        },
      },
    },
  },
});
