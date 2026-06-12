import { skills } from '../../data/skills';

/**
 * Mapa de colores por categoría.
 *
 * Record<string, string> es un tipo genérico de TypeScript que representa
 * un objeto con claves y valores del tipo indicado.
 * Record<string, string> === { [key: string]: string }
 *
 * Usamos un objeto en lugar de un if/switch porque es más declarativo
 * y fácil de extender: agregar una categoría nueva = agregar una línea aquí.
 *
 * Los valores son strings de clases Tailwind que se aplican al header
 * de cada tarjeta de categoría, dándole un color distinto a cada una.
 */
const CATEGORY_COLORS: Record<string, string> = {
  'Frontend':       'border-coral/30 text-coral',
  'Backend':        'border-teal/30 text-teal',
  'Cloud & DevOps': 'border-orange/30 text-orange',
  'Herramientas':   'border-yellow/30 text-yellow',
};

/**
 * Componente Skills — muestra las tecnologías agrupadas por categoría.
 *
 * Cada categoría se renderiza como una tarjeta (card) con:
 *   - Header coloreado según la categoría
 *   - Badge por cada tecnología dentro de esa categoría
 *
 * Los datos vienen de src/data/skills.ts (array estático, sin backend).
 * Agregar una tecnología nueva = modificar ese archivo.
 */
export function Skills() {
  return (
    <section id="skills" className="py-28 px-6 bg-dark relative overflow-hidden">
      {/* Glow decorativo en la esquina inferior izquierda */}
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-coral/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative">
        <p className="text-teal text-xs font-mono tracking-[0.2em] uppercase mb-3">Tecnologías</p>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          Mi <span className="text-coral">Stack</span>
        </h2>
        <div className="w-16 h-1 bg-coral rounded mb-12" />

        {/* grid sm:grid-cols-2 → 1 columna en móvil, 2 columnas desde 640px */}
        <div className="grid sm:grid-cols-2 gap-6">
          {/**
           * skills.map(category => {...}) → itera el array y retorna JSX por cada elemento.
           * En React, el resultado de un .map() dentro de JSX se renderiza como una lista.
           *
           * Usamos un bloque { } en lugar de ( ) en el callback porque necesitamos
           * declarar la variable colorClass antes del return.
           */}
          {skills.map(category => {
            /**
             * Operador ?? (nullish coalescing):
             * CATEGORY_COLORS[category.category] → busca el color para esta categoría
             * ?? 'border-muted/30 text-muted'    → si no existe (undefined/null), usa el fallback
             *
             * Diferencia con ||: ?? solo activa el fallback para null/undefined,
             * NO para valores falsy como 0 o '' (que sí activarían ||).
             */
            const colorClass = CATEGORY_COLORS[category.category] ?? 'border-muted/30 text-muted';

            return (
              <div
                key={category.category}
                className="bg-slate/30 border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-colors"
              >
                {/**
                 * Template literal dinámico: `texto fijo ${variable}`
                 * Mezclamos clases estáticas (siempre aplicadas) con colorClass (dinámica).
                 * Resultado ejemplo para Frontend:
                 *   "text-xs font-mono ... border-b border-coral/30 text-coral"
                 */}
                <h3 className={`text-xs font-mono uppercase tracking-widest mb-5 pb-3 border-b ${colorClass}`}>
                  {category.category}
                </h3>

                {/* flex flex-wrap → los badges se pegan uno al lado del otro y saltan de línea si no caben */}
                <div className="flex flex-wrap gap-2">
                  {category.items.map(item => (
                    <span
                      key={item}
                      className="px-3 py-1.5 text-sm font-medium rounded-lg bg-dark/60 text-white/80 border border-white/5 hover:border-white/20 hover:text-white transition-colors"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
