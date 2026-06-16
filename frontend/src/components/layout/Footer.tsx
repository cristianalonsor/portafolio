/**
 * Footer.tsx — pie de página del portafolio.
 *
 * Renderiza tres elementos en fila (o columna en móvil):
 *   - Logo "CR." que hace scroll al hero
 *   - Créditos de autoría con la fecha actual
 *   - Stack tecnológico del proyecto en monospace
 *
 * Además, expone un callback opcional `onVisible` que se dispara
 * cuando el footer entra completamente en el viewport, utilizado
 * para mostrar un Toast de bienvenida al final del documento.
 */
import { useEffect, useRef } from 'react';

interface FooterProps {
  onVisible?: () => void;
}

export function Footer({ onVisible }: FooterProps) {
  const footerRef = useRef<HTMLElement>(null);
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();
  const formattedDate = `${day}-${month}-${year}`;

  // IntersectionObserver: notifica cuando el footer es 100% visible
  useEffect(() => {
    const footer = footerRef.current;
    if (!footer || !onVisible) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            onVisible();
          }
        }
      },
      { threshold: 1 },
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, [onVisible]);

  return (
    <footer ref={footerRef} className="bg-dark border-t border-white/5 py-10 px-6">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <a href="#hero" className="text-xl font-bold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          CR<span className="text-coral">.</span>
        </a>
        <div className="flex flex-col items-center gap-1">
          <p className="text-muted text-sm text-center">
            Diseñado y desarrollado por{' '}
            <span className="text-white font-medium">Cristian Reyes</span>
          </p>
          <p className="text-muted/40 text-xs font-mono">
            {formattedDate}
          </p>
        </div>
        <p className="text-muted/40 text-xs font-mono">
          React · TS · Node.js
        </p>
      </div>
    </footer>
  );
}
