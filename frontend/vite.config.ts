import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  // `base` define el subdirectorio donde vive la app en producción.
  // En local: VITE_BASE_PATH no existe → base='/' (comportamiento normal).
  // En GitHub Actions: VITE_BASE_PATH=/portafolio/ → assets apuntan al subdirectorio correcto.
  // Sin esto, los archivos JS/CSS compilados buscarían en la raíz del dominio
  // y no cargarían en https://cristian...github.io/portafolio/.
  base: process.env.VITE_BASE_PATH || '/',
})
