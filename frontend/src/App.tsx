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
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Navbar />
      <main>
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
