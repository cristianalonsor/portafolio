/**
 * useState  → para manejar estado local del componente
 * useEffect → para ejecutar código con efectos secundarios (eventos del DOM,
 *             timers, fetch, etc.) sin interferir con el ciclo de render de React
 */
import { useState, useEffect } from 'react';

/**
 * Datos de navegación definidos fuera del componente.
 * Al ser una constante estática (nunca cambia), no necesita vivir dentro
 * del componente ni en useState. Esto evita que se recree en cada render.
 * "as const" podría añadirse para inferencia más estricta, pero no es necesario aquí.
 */
const NAV_LINKS = [
  { label: 'Inicio',     href: '#hero'      },
  { label: 'Sobre mí',  href: '#sobre-mi'  },
  { label: 'Skills',     href: '#skills'    },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Contacto',  href: '#contacto'  },
];

/**
 * Componente Navbar — barra de navegación fija en la parte superior.
 *
 * Comportamiento:
 * - Transparente al inicio de la página
 * - Fondo oscuro con blur cuando el usuario hace scroll o abre el menú móvil
 * - Menú hamburger que se transforma en × en pantallas pequeñas
 * - Scroll suave (smooth) al hacer click en cada enlace
 */
export function Navbar() {

  /**
   * scrolled: indica si el usuario scrolleó más de 20px.
   * Se usa para cambiar el fondo del navbar de transparente a oscuro.
   * Boolean porque solo necesitamos saber si/no, no cuánto scrolleó.
   */
  const [scrolled, setScrolled] = useState(false);

  // menuOpen: controla si el menú móvil está abierto o cerrado
  const [menuOpen, setMenuOpen] = useState(false);

  /**
   * useEffect con array de dependencias vacío [].
   * El [] significa: ejecuta este efecto UNA sola vez, cuando el componente
   * se monta en el DOM (equivalente a componentDidMount en clases).
   *
   * Dentro, registramos un event listener en el scroll del browser.
   *
   * La función "return" al final es el "cleanup": se ejecuta cuando el
   * componente se desmonta. Sin esto, el listener quedaría activo en memoria
   * aunque el componente ya no exista → memory leak.
   */
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler); // cleanup
  }, []);

  /**
   * Navega hacia la sección indicada con scroll suave.
   * document.querySelector(href) busca un elemento por selector CSS.
   *   href = '#sobre-mi' → busca <section id="sobre-mi">
   * El ?. (optional chaining) evita error si el elemento no existe en el DOM.
   */
  const handleNavClick = (href: string) => {
    setMenuOpen(false); // cierra el menú móvil si estaba abierto
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    /**
     * Clases del nav explicadas:
     * fixed          → saca el nav del flujo normal y lo fija relativo al viewport
     * top-0 left-0 right-0 → lo estira de borde a borde en la parte superior
     * z-50           → capa 50 en el z-index; garantiza que esté sobre todo el contenido
     * transition-all duration-300 → anima cualquier cambio de clase en 300ms
     *
     * Template literal condicional:
     * Si scrolled o menuOpen → fondo oscuro + blur + sombra
     * Si no → transparente (se ve el hero detrás)
     */
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled || menuOpen
        ? 'bg-dark/95 backdrop-blur-md border-b border-white/5 shadow-lg'
        : 'bg-transparent'
    }`}>

      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#hero" className="text-xl font-bold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          CR<span className="text-coral">.</span>
        </a>

        {/* ── Links de escritorio ──────────────────────────────────────────
            "hidden md:flex" → oculto por defecto, visible como flex desde md (768px)
            Este es el patrón estándar de Tailwind para responsive: mobile-first.
            Primero defines el estilo móvil, luego sobreescribes con breakpoints. */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            /**
             * key={link.href} → prop obligatoria en listas. React la usa internamente
             * para identificar qué elemento cambió, se agregó o se eliminó
             * en el Virtual DOM sin re-renderizar toda la lista.
             * Debe ser único y estable (no usar el índice del array si el orden puede cambiar).
             */
            <li key={link.href}>
              <a
                href={link.href}
                onClick={e => { e.preventDefault(); handleNavClick(link.href); }}
                /**
                 * "group" en el <a> habilita el modificador "group-hover:" en sus hijos.
                 * El <span> de abajo tiene "group-hover:w-full": cuando el usuario
                 * pasa el mouse sobre el <a>, el span se expande de w-0 a w-full,
                 * creando el efecto de subrayado animado de izquierda a derecha.
                 */
                className="text-muted hover:text-white transition-colors text-sm font-medium relative group"
              >
                {link.label}
                {/* Línea decorativa que se expande en hover */}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-coral group-hover:w-full transition-all duration-300" />
              </a>
            </li>
          ))}
        </ul>

        {/* ── Botón hamburger (solo móvil) ─────────────────────────────────
            "md:hidden" → visible por defecto, oculto desde md (768px)
            Las 3 barras se animan con rotate y translate para formar una × */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
          onClick={() => setMenuOpen(o => !o)} // toggle: si era true pasa a false y viceversa
          aria-label="Menú" // accesibilidad: screenreaders leerán "Menú" en vez del ícono
        >
          {/* Barra superior: rota 45° y baja cuando el menú está abierto */}
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          {/* Barra central: desaparece (opacity-0) cuando el menú está abierto */}
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          {/* Barra inferior: rota -45° y sube cuando el menú está abierto */}
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* ── Menú móvil desplegable ──────────────────────────────────────────
          Renderizado condicional: {condición && <JSX>}
          Si menuOpen es false, no renderiza nada (React ignora false/null/undefined).
          Si menuOpen es true, renderiza el menú completo. */}
      {menuOpen && (
        <div className="md:hidden border-t border-white/5 px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={e => { e.preventDefault(); handleNavClick(link.href); }}
              className="text-muted hover:text-white transition-colors font-medium py-1"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
