import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Use the new JSX transform (React 17+)
      // This allows JSX without importing React
      jsxRuntime: 'automatic',
      // Enable Fast Refresh for better development experience
      fastRefresh: true,
    }),
  ],
  // Ensure proper resolve settings
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
