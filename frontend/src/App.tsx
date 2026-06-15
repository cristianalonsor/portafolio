/**
 * App.tsx — componente raíz de la aplicación.
 *
 * Configura React Router y define las dos rutas disponibles:
 *   /                   → Home (scroll único con todas las secciones)
 *   /proyectos/:slug    → ProjectDetail (página de detalle de cada proyecto)
 *
 * Navbar y Footer se renderizan fuera del <Routes> para que aparezcan
 * en todas las rutas sin repetir código.
 */
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { ProjectDetail } from './pages/ProjectDetail';

export default function App() {
  return (
    // BrowserRouter habilita la navegación por historial del browser (URL reales, sin #hash)
    <BrowserRouter>
      <Navbar />
      <main>
        {/* Routes renderiza solo el primer Route que coincide con la URL actual */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/proyectos/:slug" element={<ProjectDetail />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
