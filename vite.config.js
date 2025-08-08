// vite.config.js
// Importar funciones necesarias de Vite y plugins
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// Exportar la configuración de Vite
// Esta configuración incluye plugins y alias para resolver rutas
// También puedes configurar el servidor y otras opciones según tus necesidades
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  //server: {
    //host: true, // <-- permite conexión LAN
    //port: 5173 // (puedes cambiarlo si necesitas)
  //}
})
