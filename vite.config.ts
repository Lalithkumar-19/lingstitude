import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: "/", // Change this if deploying to a subdirectory
  server: {
    host: "0.0.0.0", // Listen on all IPv4 addresses
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist", // Output directory for production build
    emptyOutDir: true, // Clean folder before building
    sourcemap: false, // Disable source maps in production
  },
}));
