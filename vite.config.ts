import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import react from "@vitejs/plugin-react";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import glsl from "vite-plugin-glsl";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  // Set base path for GitHub Pages deployment under /DualSparkStudio/
  base: '/',
  plugins: [
    react(),
    runtimeErrorOverlay(),
    glsl(), // Add GLSL shader support
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
    },
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true,
    // Performance optimizations
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor libraries
          'react-vendor': ['react', 'react-dom'],
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
          'ui-vendor': ['@radix-ui/react-accordion', '@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
          'animation-vendor': ['framer-motion', 'gsap'],
          'utils-vendor': ['clsx', 'tailwind-merge', 'zod'],
        },
      },
    },
    // Enable minification and compression
    minify: 'esbuild', // Use esbuild instead of terser for better compatibility
    esbuild: {
      drop: ['console', 'debugger'],
    },
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000,
  },
  // Add support for large models and audio files
  assetsInclude: ["**/*.gltf", "**/*.glb", "**/*.mp3", "**/*.ogg", "**/*.wav"],
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'three'],
  },
});
