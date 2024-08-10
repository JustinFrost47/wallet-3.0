import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'


export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    esbuildOptions: {
        // Node.js global to browser globalThis
        define: {
            global: 'globalThis'
        },
        // Enable esbuild polyfill plugins
        plugins: [
            NodeGlobalsPolyfillPlugin({
                buffer: true
            })
        ]
    }
}
})
