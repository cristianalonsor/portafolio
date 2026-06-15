/**
 * main.tsx — punto de entrada de la aplicación React.
 *
 * Vite ejecuta este archivo primero. Busca el div#root en index.html
 * y monta toda la app React dentro de él.
 *
 * StrictMode: envuelve la app para detectar problemas potenciales en
 * desarrollo (efectos dobles, APIs obsoletas). No afecta producción.
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// El ! al final es una aserción TypeScript: le dice al compilador que
// getElementById('root') no puede ser null (sabemos que existe en index.html).
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

console.log('Bienvenidos')
