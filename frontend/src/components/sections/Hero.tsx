import { Button } from '../ui/Button';

/**
 * Componente Hero — primera sección visible del portafolio (above the fold).
 *
 * Es la pantalla completa de bienvenida. Ocupa el 100% del viewport (min-h-screen)
 * y contiene: badge de disponibilidad, nombre, título, tagline, CTAs y scroll indicator.
 *
 * Técnicas usadas:
 * - Efecto "glow": divs con blur-3xl y colores semitransparentes (bg-coral/5)
 * - Posicionamiento absoluto/relativo para capas decorativas
 * - Scroll programático con scrollIntoView
 * - Animaciones CSS de Tailwind: animate-pulse, animate-bounce
 */
export function Hero() {

  /**
   * Función auxiliar para navegar a una sección por su id.
   * document.getElementById(id) → busca un elemento con ese id en el DOM
   * ?.scrollIntoView() → optional chaining: si el elemento existe, llama scrollIntoView
   * { behavior: 'smooth' } → anima el scroll en lugar de saltar bruscamente
   */
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    /**
     * <section id="hero"> → el id es el ancla que usa el Navbar para el scroll
     *
     * Clases clave:
     * relative         → establece el contexto de posicionamiento para los hijos absolute
     * min-h-screen     → altura mínima del 100% del viewport height
     * flex flex-col    → flexbox en dirección vertical
     * items-center     → centra horizontalmente los hijos
     * justify-center   → centra verticalmente los hijos
     * overflow-hidden  → oculta los glows que se salen de los bordes
     */
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center bg-dark px-6 overflow-hidden"
    >
      {/* ── Capas de "glow" decorativas ────────────────────────────────────
          pointer-events-none → el mouse las ignora completamente (no bloquean clicks)
          inset-0            → ocupa todo el espacio del padre (top:0 right:0 bottom:0 left:0)
          Los divs internos son círculos gigantes con blur extremo:
          bg-coral/5 → color coral al 5% de opacidad → sutil, solo un tinte
          blur-3xl   → desenfoque máximo de Tailwind → convierte el círculo en neblina */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-coral/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/4 w-64 h-64 rounded-full bg-teal/5 blur-2xl" />
      </div>

      {/* ── Contenido principal ─────────────────────────────────────────────
          relative → necesario para que quede por encima de las capas absolute de atrás
          max-w-4xl → limita el ancho máximo a 56rem para buena lectura
          w-full    → ocupa el 100% del ancho disponible (hasta el max-w) */}
      <div className="relative max-w-4xl w-full text-center">

        {/* Badge "Disponible para proyectos"
            inline-flex items-center → alinea el punto y el texto en la misma línea
            rounded-full            → completamente ovalado
            animate-pulse           → el punto parpadea suavemente (CSS keyframe) */}
        <p className="inline-flex items-center gap-2 text-teal text-xs font-mono tracking-[0.2em] uppercase mb-6 px-3 py-1.5 border border-teal/20 rounded-full bg-teal/5">
          <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
          Disponible para proyectos
        </p>

        {/* Nombre principal
            text-6xl sm:text-7xl md:text-8xl → escala el tamaño según el breakpoint
            leading-none → sin interlineado extra, el texto queda más compacto
            style={{ fontFamily }} → inline style necesario porque la fuente
            Space Grotesk se carga desde Google Fonts, no está en Tailwind por defecto */}
        <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold text-white leading-none mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          Cristian<br />
          <span className="text-coral">Reyes</span>
        </h1>

        <p className="text-xl md:text-2xl text-muted font-light mb-3">
          Full Stack Developer
        </p>

        {/* text-orange/80 → color naranja al 80% de opacidad */}
        <p className="text-base md:text-lg text-orange/80 italic mb-10">
          "Desarrollos para el futuro"
        </p>

        {/* CTAs: flex-col en móvil → apilados; sm:flex-row → lado a lado desde 640px */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="text-base px-8 py-3.5" onClick={() => scrollTo('proyectos')}>
            Ver proyectos
          </Button>
          <Button variant="outline" className="text-base px-8 py-3.5" onClick={() => scrollTo('contacto')}>
            Hablemos
          </Button>
        </div>
      </div>

      {/* ── Scroll indicator ────────────────────────────────────────────────
          Posicionado absolutamente en la parte inferior central.
          left-1/2 -translate-x-1/2 → truco clásico para centrar un absolute:
            left:50% mueve el borde izquierdo al centro,
            translateX(-50%) lo desplaza a la izquierda la mitad de su propio ancho.
          animate-bounce → el SVG sube y baja en loop (CSS keyframe de Tailwind)
          aria-label    → accesibilidad para lectores de pantalla */}
      <button
        onClick={() => scrollTo('sobre-mi')}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted/40 hover:text-muted transition-colors cursor-pointer"
        aria-label="Scroll hacia abajo"
      >
        <span className="text-xs tracking-widest font-mono">scroll</span>
        {/* SVG inline: más eficiente que un <img> y permite heredar el color con currentColor */}
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="animate-bounce">
          <path d="M10 4v12M5 11l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </section>
  );
}
