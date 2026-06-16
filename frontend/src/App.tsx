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
import { useCallback, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Toast } from './components/ui/Toast';
import { Home } from './pages/Home';
import { ProjectDetail } from './pages/ProjectDetail';

export default function App() {
  const [showToast, setShowToast] = useState(false);

  const handleFooterVisible = useCallback(() => {
    setShowToast(true);
  }, []);

  const handleToastClose = useCallback(() => {
    setShowToast(false);
  }, []);

  return (
    // BrowserRouter habilita la navegación por historial del browser (URL reales, sin #hash).
    // `basename` le dice a React Router en qué subdirectorio vive la app.
    // `import.meta.env.BASE_URL` es la variable de Vite que refleja el `base` del config:
    //   en local → '/'   (Vite no tiene VITE_BASE_PATH)
    //   en Pages → '/portafolio/'   (Vite recibe VITE_BASE_PATH=/portafolio/)
    // Sin basename, los <Link to="/proyectos/slug"> generarían URLs sin el prefijo
    // y React Router no encontraría la ruta en GitHub Pages.
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Navbar />
      <main>
        {/* Routes renderiza solo el primer Route que coincide con la URL actual */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/proyectos/:slug" element={<ProjectDetail />} />
        </Routes>
      </main>
      <Footer onVisible={handleFooterVisible} />
      <Toast message="conversemos" show={showToast} onClose={handleToastClose} />
    </BrowserRouter>
  );
}
