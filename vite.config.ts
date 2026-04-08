import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Custom Prerender Plugin to inject static Hero HTML
const prerenderPlugin = () => {
  return {
    name: 'prerender-plugin',
    transformIndexHtml(html: string) {
      const heroFallback = `
        <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background: linear-gradient(to bottom right, #000, rgba(23, 37, 84, 0.4), #000); color: white; font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; text-align: center; overflow: hidden; position: relative;">
          <div style="position: relative; z-index: 10;">
            <h1 style="font-size: clamp(2.5rem, 8vw, 4.5rem); font-weight: 800; background: linear-gradient(to right, #22d3ee, #3b82f6, #9333ea); -webkit-background-clip: text; color: transparent; margin: 0; padding: 1rem 2rem; border: 1px solid rgba(34, 211, 238, 0.3); border-radius: 9999px; background-color: rgba(0, 0, 0, 0.6); backdrop-filter: blur(12px);">
              Victor Leça
            </h1>
          </div>
        </div>
      `;
      return html.replace('<div id="root"></div>', `<div id="root">${heroFallback}</div>`);
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    prerenderPlugin(),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'react-vendor';
          }
          if (id.includes('node_modules/motion') || id.includes('node_modules/framer-motion')) {
            return 'motion-vendor';
          }
          if (id.includes('node_modules/lucide-react')) {
            return 'lucide-vendor';
          }
        }
      }
    }
  }
})